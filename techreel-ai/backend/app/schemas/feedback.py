from typing import List, Optional
from pydantic import BaseModel, Field
from app.models.interest import InterestItem

class FeedbackRequest(BaseModel):
    user_id: str = "student_001"
    reel_id: str
    recommendation_id: Optional[str] = None
    rating: str  # "Very Useful", "Somewhat Useful", "Not Relevant"
    reasons: List[str] = Field(default_factory=list)

class FeedbackResponse(BaseModel):
    success: bool = True
    message: str
    updated_interest_dna: List[InterestItem]
    adaptation_summary: str
