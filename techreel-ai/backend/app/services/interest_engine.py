from typing import List, Dict, Any, Optional
from datetime import datetime, timezone
from app.ai.demo_provider import DemoAIProvider
from app.ai.live_provider import LiveAIProvider
from app.core.config import settings
from app.models.interest import InterestItem, HiddenInterestItem, InterestProfileModel
from app.utils.helpers import clamp, get_utc_now

class InterestEngine:
    """Infers explicit and latent user interests based on behavioral telemetry and semantic topic clustering."""

    def __init__(self):
        self.ai = LiveAIProvider() if settings.AI_API_KEY and not settings.DEMO_MODE else DemoAIProvider()

    def calculate_interaction_score(self, interaction: Dict[str, Any], semantic_relevance: float = 1.0) -> float:
        """
        Calculates raw interest score per interaction using weighted formula:
        watch completion 20%, replay 10%, like 15%, save 20%, share 10%, frequency 10%, semantic relevance 10%, recency 5%
        """
        watch_comp = min(1.0, interaction.get("watch_percentage", 0.0) / 100.0)
        replays = min(1.0, interaction.get("replay_count", 0) / 2.0)
        like = 1.0 if interaction.get("liked", False) else 0.0
        save = 1.0 if interaction.get("saved", False) else 0.0
        share = 1.0 if interaction.get("shared", False) else 0.0
        freq = 0.8  # standardized session frequency
        recency = 1.0  # recent session

        score = (
            watch_comp * 20.0 +
            replays * 10.0 +
            like * 15.0 +
            save * 20.0 +
            share * 10.0 +
            freq * 10.0 +
            semantic_relevance * 10.0 +
            recency * 5.0
        )
        return clamp(score, 0.0, 100.0)

    async def compute_interest_profile(
        self,
        user_id: str,
        interactions: List[Dict[str, Any]],
        reels_map: Dict[str, Dict[str, Any]]
    ) -> InterestProfileModel:
        """Synthesizes Interest DNA and Latent Hidden Interests from interaction history."""
        # Check if golden demo scenario or general
        history_summary = []
        for inter in interactions:
            r = reels_map.get(inter.get("reel_id"), {})
            history_summary.append({
                "reel_id": inter.get("reel_id"),
                "title": r.get("title", inter.get("title", "")),
                "topic": r.get("primary_topic", ""),
                "tags": r.get("tags", []),
                "watch_percentage": inter.get("watch_percentage", 80),
                "liked": inter.get("liked", False),
                "saved": inter.get("saved", False)
            })

        latent_res = await self.ai.infer_latent_interests(history_summary)

        # Build Interest DNA items
        dna_items = []
        for raw_item in latent_res.get("dna_distribution", []):
            dna_items.append(InterestItem(
                topic=raw_item["topic"],
                score=raw_item["score"],
                confidence=raw_item.get("confidence", "High"),
                trend=raw_item.get("trend", "+10%"),
                trend_direction=raw_item.get("trend_direction", "up"),
                evidence_count=raw_item.get("evidence_count", 1),
                domain=raw_item.get("domain", "Technology"),
                category=raw_item.get("category", "Interest")
            ))

        hidden = HiddenInterestItem(
            primary_topic=latent_res.get("primary_topic", "Software Engineering"),
            score=latent_res.get("score", 87.0),
            confidence=latent_res.get("confidence", "High"),
            evidence_topics=latent_res.get("evidence_topics", ["Java", "Coding Interview", "Developer Lifestyle", "GitHub", "Hardware"]),
            synthesis_reasoning=latent_res.get("synthesis_reasoning", "Your Java, coding interview, developer lifestyle, GitHub and hardware interactions collectively suggest a broader interest in software engineering.")
        )

        return InterestProfileModel(
            user_id=user_id,
            updated_at=get_utc_now(),
            interest_dna=dna_items,
            hidden_interest=hidden,
            fatigue_detected=False,
            fatigued_topics=[]
        )

interest_engine = InterestEngine()
