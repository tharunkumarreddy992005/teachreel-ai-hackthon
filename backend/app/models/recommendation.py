from typing import List, Dict, Any, Optional
from pydantic import BaseModel, Field

class RecommendationScores(BaseModel):
    interest_match: float
    learning_value: float
    career_relevance: float
    credibility: float
    novelty: float
    difficulty_fit: float
    diversity_bonus: float = 0.0
    hype_penalty: float = 0.0
    repetition_penalty: float = 0.0
    total_score: float = 0.0

class MicroLearning(BaseModel):
    headline: str
    key_points: List[str] = Field(default_factory=list)

class RejectedCandidate(BaseModel):
    reel_id: str
    title: str
    reason: str
    decision: str = "Reject"
    hype_score: float = 0.0
    educational_value: float = 0.0
    credibility: float = 0.0

class RecommendationModel(BaseModel):
    id: str
    user_id: str
    reel_id: str
    title: str
    category: str
    difficulty: str
    confidence: str = "High"
    score: float
    scores: RecommendationScores
    why: str
    why_path: List[str] = Field(default_factory=list)
    micro_learning: Optional[MicroLearning] = None
    rejected_candidates: List[RejectedCandidate] = Field(default_factory=list)
    created_at: str
