from typing import Optional
from pydantic import BaseModel, Field

class InteractionModel(BaseModel):
    id: str
    user_id: str
    reel_id: str
    title: Optional[str] = None
    watch_percentage: float = 0.0
    duration_seconds: int = 30
    watch_time_seconds: float = 0.0
    replay_count: int = 0
    liked: bool = False
    saved: bool = False
    shared: bool = False
    skipped: bool = False
    sequence_order: int = 1
    timestamp: str
