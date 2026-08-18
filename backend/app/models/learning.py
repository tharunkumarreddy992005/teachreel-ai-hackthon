from typing import List, Optional
from pydantic import BaseModel, Field

class LearningStep(BaseModel):
    step: int
    topic: str
    difficulty: str
    status: str # "Completed", "In Progress", "Next Up", "Upcoming"
    estimated_time: str
    reel_id: Optional[str] = None
    reel_title: str

class LearningPathModel(BaseModel):
    user_id: str
    title: str = "Software Engineering & Backend Mastery"
    steps: List[LearningStep] = Field(default_factory=list)
    updated_at: str

class QuizQuestion(BaseModel):
    id: str
    reel_id: str
    question: str
    options: List[str]
    correct_option_index: int
    explanation: str
    difficulty: str = "Intermediate"
