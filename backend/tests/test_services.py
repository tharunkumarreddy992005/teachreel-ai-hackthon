import pytest
from app.services.emerging_interest import emerging_interest_service
from app.services.knowledge_gap import knowledge_gap_service
from app.services.career_alignment import career_alignment_service
from app.services.interest_bridge import interest_bridge_service
from app.services.credibility_engine import credibility_engine
from app.services.fatigue_detector import fatigue_detector

def test_emerging_interest_detection():
    dna = [
        {"topic": "Software Engineering", "score": 88, "confidence": "High"},
        {"topic": "Backend", "score": 82, "confidence": "High"},
        {"topic": "AI", "score": 65, "confidence": "Medium"}
    ]
    emerging = emerging_interest_service.get_emerging_interests(dna)
    assert len(emerging) > 0
    assert any("AI" in item["topic"] or "Cloud" in item["topic"] for item in emerging)

def test_knowledge_gap_identification():
    dna = [
        {"topic": "Software Engineering", "score": 90, "confidence": "High"},
        {"topic": "System Design", "score": 85, "confidence": "High"}
    ]
    gaps = knowledge_gap_service.get_knowledge_gaps(dna)
    assert len(gaps) > 0
    assert any("Database" in g["topic"] or "Network" in g["topic"] for g in gaps)

def test_career_alignment_calculation():
    dna = [
        {"topic": "Software Engineering", "score": 92, "confidence": "High"},
        {"topic": "Backend", "score": 85, "confidence": "High"}
    ]
    alignments = career_alignment_service.get_career_alignments(dna)
    assert len(alignments) >= 3
    top_role = alignments[0]
    assert top_role["role"] == "Software Engineer"
    assert top_role["match_score"] >= 85

def test_interest_bridge_generation():
    bridges = interest_bridge_service.get_bridges()
    assert len(bridges) >= 2
    for b in bridges:
        assert "topic_a" in b
        assert "topic_b" in b
        assert "bridge_topic" in b
        assert b["relevance_score"] > 50

def test_smart_surprise_content():
    surprise = interest_bridge_service.get_smart_surprise()
    assert "title" in surprise
    assert "surprise_factor" in surprise
    assert surprise["surprise_factor"] >= 70

def test_credibility_calculation():
    verified_reel = {
        "creator": "@system_design_pro",
        "description": "Comprehensive explanation of microservices",
        "educational_value": 90
    }
    score = credibility_engine.calculate_credibility(verified_reel)
    assert score >= 75

def test_fatigue_detection():
    repetitive_interactions = [
        {"reel_id": f"r_{i}", "watch_percentage": 90} for i in range(4)
    ]
    reels_map = {
        f"r_{i}": {"id": f"r_{i}", "primary_topic": "Java Memes", "tags": ["meme", "humor"]}
        for i in range(4)
    }
    detected, topics, message = fatigue_detector.check_fatigue(repetitive_interactions, reels_map)
    assert detected is True
    assert "Java Memes" in topics
    assert "fatigue" in message.lower()
