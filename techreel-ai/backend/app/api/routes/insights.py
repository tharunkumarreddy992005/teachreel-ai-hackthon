from fastapi import APIRouter, Query
from typing import List, Dict, Any
from app.services.emerging_interest import emerging_interest_service
from app.services.knowledge_gap import knowledge_gap_service
from app.services.career_alignment import career_alignment_service
from app.services.interest_bridge import interest_bridge_service
from app.database.collections import get_interest_profiles_collection

router = APIRouter()

@router.get("/user/evolution")
async def get_user_evolution(user_id: str = Query(default="student_001")):
    """Returns 4-week historical interest trend evolution."""
    return {
        "user_id": user_id,
        "timeline": [
            {"week": "Week 1", "Programming": 30, "Gaming": 70, "Software Engineering": 15, "AI": 10},
            {"week": "Week 2", "Programming": 42, "Gaming": 58, "Software Engineering": 28, "AI": 22},
            {"week": "Week 3", "Programming": 56, "Gaming": 44, "Software Engineering": 48, "AI": 35},
            {"week": "Week 4", "Programming": 72, "Gaming": 25, "Software Engineering": 87, "AI": 51}
        ],
        "key_metric": "Programming & Software Engineering interest increased +42% over 4 weeks.",
        "summary": "Entertainment-heavy gaming content transitioned into disciplined software engineering and systems architecture discovery."
    }

@router.get("/user/emerging-interests")
async def get_user_emerging_interests(user_id: str = Query(default="student_001")):
    """Returns potential emerging interests with probabilistic disclaimers."""
    profiles_col = get_interest_profiles_collection()
    cached = await profiles_col.find_one({"user_id": user_id})
    dna = cached.get("interest_dna", []) if cached else []
    return emerging_interest_service.get_emerging_interests(dna)

@router.get("/user/knowledge-gaps")
async def get_user_knowledge_gaps(user_id: str = Query(default="student_001")):
    """Identifies prerequisite gaps in user's learning path."""
    profiles_col = get_interest_profiles_collection()
    cached = await profiles_col.find_one({"user_id": user_id})
    dna = cached.get("interest_dna", []) if cached else []
    return knowledge_gap_service.get_knowledge_gaps(dna)

@router.get("/user/career-alignment")
async def get_user_career_alignment(user_id: str = Query(default="student_001")):
    """Calculates career role exploration alignment (not rigid predictions)."""
    profiles_col = get_interest_profiles_collection()
    cached = await profiles_col.find_one({"user_id": user_id})
    dna = cached.get("interest_dna", []) if cached else []
    return {
        "disclaimer": "Exploration suggestions based on latent interests, not career predictions.",
        "alignments": career_alignment_service.get_career_alignments(dna)
    }

@router.get("/user/interest-bridge")
async def get_user_interest_bridge():
    """Returns multi-disciplinary topic bridges."""
    return interest_bridge_service.get_bridges()

@router.get("/user/smart-surprise")
async def get_user_smart_surprise():
    """Returns unexpected yet semantically connected discovery reel."""
    return interest_bridge_service.get_smart_surprise()
