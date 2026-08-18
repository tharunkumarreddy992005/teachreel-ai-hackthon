from fastapi import APIRouter, Query
from app.schemas.learning import LearningPathResponse
from app.services.learning_path import learning_path_service

router = APIRouter()

@router.get("/user/learning-path", response_model=LearningPathResponse)
async def get_user_learning_path(user_id: str = Query(default="student_001")):
    """Generates structured step-by-step roadmap tailored to inferred interests."""
    path_model = learning_path_service.get_path_for_user(user_id)
    return LearningPathResponse(
        user_id=user_id,
        title=path_model.title,
        steps=path_model.steps,
        estimated_total_hours=6.5,
        current_step_index=2,
        career_goal="Software / Backend Engineer"
    )
