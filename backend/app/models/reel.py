from typing import List, Optional
from pydantic import BaseModel, Field

class ReelModel(BaseModel):
    id: str
    title: str
    description: str
    creator: str
    duration_seconds: int
    tags: List[str] = Field(default_factory=list)
    primary_topic: str
    secondary_topics: List[str] = Field(default_factory=list)
    broader_domain: str
    technical_concepts: List[str] = Field(default_factory=list)
    entertainment_intent: float = 50.0
    learning_intent: float = 50.0
    career_intent: float = 50.0
    curiosity: float = 50.0
    difficulty: str = "Intermediate"
    difficulty_score: float = 50.0
    educational_value: float = 50.0
    credibility: float = 80.0
    hype_score: float = 10.0
    career_relevance: float = 50.0
    url: str
    thumbnail_url: str = "/thumbnails/default.jpg"
    embedding: Optional[List[float]] = None
