from typing import List, Dict
from collections import deque, defaultdict
import numpy as np

from app.models import Article, User, Match


def cosine_similarity(vec1: List[float], vec2: List[float]) -> float:
    """Calculates cosine similarity between two vectors."""
    if not vec1 or not vec2:
        return 0.0

    vec1 = np.array(vec1)
    vec2 = np.array(vec2)

    dot_product = np.dot(vec1, vec2)
    norm_vec1 = np.linalg.norm(vec1)
    norm_vec2 = np.linalg.norm(vec2)

    if norm_vec1 == 0 or norm_vec2 == 0:
        return 0.0

    return dot_product / (norm_vec1 * norm_vec2)


class MatchingEngine:
    def __init__(self, articles_maxlen=1000, users_maxlen=100, matches_maxlen=1000):
        self.all_articles: Dict[str, Article] = {}
        self.articles_by_tag: Dict[str, deque[str]] = defaultdict(lambda: deque(maxlen=articles_maxlen))
        self.recent_users: deque[User] = deque(maxlen=users_maxlen)
        self.recent_matches: deque[Match] = deque(maxlen=matches_maxlen)

    def add_article(self, article: Article):
        self.all_articles[article.id] = article
        for tag in article.tags:
            self.articles_by_tag[tag].append(article.id)

    def add_user(self, user: User):
        self.recent_users.append(user)

    async def run_matching_for_user(self, user: User) -> List[Match]:
        """Runs the matching algorithm for a specific user."""
        new_matches: List[Match] = []
        if not user.embedding:
            return new_matches

        candidate_article_ids = set()
        for tag in user.tags:
            candidate_article_ids.update(self.articles_by_tag[tag])

        for article_id in candidate_article_ids:
            article = self.all_articles.get(article_id)
            if not article or not article.embedding:
                continue

            embedding_score = cosine_similarity(user.embedding, article.embedding)
            tag_match_score = len(set(user.tags).intersection(set(article.tags)))

            # Weighted score
            score = (0.6 * embedding_score) + (0.4 * tag_match_score)
            if score > 0.5:  # Threshold for creating a match
                match = Match(
                    article_id=article.id,
                    article_name=article.title,  # Include article name
                    user_id=user.id,
                    score=score,
                    matched_tags=list(set(user.tags).intersection(set(article.tags)))
                )
                self.recent_matches.append(match)
                new_matches.append(match)
        return new_matches

    def get_recent_users(self) -> List[User]:
        return list(self.recent_users)

    def get_recent_matches(self) -> List[Match]:
        return list(self.recent_matches)
