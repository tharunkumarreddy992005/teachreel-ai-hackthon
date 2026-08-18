from typing import List, Dict, Any, Optional
import math
import hashlib
import numpy as np
from app.core.config import settings
from app.core.logging import logger

class EmbeddingEngine:
    """Generates deterministic semantic vector embeddings and computes vector similarity."""
    
    def __init__(self, dimension: int = 64):
        self.dim = dimension

    def generate_embedding(self, text: str) -> List[float]:
        """Generates a normalized 64-dimensional semantic pseudo-embedding based on term hashes and keywords."""
        if not text:
            return [0.0] * self.dim
        
        vec = np.zeros(self.dim, dtype=np.float32)
        words = text.lower().replace(",", " ").replace(".", " ").replace(":", " ").split()
        
        # Keyword semantic clusters to assign dedicated vector dimensions
        topic_mappings = {
            "software": (0, 4), "engineering": (2, 6), "java": (4, 8),
            "programming": (6, 10), "dsa": (10, 14), "algorithm": (12, 16),
            "backend": (16, 20), "api": (18, 22), "system": (22, 26),
            "design": (24, 28), "cloud": (28, 32), "docker": (30, 34),
            "ai": (34, 38), "llm": (36, 40), "rag": (38, 42),
            "cybersecurity": (42, 46), "security": (44, 48), "sql": (48, 52),
            "hardware": (52, 56), "interview": (56, 60), "career": (58, 62)
        }
        
        for w in words:
            # Check domain clusters
            matched = False
            for k, (start, end) in topic_mappings.items():
                if k in w:
                    vec[start:end] += 1.5
                    matched = True
            
            # Universal term hashing for out-of-vocabulary words
            h = int(hashlib.md5(w.encode("utf-8")).hexdigest(), 16)
            idx = h % self.dim
            val = ((h >> 8) % 100) / 50.0 - 1.0  # [-1.0, 1.0]
            vec[idx] += val

        # Normalize L2
        norm = np.linalg.norm(vec)
        if norm > 0:
            vec = vec / norm
        return [float(x) for x in vec]

    def similarity(self, vec1: List[float], vec2: List[float]) -> float:
        if not vec1 or not vec2 or len(vec1) != len(vec2):
            return 0.0
        v1 = np.array(vec1, dtype=np.float32)
        v2 = np.array(vec2, dtype=np.float32)
        n1 = np.linalg.norm(v1)
        n2 = np.linalg.norm(v2)
        if n1 == 0 or n2 == 0:
            return 0.0
        dot = float(np.dot(v1, v2) / (n1 * n2))
        return max(0.0, min(1.0, (dot + 1.0) / 2.0))  # scaled [0, 1]

embedding_engine = EmbeddingEngine()
