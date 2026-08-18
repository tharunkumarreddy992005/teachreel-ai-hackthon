from app.database.mongodb import db_manager
from app.core.logging import logger

async def create_indexes():
    """Create MongoDB indexes if connected."""
    if not db_manager.is_connected or db_manager.db is None:
        logger.info("Skipping MongoDB index creation (running in in-memory fallback mode).")
        return
    try:
        db = db_manager.db
        await db.users.create_index("id", unique=True)
        await db.reels.create_index("id", unique=True)
        await db.reels.create_index("primary_topic")
        await db.interactions.create_index([("user_id", 1), ("reel_id", 1)])
        await db.interactions.create_index("timestamp")
        await db.interest_profiles.create_index("user_id", unique=True)
        await db.recommendations.create_index([("user_id", 1), ("created_at", -1)])
        logger.info("MongoDB indexes successfully created.")
    except Exception as e:
        logger.warning(f"Error creating MongoDB indexes: {e}")
