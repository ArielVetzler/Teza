from typing import Dict, Any, List

import numpy as np

from models import Article
from llm_integration import LLMIntegration


class LLMWorker:
    def __init__(self, embedding_model, **kwargs):
        self.model = embedding_model
        self.llm_integrator = LLMIntegration(api_key=kwargs.get("llm_api_key"))
        self.stop_words = {"a", "an", "the", "is", "and", "or", "in", "of", "for", "to", "with", "on", "at", "by", "from", "as"}

    def get_embedding(self, text: str or List[str]):
        if isinstance(text, list):
            embeddings = self.model.encode(text)
            return np.mean(embeddings, axis=0).astype(float).tolist()
        else:
            return self.model.encode(text).astype(float).tolist()

    def _generate_simple_tags(self, title: str) -> List[str]:
        """Generates simple tags from a title by lowercasing, splitting, and removing stop words."""
        words = title.lower().split()
        tags = [word for word in words if word not in self.stop_words]
        return list(set(tags)) # Return unique tags

    async def process_article_job(self, job: Dict[str, Any]) -> Article:
        """
        Processes an article job by generating tags and an embedding using a simulated LLM call.
        """
        # Simulate LLM processing time

        # Generate tags using the simple method
        tags = self._generate_simple_tags(job["title"])
        llm_tags = await self.llm_integrator.extract_tags(job["title"])
        # Generate embedding from llm_tags or simple tags
        if llm_tags:
            embedding = self.get_embedding(llm_tags)
        else:
            embedding = self.get_embedding(tags)

        processed_article = Article(
            id=job["id"],
            title=job["title"],
            tags=tags,
            llm_tags=llm_tags,
            embedding=embedding,
        )
        return processed_article
