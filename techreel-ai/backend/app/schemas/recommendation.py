from typing import List, Optional, Dict, Any
from pydantic import BaseModel, Field
from app.models.recommendation import RecommendationScores, MicroLearning, RejectedCandidate
from app.schemas.analysis import IntentBreakdown

class CurrentReelInfo(BaseModel):
    title: str
    topic: Optional[str] = "Java"
    watch_percentage: Optional[float] = 94.0
    replay_count: Optional[int] = 2
    liked: Optional[bool] = True
    saved: Optional[bool] = False
    intent: Optional[IntentBreakdown] = None

class InterestDetectedInfo(BaseModel):
    topic: str
    score: float
    confidence: str = "High"

class RecommendationDetail(BaseModel):
    id: str
    reel_id: str
    title: str
    description: Optional[str] = None
    creator: Optional[str] = None
    duration_seconds: Optional[int] = 60
    category: str
    difficulty: str
    confidence: str = "High"
    score: float
    scores: RecommendationScores
    why: str
    why_path: List[str] = Field(default_factory=list)
    micro_learning: Optional[MicroLearning] = None
    rejected_candidates: List[RejectedCandidate] = Field(default_factory=list)
    thumbnail_url: Optional[str] = None
    url: Optional[str] = None

class RecommendationResponse(BaseModel):
    current_reel: CurrentReelInfo
    interest_detected: InterestDetectedInfo
    recommendation: RecommendationDetail
    scores: Dict[str, float]
    why: str
    confidence: str = "High"
    all_recommendations: List[RecommendationDetail] = Field(default_factory=list)

class HypeAnalysisItem(BaseModel):
    reel_id: str
    title: str
    creator: str
    hype_score: float
    educational_value: float
    credibility: float
    decision: str
    reasons: List[str]
    detected_patterns: List[str]

class HypeAnalysisResponse(BaseModel):
    analyzed_items: List[HypeAnalysisItem]
    shield_status: str = "Active"
    total_blocked: int = 1
    protection_summary: str
