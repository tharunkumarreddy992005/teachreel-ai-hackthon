import pytest
from app.ai.demo_provider import DemoAIProvider
from app.services.interest_engine import interest_engine
from app.utils.helpers import load_json_file
from pathlib import Path

@pytest.mark.asyncio
async def test_latent_interest_discovery_golden_scenario():
    """
    CRITICAL TEST:
    Input: Java meme + Coding interview + Software engineer lifestyle + Laptop comparison + GitHub meme
    Expected: Latent interest is 'Software Engineering', NOT merely 'Java'.
    """
    provider = DemoAIProvider()
    
    # 5 Interactions representing the Golden Scenario
    interaction_history = [
        {"reel_id": "reel_001", "topic": "Java", "tags": ["java", "programming", "meme"], "watch_percentage": 94, "liked": True, "saved": False},
        {"reel_id": "reel_002", "topic": "Coding Interview", "tags": ["coding_interview", "faang", "dsa"], "watch_percentage": 88, "liked": True, "saved": False},
        {"reel_id": "reel_003", "topic": "Developer Lifestyle", "tags": ["software_engineer", "lifestyle"], "watch_percentage": 92, "liked": True, "saved": True},
        {"reel_id": "reel_004", "topic": "Hardware", "tags": ["hardware", "laptops", "benchmarks"], "watch_percentage": 85, "liked": False, "saved": True},
        {"reel_id": "reel_005", "topic": "GitHub", "tags": ["git", "github", "version_control"], "watch_percentage": 96, "liked": True, "saved": False},
    ]
    
    result = await provider.infer_latent_interests(interaction_history)
    
    # Assertions
    assert result["primary_topic"] == "Software Engineering", f"Expected 'Software Engineering', got {result['primary_topic']}"
    assert result["score"] >= 85.0
    assert result["confidence"] == "High"
    assert "Java" in result["evidence_topics"]
    assert "GitHub" in result["evidence_topics"]
    
    # Verify Interest DNA includes broader domains
    topics = [item["topic"] for item in result["dna_distribution"]]
    assert "Software Engineering" in topics
    assert "Programming" in topics
    assert "DSA" in topics
    assert "Developer Career" in topics
