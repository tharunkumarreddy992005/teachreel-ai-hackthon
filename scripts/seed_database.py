"""
Seeds MongoDB Atlas or in-memory fallback collections with initial reels, users, and interactions data.
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

async def seed_data():
    logger.info("Connecting to database...")
    await db_manager.connect()

    data_dir = settings.DATA_PATH
    reels = load_json_file(data_dir / "reels.json")
    users = load_json_file(data_dir / "users.json")
    interactions = load_json_file(data_dir / "interactions.json")

    reels_col = db_manager.get_collection("reels")
    users_col = db_manager.get_collection("users")
    interactions_col = db_manager.get_collection("interactions")

    for r in reels:
        await reels_col.update_one({"id": r["id"]}, {"$set": r}, upsert=True)
    logger.info(f"Seeded {len(reels)} reels.")

    for u in users:
        await users_col.update_one({"id": u["id"]}, {"$set": u}, upsert=True)
    logger.info(f"Seeded {len(users)} users.")

    for i in interactions:
        await interactions_col.update_one({"id": i["id"]}, {"$set": i}, upsert=True)
    logger.info(f"Seeded {len(interactions)} interactions.")

    await db_manager.close()
    logger.info("Database seeding completed successfully.")

if __name__ == "__main__":
    asyncio.run(seed_data())
