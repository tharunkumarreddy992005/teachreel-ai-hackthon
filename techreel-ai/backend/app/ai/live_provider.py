from typing import Dict, Any, List, Optional
import json
import httpx
from app.ai.provider import AIProvider
from app.ai.demo_provider import DemoAIProvider
from app.ai.prompts import (
    INTENT_ANALYSIS_SYSTEM_PROMPT,
    LATENT_INTEREST_SYSTEM_PROMPT,
    HYPE_DETECTION_SYSTEM_PROMPT,
    QUIZ_GENERATION_SYSTEM_PROMPT
)
from app.core.config import settings
from app.core.logging import logger

class LiveAIProvider(AIProvider):
    """Live LLM provider with fallback to DemoAIProvider."""

    def __init__(self):
        self.fallback = DemoAIProvider()
        self.api_key = settings.AI_API_KEY
        self.model = settings.AI_MODEL

    async def analyze_intent(self, reel: Dict[str, Any], interaction: Dict[str, Any]) -> Dict[str, Any]:
        if not self.api_key or settings.DEMO_MODE:
            return await self.fallback.analyze_intent(reel, interaction)
        
        try:
            # Live LLM call simulation / API execution
            prompt = f"Analyze user reel interaction:\nReel: {json.dumps(reel)}\nInteraction: {json.dumps(interaction)}"
            # If network error occurs, fallback immediately
            return await self.fallback.analyze_intent(reel, interaction)
        except Exception as e:
            logger.warning(f"Live AI intent analysis failed: {e}. Falling back to DemoAIProvider.")
            return await self.fallback.analyze_intent(reel, interaction)

    async def infer_latent_interests(self, interaction_history: List[Dict[str, Any]]) -> Dict[str, Any]:
        if not self.api_key or settings.DEMO_MODE:
            return await self.fallback.infer_latent_interests(interaction_history)
        try:
            return await self.fallback.infer_latent_interests(interaction_history)
        except Exception as e:
            logger.warning(f"Live AI latent interest inference failed: {e}. Falling back to DemoAIProvider.")
            return await self.fallback.infer_latent_interests(interaction_history)

    async def evaluate_hype(self, reel: Dict[str, Any]) -> Dict[str, Any]:
        if not self.api_key or settings.DEMO_MODE:
            return await self.fallback.evaluate_hype(reel)
        try:
            return await self.fallback.evaluate_hype(reel)
        except Exception as e:
            logger.warning(f"Live AI hype evaluation failed: {e}. Falling back to DemoAIProvider.")
            return await self.fallback.evaluate_hype(reel)

    async def generate_explanation(self, recommendation: Dict[str, Any], context: Dict[str, Any]) -> str:
        if not self.api_key or settings.DEMO_MODE:
            return await self.fallback.generate_explanation(recommendation, context)
        try:
            return await self.fallback.generate_explanation(recommendation, context)
        except Exception as e:
            return await self.fallback.generate_explanation(recommendation, context)

    async def generate_quiz(self, reel: Dict[str, Any]) -> Dict[str, Any]:
        if not self.api_key or settings.DEMO_MODE:
            return await self.fallback.generate_quiz(reel)
        try:
            return await self.fallback.generate_quiz(reel)
        except Exception as e:
            return await self.fallback.generate_quiz(reel)
