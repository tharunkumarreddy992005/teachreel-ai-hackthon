from typing import Optional, List
from pydantic import BaseModel
from app.models.user import UserPreferences

class UserResponse(BaseModel):
    id: str
    name: str
    handle: str
    avatar: str
    role: str
    university: Optional[str] = None
    year: Optional[str] = None
    preferences: UserPreferences
