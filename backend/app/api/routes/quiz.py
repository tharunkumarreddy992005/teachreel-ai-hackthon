from fastapi import APIRouter, HTTPException
from app.schemas.learning import QuizRequest, QuizResponse
from app.database.collections import get_reels_collection, get_quiz_results_collection
from app.services.quiz_generator import quiz_generator
from app.utils.helpers import get_utc_now

router = APIRouter()

@router.post("/quiz", response_model=QuizResponse)
async def handle_quiz(request: QuizRequest):
    """Generates or evaluates a micro-learning quiz for a specific reel."""
    reels_col = get_reels_collection()
    reel = await reels_col.find_one({"id": request.reel_id})
    if not reel:
        all_reels = await reels_col.find({})
        reel = all_reels[0] if all_reels else {"id": request.reel_id, "title": "System Design Architecture"}

    quiz_question = await quiz_generator.get_or_generate_quiz(reel)

    if request.user_answer_index is not None:
        is_correct = (request.user_answer_index == quiz_question.correct_option_index)
        score_awarded = 100 if is_correct else 0
        
        # Persist result
        quiz_col = get_quiz_results_collection()
        await quiz_col.insert_one({
            "user_id": request.user_id,
            "reel_id": request.reel_id,
            "quiz_id": quiz_question.id,
            "user_answer": request.user_answer_index,
            "is_correct": is_correct,
            "score": score_awarded,
            "timestamp": get_utc_now()
        })

        return QuizResponse(
            quiz=quiz_question,
            user_submitted=True,
            is_correct=is_correct,
            explanation=quiz_question.explanation,
            score_awarded=score_awarded
        )

    # Initial request without answer
    return QuizResponse(
        quiz=quiz_question,
        user_submitted=False,
        is_correct=None,
        explanation=quiz_question.explanation,
        score_awarded=0
    )
