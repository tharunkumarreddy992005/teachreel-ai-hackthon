from fastapi import APIRouter
from typing import Dict, Any
from app.agents.recommendation_agent import recommendation_agent
from app.database.collections import get_interactions_collection, get_reels_collection
from app.utils.helpers import load_json_file
from app.core.config import settings

router = APIRouter()

@router.post("/demo/run")
async def run_hackathon_demo() -> Dict[str, Any]:
    """
    Executes the complete Golden Scenario Demo:
    1. Resets student_001 interactions to the 5 baseline items.
    2. Runs end-to-end recommendation agent pipeline.
    3. Returns full state for synchronized UI visualization.
    """
    interactions_col = get_interactions_collection()
    data_dir = settings.DATA_PATH
    seed_interactions = load_json_file(data_dir / "interactions.json")
    
    # Delete test interactions for clean golden demo
    await interactions_col.delete_many({"user_id": "student_001"})

    # Restore exact 5 baseline interactions
    for item in seed_interactions:
        await interactions_col.update_one({"id": item["id"]}, {"$set": item}, upsert=True)

    result = await recommendation_agent.run_pipeline(user_id="student_001")
    return result
