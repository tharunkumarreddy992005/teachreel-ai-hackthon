from typing import Optional, Dict, Any
from pydantic import BaseModel, Field

class UserPreferences(BaseModel):
    preferred_difficulty: str = "Intermediate"
    curiosity_tolerance: float = 0.85
    hype_tolerance: float = 0.15

class UserModel(BaseModel):
    id: str
    name: str
    handle: str
    avatar: str = "https://api.dicebear.com/7.x/bottts/svg?seed=Alex"
    role: str = "Student"
    university: Optional[str] = None
    year: Optional[str] = None
    joined_at: str
    preferences: UserPreferences = Field(default_factory=UserPreferences)
