import asyncio
import json

from dotenv import load_dotenv

load_dotenv()  # Load environment variables from .env file
from contextlib import asynccontextmanager

from fastapi import FastAPI, WebSocket, WebSocketDisconnect
from fastapi.staticfiles import StaticFiles
from sentence_transformers import SentenceTransformer

from connection_manager import ConnectionManager
from generators import generate_synthetic_articles, generate_synthetic_users, set_embedding_model
from matching_engine import MatchingEngine
from models import User
from redis_queue import RedisJobQueue
from worker import LLMWorker

# --- FastAPI App Setup ---

# Initialize components
connection_manager = ConnectionManager()
matching_engine = MatchingEngine()
redis_queue = RedisJobQueue()

# Initialize SentenceTransformer model once



@asynccontextmanager
async def lifespan(app: FastAPI):
    # Startup
    print("App starting up...")
    await redis_queue.connect()

    print("Loading SentenceTransformer model...")
    embedding_model = SentenceTransformer("paraphrase-MiniLM-L3-v2")
    set_embedding_model(embedding_model)
    # Warm-up the embedding model
    print("Warming up embedding model...")
    embedding_model.encode("warm-up sentence")
    print("Embedding model warmed up.")
    print("SentenceTransformer model loaded.")

    llm_worker = LLMWorker(embedding_model=embedding_model)

    asyncio.create_task(generate_users_and_broadcast_task())  # Start user generation as a background task
    asyncio.create_task(generate_articles_to_redis_task())  # Start article generation as a background task
    asyncio.create_task(process_articles_task(llm_worker))  # Start article processing as a background task
    yield
    # Shutdown
    print("App shutting down...")
    await redis_queue.disconnect()


app = FastAPI(lifespan=lifespan)
async def generate_articles_to_redis_task():
    print("Starting article generation task...")
    """Generates articles and sends them to Redis."""
    qps = 5
    article_generator = generate_synthetic_articles(qps=qps)
    print("Article generator initialized.")
    while True:
        generated_article = await article_generator.__anext__()
        await redis_queue.push_job("llm_jobs", {"id": generated_article.id, "title": generated_article.title})
        await asyncio.sleep(1 / qps)


async def generate_users_and_broadcast_task():
    print("Starting user generation and broadcast task...")
    """Generates users and broadcasts them via WebSocket."""
    qps = 5
    user_generator = generate_synthetic_users(qps=qps)
    while True:
        generated_user = await user_generator.__anext__()
        matching_engine.add_user(generated_user)
        user_data = {
            "type": "new_user",
            "data": json.loads(generated_user.model_dump_json(exclude={'embedding'}))
        }
        await connection_manager.broadcast(json.dumps(user_data))
        asyncio.create_task(run_matching_for_user(generated_user))
        await asyncio.sleep(1 / qps)


async def process_articles_task(llm_worker: LLMWorker):
    """Pulls article jobs from Redis, processes them with the LLM worker, and adds them to the matching engine."""
    while True:
        job = await redis_queue.pop_job("llm_jobs", timeout=1)  # Poll Redis for jobs
        if job:
            try:
                processed_article = await llm_worker.process_article_job(job)
                matching_engine.add_article(processed_article)
                # Broadcast the processed article via WebSocket
                article_data = {
                    "type": "new_article",
                    "data": json.loads(processed_article.model_dump_json(exclude={'embedding'}))
                }
                await connection_manager.broadcast(json.dumps(article_data))
            except Exception as e:
                print(f"Error processing article job: {e}")


async def run_matching_for_user(user: User):
    """Runs the matching engine for a specific user and broadcasts new matches."""
    new_matches = await matching_engine.run_matching_for_user(user)
    if new_matches:
        match_data = {
            "type": "new_matches",
            "data": [match.model_dump_json() for match in new_matches]
        }
        await connection_manager.broadcast(json.dumps(match_data))


@app.websocket("/ws")
async def websocket_endpoint(websocket: WebSocket):
    await connection_manager.connect(websocket)
    print("connected")
    try:
        while True:
            await asyncio.sleep(0.1)
    except WebSocketDisconnect:
        connection_manager.disconnect(websocket)
        print("Client disconnected")

