from typing import Dict, Any, List
from app.ai.demo_provider import DemoAIProvider
from app.ai.live_provider import LiveAIProvider
from app.core.config import settings
from app.schemas.recommendation import HypeAnalysisItem, HypeAnalysisResponse

class HypeDetector:
    """Detects exaggerated marketing, clickbait, and unrealistic career promises."""

    def __init__(self):
        self.ai = LiveAIProvider() if settings.AI_API_KEY and not settings.DEMO_MODE else DemoAIProvider()

    async def analyze_reel_hype(self, reel: Dict[str, Any]) -> HypeAnalysisItem:
        res = await self.ai.evaluate_hype(reel)
        return HypeAnalysisItem(
            reel_id=res["reel_id"],
            title=res["title"],
            creator=res["creator"],
            hype_score=res["hype_score"],
            educational_value=res["educational_value"],
            credibility=res["credibility"],
            decision=res["decision"],
            reasons=res["reasons"],
            detected_patterns=res["detected_patterns"]
        )

    async def get_system_hype_analysis(self, all_reels: List[Dict[str, Any]]) -> HypeAnalysisResponse:
        analyzed_items = []
        blocked_count = 0
        for r in all_reels:
            item = await self.analyze_reel_hype(r)
            if item.decision == "Reject" or item.hype_score > 60:
                blocked_count += 1
            analyzed_items.append(item)

        return HypeAnalysisResponse(
            analyzed_items=analyzed_items,
            shield_status="Active",
            total_blocked=blocked_count,
            protection_summary=f"Hype Shield actively scanned {len(all_reels)} reels and isolated {blocked_count} low-substance clickbait items."
        )

hype_detector = HypeDetector()
