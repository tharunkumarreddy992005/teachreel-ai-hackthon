from typing import List, Optional, Dict, Any
from pydantic import BaseModel, Field

class AnalyzeRequest(BaseModel):
    user_id: str = "student_001"
    recent_interactions: Optional[List[Dict[str, Any]]] = None
    # Manual Reel Testing fields
    reel_title: Optional[str] = None
    reel_description: Optional[str] = None
    topic: Optional[str] = None
    watch_percentage: Optional[float] = 95.0
    replay_count: Optional[int] = 1
    liked: Optional[bool] = True
    saved: Optional[bool] = False

class IntentBreakdown(BaseModel):
    entertainment_intent: float
    learning_intent: float
    career_intent: float
    curiosity: float
    key_insight: str

class AnalyzedReelSummary(BaseModel):
    reel_id: str
    title: str
    primary_topic: str
    domain: str
    watch_percentage: float
    replay_count: int
    liked: bool
    saved: bool
    shared: bool = False
    intent: IntentBreakdown

class AnalyzeResponse(BaseModel):
    user_id: str
    analyzed_count: int
    analyzed_reels: List[AnalyzedReelSummary]
    summary_insight: str
    fatigue_detected: bool
    fatigued_topics: List[str] = Field(default_factory=list)
