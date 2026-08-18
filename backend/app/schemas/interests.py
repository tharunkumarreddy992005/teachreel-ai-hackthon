from typing import List, Optional, Dict, Any
from pydantic import BaseModel, Field
from app.models.interest import InterestItem, HiddenInterestItem

class InterestDNAResponse(BaseModel):
    user_id: str
    interest_dna: List[InterestItem]
    hidden_interest: Optional[HiddenInterestItem] = None
    fatigue_detected: bool = False
    fatigued_topics: List[str] = Field(default_factory=list)
    updated_at: str

class GraphNode(BaseModel):
    id: str
    label: str
    category: str
    depth: int
    score: float
    active: bool = False
    is_latent: bool = False
    parent: Optional[str] = None

class GraphEdge(BaseModel):
    source: str
    target: str
    weight: float = 1.0
    relation: str = "contains"

class InterestGraphResponse(BaseModel):
    nodes: List[GraphNode]
    edges: List[GraphEdge]
    selected_latent_node: Optional[str] = "Software Engineering"
