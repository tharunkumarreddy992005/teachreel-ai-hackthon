"""
Pre-generates 64-dimensional semantic embeddings for all reels in data/reels.json.
"""
import sys
from pathlib import Path

# Add backend to path
sys.path.insert(0, str(Path(__file__).resolve().parent.parent / "backend"))

from app.ai.embeddings import embedding_engine
from app.utils.helpers import load_json_file, save_json_file
from app.core.config import settings
from app.core.logging import logger

def main():
    data_dir = settings.DATA_PATH
    reels_path = data_dir / "reels.json"
    reels = load_json_file(reels_path)

    if not reels:
        logger.error(f"No reels found in {reels_path}")
        return

    for r in reels:
        text_repr = f"{r.get('title', '')} {r.get('description', '')} {' '.join(r.get('tags', []))} {r.get('primary_topic', '')} {r.get('broader_domain', '')}"
        r["embedding"] = embedding_engine.generate_embedding(text_repr)

    save_json_file(reels_path, reels)
    logger.info(f"Generated semantic embeddings for {len(reels)} reels and updated {reels_path}.")

if __name__ == "__main__":
    main()
