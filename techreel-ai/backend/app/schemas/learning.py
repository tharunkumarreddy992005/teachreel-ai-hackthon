from typing import List, Optional, Dict, Any
from pydantic import BaseModel, Field
from app.models.learning import LearningStep, QuizQuestion

class LearningPathResponse(BaseModel):
    user_id: str
    title: str
    steps: List[LearningStep]
    estimated_total_hours: float
    current_step_index: int = 1
    career_goal: str = "Software / Backend Engineer"

class QuizRequest(BaseModel):
    reel_id: str = "reel_008"
    user_id: str = "student_001"
    user_answer_index: Optional[int] = None

class QuizResponse(BaseModel):
    quiz: QuizQuestion
    user_submitted: bool = False
    is_correct: Optional[bool] = None
    explanation: str
    score_awarded: int = 0
