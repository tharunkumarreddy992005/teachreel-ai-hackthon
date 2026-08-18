from typing import Optional, Dict, Any, List
import asyncio
from motor.motor_asyncio import AsyncIOMotorClient, AsyncIOMotorDatabase
from app.core.config import settings
from app.core.logging import logger
from app.utils.helpers import load_json_file, save_json_file

class MongoCollectionWrapper:
    """Unified wrapper around Motor AsyncIOMotorCollection ensuring consistent async API."""
    def __init__(self, motor_collection: Any):
        self._col = motor_collection

    async def find_one(self, query: Optional[Dict[str, Any]] = None) -> Optional[Dict[str, Any]]:
        query = query or {}
        doc = await self._col.find_one(query)
        if doc and "_id" in doc:
            doc["_id"] = str(doc["_id"])
        return doc

    async def find(self, query: Optional[Dict[str, Any]] = None, limit: int = 100) -> List[Dict[str, Any]]:
        query = query or {}
        cursor = self._col.find(query)
        docs = await cursor.to_list(length=limit)
        for doc in docs:
            if "_id" in doc:
                doc["_id"] = str(doc["_id"])
        return docs

    async def insert_one(self, document: Dict[str, Any]) -> Any:
        doc = dict(document)
        # Avoid duplicate _id if not ObjectId
        if "_id" in doc and not isinstance(doc["_id"], str):
            del doc["_id"]
        return await self._col.insert_one(doc)

    async def update_one(self, query: Dict[str, Any], update: Dict[str, Any], upsert: bool = False) -> Any:
        return await self._col.update_one(query, update, upsert=upsert)

    async def delete_many(self, query: Dict[str, Any]) -> Any:
        return await self._col.delete_many(query)

    async def create_index(self, *args, **kwargs) -> Any:
        return await self._col.create_index(*args, **kwargs)


class InMemoryCollection:
    """Resilient in-memory/json fallback collection when MongoDB is offline."""
    def __init__(self, name: str, initial_data: Optional[List[Dict[str, Any]]] = None):
        self.name = name
        self._data: Dict[str, Dict[str, Any]] = {}
        if initial_data:
            for item in initial_data:
                item_id = item.get("id") or item.get("_id") or str(len(self._data) + 1)
                self._data[str(item_id)] = dict(item)

    async def find_one(self, query: Optional[Dict[str, Any]] = None) -> Optional[Dict[str, Any]]:
        query = query or {}
        for item in self._data.values():
            if self._match(item, query):
                return dict(item)
        return None

    async def find(self, query: Optional[Dict[str, Any]] = None, limit: int = 100) -> List[Dict[str, Any]]:
        query = query or {}
        results = []
        for item in self._data.values():
            if self._match(item, query):
                results.append(dict(item))
                if len(results) >= limit:
                    break
        return results

    async def insert_one(self, document: Dict[str, Any]) -> Any:
        doc = dict(document)
        doc_id = str(doc.get("id") or doc.get("_id") or len(self._data) + 1)
        doc["_id"] = doc_id
        if "id" not in doc:
            doc["id"] = doc_id
        self._data[doc_id] = doc
        return type("InsertResult", (), {"inserted_id": doc_id})()

    async def update_one(self, query: Dict[str, Any], update: Dict[str, Any], upsert: bool = False) -> Any:
        matched_id = None
        for item_id, item in self._data.items():
            if self._match(item, query):
                matched_id = item_id
                break
        
        if matched_id:
            set_ops = update.get("$set", {})
            for k, v in set_ops.items():
                self._data[matched_id][k] = v
            return type("UpdateResult", (), {"matched_count": 1, "modified_count": 1})()
        elif upsert:
            new_doc = {**query, **update.get("$set", {})}
            await self.insert_one(new_doc)
            return type("UpdateResult", (), {"matched_count": 0, "modified_count": 1, "upserted_id": new_doc.get("id")})()
        
        return type("UpdateResult", (), {"matched_count": 0, "modified_count": 0})()

    async def delete_many(self, query: Dict[str, Any]) -> Any:
        to_del = [k for k, v in self._data.items() if self._match(v, query)]
        for k in to_del:
            del self._data[k]
        return type("DeleteResult", (), {"deleted_count": len(to_del)})()

    async def create_index(self, *args, **kwargs) -> Any:
        return "in_memory_index"

    def _match(self, item: Dict[str, Any], query: Dict[str, Any]) -> bool:
        for k, v in query.items():
            if k == "_id" or k == "id":
                if str(item.get("id")) != str(v) and str(item.get("_id")) != str(v):
                    return False
            elif item.get(k) != v:
                return False
        return True


