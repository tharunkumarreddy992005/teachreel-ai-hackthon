"""
Resets user interest profile and interactions back to the baseline golden scenario state.
"""
import asyncio
import sys
from pathlib import Path

# Add backend to path
sys.path.insert(0, str(Path(__file__).resolve().parent.parent / "backend"))

from app.database.mongodb import db_manager
from app.utils.helpers import load_json_file
from app.core.config import settings
from app.core.logging import logger

async def reset_demo():
    logger.info("Connecting to database...")
    await db_manager.connect()

    data_dir = settings.DATA_PATH
    interactions = load_json_file(data_dir / "interactions.json")

    interactions_col = db_manager.get_collection("interactions")
    profiles_col = db_manager.get_collection("interest_profiles")
    recommendations_col = db_manager.get_collection("recommendations")
    feedback_col = db_manager.get_collection("feedback")

    # Clear previous feedback and recommendations
    await feedback_col.delete_many({"user_id": "student_001"})
    await recommendations_col.delete_many({"user_id": "student_001"})
    await profiles_col.delete_many({"user_id": "student_001"})

    # Restore initial interactions
    for item in interactions:
        await interactions_col.update_one({"id": item["id"]}, {"$set": item}, upsert=True)

    await db_manager.close()
    logger.info("Demo state reset to golden scenario baseline.")

if __name__ == "__main__":
    asyncio.run(reset_demo())
