from typing import List, Optional
from pydantic import BaseModel, Field

class FeedbackModel(BaseModel):
    id: str
    user_id: str
    reel_id: str
    recommendation_id: Optional[str] = None
    rating: str  # "Very Useful", "Somewhat Useful", "Not Relevant"
    reasons: List[str] = Field(default_factory=list) # ["Too Basic", "Too Difficult", "More AI", ...]
    timestamp: str
