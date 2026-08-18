from typing import Dict, Any, List
from app.ai.demo_provider import DemoAIProvider
from app.ai.live_provider import LiveAIProvider
from app.core.config import settings

class ExplanationEngine:
    """Generates transparent, human-readable explanations for recommendations."""

    def __init__(self):
        self.ai = LiveAIProvider() if settings.AI_API_KEY and not settings.DEMO_MODE else DemoAIProvider()

    async def explain_recommendation(
        self,
        current_reel: Dict[str, Any],
        latent_interest: str,
        recommended_reel: Dict[str, Any]
    ) -> Dict[str, Any]:
        why = f"Your recent interactions indicate a broader {latent_interest.lower()} interest rather than narrow {current_reel.get('primary_topic', 'Java')}-specific learning intent."
        
        return {
            "current_reel": current_reel.get("title", ""),
            "interest_detected": latent_interest,
            "recommended_reel": recommended_reel.get("title", ""),
            "category": f"{recommended_reel.get('primary_topic')} / {recommended_reel.get('broader_domain')}",
            "why_this_recommendation": why,
            "why_path": ["Java", "Programming", "Software Engineering", "Backend", "System Design"],
            "difficulty": recommended_reel.get("difficulty", "Intermediate"),
            "confidence": "High"
        }

explanation_engine = ExplanationEngine()
