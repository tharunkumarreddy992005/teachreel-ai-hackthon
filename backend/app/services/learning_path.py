from typing import List, Dict, Any
from app.models.learning import LearningStep, LearningPathModel
from app.utils.helpers import get_utc_now

class LearningPathService:
    """Generates structured step-by-step educational roadmap for the student."""

    def get_path_for_user(self, user_id: str) -> LearningPathModel:
        steps = [
            LearningStep(
                step=1,
                topic="Java & OOP Core",
                difficulty="Beginner",
                status="Completed",
                estimated_time="15 mins",
                reel_id="reel_001",
                reel_title="POV: Your Java code works on the first try 😂"
            ),
            LearningStep(
                step=2,
                topic="DSA & Problem Solving",
                difficulty="Intermediate",
                status="In Progress",
                estimated_time="30 mins",
                reel_id="reel_007",
                reel_title="Two-Pointer Technique: Master LeetCode Mediums"
            ),
            LearningStep(
                step=3,
                topic="Backend REST APIs",
                difficulty="Intermediate",
                status="Next Up",
                estimated_time="45 mins",
                reel_id="reel_011",
                reel_title="REST API Best Practices: Status Codes & Idempotency"
            ),
            LearningStep(
                step=4,
                topic="Databases & Indexing",
                difficulty="Intermediate",
                status="Upcoming",
                estimated_time="1 hour",
                reel_id="reel_010",
                reel_title="Why SQL Injection Still Happens and How Parameterized Queries Fix It"
            ),
            LearningStep(
                step=5,
                topic="System Design & Scalability",
                difficulty="Intermediate",
                status="Upcoming",
                estimated_time="1.5 hours",
                reel_id="reel_006",
                reel_title="How Backend Engineers Think About System Design"
            ),
            LearningStep(
                step=6,
                topic="Cloud & Container Deployment",
                difficulty="Advanced",
                status="Upcoming",
                estimated_time="2 hours",
                reel_id="reel_009",
                reel_title="Deploying Your First Container to Cloud with Docker & AWS ECS"
            )
        ]
        return LearningPathModel(
            user_id=user_id,
            title="Software Engineering & Backend Mastery Roadmap",
            steps=steps,
            updated_at=get_utc_now()
        )

learning_path_service = LearningPathService()
