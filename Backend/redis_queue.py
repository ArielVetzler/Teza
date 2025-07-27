import os
import aioredis
import json
import logging
from typing import Dict, Any

logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')


class RedisJobQueue:
    def __init__(self):
        self.redis_url = os.getenv("REDIS_URL", "redis://localhost")
        self.redis = None

    async def connect(self):
        logging.info(f"Attempting to connect to Redis at {self.redis_url}")
        self.redis = await aioredis.create_redis_pool(self.redis_url)
        logging.info("Successfully connected to Redis.")

    async def disconnect(self):
        if self.redis:
            logging.info("Attempting to disconnect from Redis.")
            self.redis.close()
            await self.redis.wait_closed()
            logging.info("Successfully disconnected from Redis.")

    async def push_job(self, queue_name: str, job_data: Dict[str, Any]):
            """Pushes a job onto the specified Redis queue."""
            if not self.redis:
                await self.connect()
            logging.info(f"Pushing job to queue '{queue_name}': {job_data}")
            await self.redis.rpush(queue_name, json.dumps(job_data))
            logging.info(f"Job pushed to queue '{queue_name}'.")

    async def pop_job(self, queue_name: str, timeout: int = 1) -> Dict[str, Any] or None:
            """Pops a job from the specified Redis queue, blocking until a job is available or timeout occurs."""
            if not self.redis:
                await self.connect()
            logging.info(f"Attempting to pop job from queue '{queue_name}' with timeout {timeout}.")
            result = await self.redis.blpop(queue_name, timeout=timeout)
            job_data_bytes = str()
            if result:
                _, job_data_bytes = result
                logging.info(f"Popped job from queue '{queue_name}': {job_data_bytes}")
            else:
                logging.info(f"No job popped from queue '{queue_name}' within timeout.")
            if job_data_bytes:
                return json.loads(job_data_bytes)
            return None


# Example Usage (for testing the class independently)
async def main():
    queue = RedisJobQueue()
    await queue.connect()

    # Test pushing and popping a job
    test_job = {"article_id": "123", "content": "This is a test article for LLM processing."}
    await queue.push_job("llm_jobs", test_job)
    print(f"Pushed job: {test_job}")

    popped_job = await queue.pop_job("llm_jobs")
    print(f"Popped job: {popped_job}")

    await queue.disconnect()


if __name__ == "__main__":
    import asyncio

    asyncio.run(main())