class DatabaseManager:
    def __init__(self):
        self.client: Optional[AsyncIOMotorClient] = None
        self.db: Optional[AsyncIOMotorDatabase] = None
        self.is_connected: bool = False
        self.fallback_collections: Dict[str, InMemoryCollection] = {}
        self.mongo_wrappers: Dict[str, MongoCollectionWrapper] = {}
        # Pre-populate fallback data synchronously at construction time
        self.init_fallback_data()

    def init_fallback_data(self):
        """Pre-populate in-memory fallback collections from data folder."""
        data_dir = settings.DATA_PATH
        reels = load_json_file(data_dir / "reels.json")
        interactions = load_json_file(data_dir / "interactions.json")
        users = load_json_file(data_dir / "users.json")
        
        self.fallback_collections["reels"] = InMemoryCollection("reels", reels)
        self.fallback_collections["interactions"] = InMemoryCollection("interactions", interactions)
        self.fallback_collections["users"] = InMemoryCollection("users", users)
        self.fallback_collections["interest_profiles"] = InMemoryCollection("interest_profiles")
        self.fallback_collections["interest_graphs"] = InMemoryCollection("interest_graphs")
        self.fallback_collections["content_analysis"] = InMemoryCollection("content_analysis")
        self.fallback_collections["recommendations"] = InMemoryCollection("recommendations")
        self.fallback_collections["feedback"] = InMemoryCollection("feedback")
        self.fallback_collections["learning_paths"] = InMemoryCollection("learning_paths")
        self.fallback_collections["quiz_results"] = InMemoryCollection("quiz_results")

    async def sync_seed_to_mongodb(self):
        """Populates initial seed data into MongoDB Atlas if empty."""
        try:
            data_dir = settings.DATA_PATH
            reels_col = self.get_collection("reels")
            existing_reels = await reels_col.find({}, limit=1)
            if not existing_reels:
                reels = load_json_file(data_dir / "reels.json")
                for r in reels:
                    await reels_col.update_one({"id": r["id"]}, {"$set": r}, upsert=True)
                logger.info(f"Synchronized {len(reels)} seed reels to MongoDB Atlas.")

            interactions_col = self.get_collection("interactions")
            existing_inter = await interactions_col.find({}, limit=1)
            if not existing_inter:
                interactions = load_json_file(data_dir / "interactions.json")
                for i in interactions:
                    await interactions_col.update_one({"id": i["id"]}, {"$set": i}, upsert=True)
                logger.info(f"Synchronized {len(interactions)} seed interactions to MongoDB Atlas.")

            users_col = self.get_collection("users")
            existing_users = await users_col.find({}, limit=1)
            if not existing_users:
                users = load_json_file(data_dir / "users.json")
                for u in users:
                    await users_col.update_one({"id": u["id"]}, {"$set": u}, upsert=True)
                logger.info(f"Synchronized {len(users)} seed users to MongoDB Atlas.")
        except Exception as e:
            logger.warning(f"Seed sync to MongoDB Atlas notice: {e}")

    async def connect(self):
        uri = settings.MONGODB_URI
        # Check if uri is provided and not an unsubstituted placeholder
        if uri and "<db_password>" not in uri and "<password>" not in uri and uri.strip() != "":
            try:
                logger.info("Attempting secure connection to MongoDB...")
                self.client = AsyncIOMotorClient(uri, serverSelectionTimeoutMS=3000)
                await self.client.admin.command('ping')
                self.db = self.client[settings.DATABASE_NAME]
                self.is_connected = True
                logger.info(f"Successfully connected to MongoDB Atlas database: '{settings.DATABASE_NAME}'")
                # Auto seed initial collections if needed
                await self.sync_seed_to_mongodb()
            except Exception as e:
                self.is_connected = False
                logger.warning(f"MongoDB connection failed: {e}. Gracefully falling back to in-memory/JSON datastore.")
        else:
            self.is_connected = False
            if "<db_password>" in str(uri) or "<password>" in str(uri):
                logger.info("MongoDB URI contains password placeholder (<db_password>). Operating in Resilient In-Memory Datastore Mode.")
            else:
                logger.info("Operating in Resilient In-Memory Datastore Mode (MONGODB_URI not configured).")

    async def close(self):
        if self.client:
            self.client.close()
            logger.info("MongoDB connection closed.")

    def get_collection(self, name: str) -> Any:
        if self.is_connected and self.db is not None:
            if name not in self.mongo_wrappers:
                self.mongo_wrappers[name] = MongoCollectionWrapper(self.db[name])
            return self.mongo_wrappers[name]
        if name not in self.fallback_collections:
            self.fallback_collections[name] = InMemoryCollection(name)
        return self.fallback_collections[name]


db_manager = DatabaseManager()
