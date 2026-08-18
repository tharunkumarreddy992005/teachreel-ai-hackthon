import pytest
from app.services.feedback_engine import feedback_engine
from app.models.interest import InterestItem

def test_feedback_engine_adaptation():
    """Verifies that user feedback correctly shifts Interest DNA scores."""
    initial_dna = [
        InterestItem(topic="Software Engineering", score=87.0, confidence="High", trend="+42%", trend_direction="up", evidence_count=5),
        InterestItem(topic="AI", score=51.0, confidence="Medium", trend="+12%", trend_direction="up", evidence_count=1),
        InterestItem(topic="Hardware", score=43.0, confidence="Medium", trend="+8%", trend_direction="neutral", evidence_count=1)
    ]

    # User gives "More AI" feedback
    updated_dna = feedback_engine.process_feedback(
        current_dna=initial_dna,
        rating="Very Useful",
        reasons=["More AI"]
    )

    ai_item = next(item for item in updated_dna if item.topic == "AI")
    assert ai_item.score > 51.0, f"Expected AI score to increase, got {ai_item.score}"
    assert ai_item.score == 66.0
