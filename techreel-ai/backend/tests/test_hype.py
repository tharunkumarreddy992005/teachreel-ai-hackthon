import pytest
from app.services.hype_detector import hype_detector

@pytest.mark.asyncio
async def test_hype_detector_filtering():
    """Verifies that clickbait hype reels are correctly identified and flagged."""
    hype_reel = {
        "id": "reel_012",
        "title": "10 AI Tools that GUARANTEE a $200k Tech Job in 30 Days (No Coding!)",
        "creator": "@hype_grifter",
        "hype_score": 96.0,
        "educational_value": 22.0,
        "credibility": 14.0
    }
    
    result = await hype_detector.analyze_reel_hype(hype_reel)
    assert result.decision == "Reject"
    assert result.hype_score >= 90.0
    assert result.educational_value <= 30.0
    assert len(result.reasons) > 0
    assert any("guarantee" in r.lower() or "clickbait" in r.lower() or "unrealistic" in r.lower() for r in result.reasons)

@pytest.mark.asyncio
async def test_high_credibility_reel_accepted():
    clean_reel = {
        "id": "reel_006",
        "title": "How Backend Engineers Think About System Design",
        "creator": "@system_design_pro",
        "hype_score": 8.0,
        "educational_value": 91.0,
        "credibility": 92.0
    }
    
    result = await hype_detector.analyze_reel_hype(clean_reel)
    assert result.decision == "Accept"
    assert result.hype_score < 20.0
    assert result.credibility > 80.0
