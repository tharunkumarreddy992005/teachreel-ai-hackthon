from typing import Dict, Any, List
from app.ai.demo_provider import DemoAIProvider
from app.ai.live_provider import LiveAIProvider
from app.core.config import settings

class ContentAnalyzer:
    """Analyzes reel content, behavioral telemetry, and decomposes entertainment vs learning intent."""

    def __init__(self):
        self.ai = LiveAIProvider() if settings.AI_API_KEY and not settings.DEMO_MODE else DemoAIProvider()

    async def analyze_interaction(self, reel: Dict[str, Any], interaction: Dict[str, Any]) -> Dict[str, Any]:
        """Analyzes a single reel interaction for multifaceted intent."""
        intent = await self.ai.analyze_intent(reel, interaction)
        return {
            "reel_id": reel.get("id"),
            "title": reel.get("title"),
            "primary_topic": reel.get("primary_topic"),
            "domain": reel.get("broader_domain"),
            "watch_percentage": interaction.get("watch_percentage", 0),
            "replay_count": interaction.get("replay_count", 0),
            "liked": interaction.get("liked", False),
            "saved": interaction.get("saved", False),
            "shared": interaction.get("shared", False),
            "intent": intent
        }

    async def analyze_batch(self, reels_map: Dict[str, Dict[str, Any]], interactions: List[Dict[str, Any]]) -> List[Dict[str, Any]]:
        results = []
        for inter in interactions:
            reel_id = inter.get("reel_id")
            reel = reels_map.get(reel_id, {})
            analyzed = await self.analyze_interaction(reel, inter)
            results.append(analyzed)
        return results

content_analyzer = ContentAnalyzer()
