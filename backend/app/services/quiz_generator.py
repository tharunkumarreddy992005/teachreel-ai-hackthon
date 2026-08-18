from typing import Dict, Any
from app.ai.demo_provider import DemoAIProvider
from app.ai.live_provider import LiveAIProvider
from app.core.config import settings
from app.models.learning import QuizQuestion

class QuizGenerator:
    """Generates and grades technical quizzes based on recommended reels."""

    def __init__(self):
        self.ai = LiveAIProvider() if settings.AI_API_KEY and not settings.DEMO_MODE else DemoAIProvider()

    async def get_or_generate_quiz(self, reel: Dict[str, Any]) -> QuizQuestion:
        quiz_data = await self.ai.generate_quiz(reel)
        return QuizQuestion(
            id=quiz_data["id"],
            reel_id=quiz_data["reel_id"],
            question=quiz_data["question"],
            options=quiz_data["options"],
            correct_option_index=quiz_data["correct_option_index"],
            explanation=quiz_data["explanation"],
            difficulty=quiz_data.get("difficulty", "Intermediate")
        )

quiz_generator = QuizGenerator()
