from typing import List, Dict, Any, Optional
from pydantic import BaseModel, Field

class InterestItem(BaseModel):
    topic: str
    score: float
    confidence: str = "Medium"
    trend: str = "+0%"
    trend_direction: str = "up"
    evidence_count: int = 1
    domain: str = "Technology"
    category: str = "Interest"

class HiddenInterestItem(BaseModel):
    primary_topic: str
    score: float
    confidence: str = "High"
    evidence_topics: List[str] = Field(default_factory=list)
    synthesis_reasoning: str

class InterestProfileModel(BaseModel):
    user_id: str
    updated_at: str
    interest_dna: List[InterestItem] = Field(default_factory=list)
    hidden_interest: Optional[HiddenInterestItem] = None
    fatigue_detected: bool = False
    fatigued_topics: List[str] = Field(default_factory=list)
