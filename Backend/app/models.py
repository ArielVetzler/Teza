from pydantic import BaseModel, Field
from typing import List, Dict, Any
from datetime import datetime


class Article(BaseModel):
    id: str
    title: str
    tags: List[str] = Field(default_factory=list)
    llm_tags: List[str] = Field(default_factory=list) # New field for LLM generated tags
    embedding: List[float] = Field(default_factory=list)


class User(BaseModel):
    id: str
    tags: List[str]
    embedding: List[float] = Field(default_factory=list)
    timestamp: datetime = Field(default_factory=datetime.now)
    session_context: Dict[str, Any] = Field(default_factory=dict)
    interaction_history: List[str] = Field(default_factory=list)


class Match(BaseModel):
    article_id: str
    article_name: str  # Added field for article name
    user_id: str
    score: float
    matched_tags: List[str]
    timestamp: datetime = Field(default_factory=datetime.now)
