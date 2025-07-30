import asyncio
import random
import uuid
from typing import AsyncGenerator, List

import numpy as np
from faker import Faker

from models import Article, User

fake = Faker()
model = None


def set_embedding_model(m):
    global model
    model = m


def get_embedding(text: str or List[str]) -> List[float]:
    """Generates an embedding and ensures it's a list of standard floats."""
    if model is None:
        raise ValueError("Embedding model not set. Call set_embedding_model() first.")
    if isinstance(text, list):
        # If input is a list of strings (tags), encode each and average them
        embeddings = model.encode(text)
        # Convert numpy array of numpy floats to list of python floats
        return np.mean(embeddings, axis=0).astype(float).tolist()
    else:
        # If input is a single string, encode it directly
        return model.encode(text).astype(float).tolist()


async def generate_synthetic_articles(
        qps: int = 100,
) -> AsyncGenerator[Article, None]:
    """Generates a stream of synthetic articles."""
    interval = 1.0 / qps
    print("working.")
    while True:
        article_id = str(uuid.uuid4())
        title = fake.sentence(nb_words=random.randint(4, 12))

        yield Article(id=article_id, title=title)


# Define user personas with their core interests and likelihoods
USER_PERSONAS = {
    "tech_enthusiast": {
        "core_interests": [
            "technology",
            "robotics",
            "artificial intelligence",
            "cybersecurity",
            "gaming",
            "virtual reality",
            "blockchain",
        ],
        "other_interests_pool": ["science", "business", "finance", "space exploration"],
        "interest_count_range": (4, 8),
    },
    "sports_fan": {
        "core_interests": ["sports", "gaming", "fitness"],
        "other_interests_pool": ["entertainment", "travel", "food"],
        "interest_count_range": (3, 6),
    },
    "news_junkie": {
        "core_interests": [
            "politics",
            "world",
            "local",
            "finance",
            "business",
            "environmental issues",
            "social justice",
        ],
        "other_interests_pool": ["history", "education", "health"],
        "interest_count_range": (5, 9),
    },
    "lifestyle_explorer": {
        "core_interests": [
            "travel",
            "food",
            "fashion",
            "art",
            "music",
            "culture",
            "photography",
            "gardening",
            "DIY",
        ],
        "other_interests_pool": ["health", "entertainment", "books", "movies"],
        "interest_count_range": (4, 7),
    },
    "general_reader": {
        "core_interests": ["politics", "technology", "entertainment", "health", "science"],
        "other_interests_pool": [
            "sports",
            "finance",
            "travel",
            "food",
            "history",
            "art",
        ],
        "interest_count_range": (5, 10),
    },
}


async def generate_synthetic_users(qps: int = 15) -> AsyncGenerator[User, None]:
    """Generates a stream of synthetic users with diverse personas and interests."""
    interval = 1.0 / qps

    while True:
        user_id = str(uuid.uuid4())
        persona_config = random.choice(list(USER_PERSONAS.values()))

        num_interests = random.randint(*persona_config["interest_count_range"])
        interests = random.sample(
            persona_config["core_interests"] + persona_config["other_interests_pool"],
            k=num_interests
        )

        tags = list(set(interests))
        random.shuffle(tags)

        yield User(
            id=user_id,
            tags=tags,
            embedding=get_embedding(tags)
        )
