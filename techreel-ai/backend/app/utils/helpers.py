import json
from pathlib import Path
from typing import Any, Dict, List, Optional
from datetime import datetime, timezone
import math

def load_json_file(file_path: Path) -> Any:
    """Safely loads a JSON file, returning empty list/dict on error."""
    try:
        if not file_path.exists():
            return []
        with open(file_path, "r", encoding="utf-8") as f:
            return json.load(f)
    except Exception:
        return []

def save_json_file(file_path: Path, data: Any) -> bool:
    """Safely writes JSON data to a file."""
    try:
        file_path.parent.mkdir(parents=True, exist_ok=True)
        with open(file_path, "w", encoding="utf-8") as f:
            json.dump(data, f, indent=2)
        return True
    except Exception:
        return False

def get_utc_now() -> str:
    """Returns ISO format UTC timestamp string."""
    return datetime.now(timezone.utc).isoformat()

def clamp(val: float, min_val: float = 0.0, max_val: float = 100.0) -> float:
    """Clamps a numeric value between min_val and max_val."""
    return max(min_val, min(val, max_val))

def cosine_similarity(vec1: List[float], vec2: List[float]) -> float:
    """Calculates cosine similarity between two float vectors."""
    if not vec1 or not vec2 or len(vec1) != len(vec2):
        return 0.0
    dot = sum(a * b for a, b in zip(vec1, vec2))
    norm1 = math.sqrt(sum(a * a for a in vec1))
    norm2 = math.sqrt(sum(b * b for b in vec2))
    if norm1 == 0 or norm2 == 0:
        return 0.0
    return dot / (norm1 * norm2)
