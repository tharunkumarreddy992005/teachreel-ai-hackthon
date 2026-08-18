from typing import List, Dict, Any, Optional
from app.ai.embeddings import embedding_engine
from app.database.collections import get_reels_collection
from app.database.mongodb import db_manager
from app.core.logging import logger

class VectorSearchService:
    """Performs semantic candidate retrieval using MongoDB Atlas Vector Search or local cosine similarity."""

    async def search_candidates(
        self,
        query_text: str,
        all_reels: List[Dict[str, Any]],
        top_k: int = 8
    ) -> List[Dict[str, Any]]:
        """Retrieves top candidate reels semantically aligned with query_text."""
        query_vector = embedding_engine.generate_embedding(query_text)
        
        # In-memory / Fallback local cosine similarity
        scored_candidates = []
        for reel in all_reels:
            # Generate or fetch embedding
            text_repr = f"{reel.get('title', '')} {reel.get('description', '')} {' '.join(reel.get('tags', []))} {reel.get('primary_topic', '')} {reel.get('broader_domain', '')}"
            reel_vec = reel.get("embedding") or embedding_engine.generate_embedding(text_repr)
            
            sim = embedding_engine.similarity(query_vector, reel_vec)
            scored_candidates.append({
                "reel": reel,
                "similarity": sim
            })

        # Sort by similarity descending
        scored_candidates.sort(key=lambda x: x["similarity"], reverse=True)
        return [item["reel"] for item in scored_candidates[:top_k]]

vector_search_service = VectorSearchService()
