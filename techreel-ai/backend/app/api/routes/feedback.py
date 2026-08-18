from fastapi import APIRouter
from app.schemas.feedback import FeedbackRequest, FeedbackResponse
from app.database.collections import get_feedback_collection, get_interest_profiles_collection
from app.services.feedback_engine import feedback_engine
from app.models.interest import InterestItem
from app.utils.helpers import get_utc_now

router = APIRouter()

@router.post("/feedback", response_model=FeedbackResponse)
async def submit_feedback(request: FeedbackRequest):
    """Processes user rating and explicit preferences to immediately adapt their Interest DNA."""
    feedback_col = get_feedback_collection()
    profiles_col = get_interest_profiles_collection()

    await feedback_col.insert_one({
        "user_id": request.user_id,
        "reel_id": request.reel_id,
        "recommendation_id": request.recommendation_id,
        "rating": request.rating,
        "reasons": request.reasons,
        "timestamp": get_utc_now()
    })

    # Fetch current profile
    profile = await profiles_col.find_one({"user_id": request.user_id})
    raw_dna = profile.get("interest_dna", []) if profile else []
    dna_items = [InterestItem(**d) for d in raw_dna] if raw_dna else [
        InterestItem(topic="Software Engineering", score=87, confidence="High", trend="+42%", trend_direction="up", evidence_count=5),
        InterestItem(topic="AI", score=51, confidence="Medium", trend="+12%", trend_direction="up", evidence_count=1)
    ]

    updated_dna = feedback_engine.process_feedback(dna_items, request.rating, request.reasons)

    # Save back to database
    await profiles_col.update_one(
        {"user_id": request.user_id},
        {"$set": {"interest_dna": [item.dict() for item in updated_dna], "updated_at": get_utc_now()}},
        upsert=True
    )

    reasons_str = ", ".join(request.reasons) if request.reasons else request.rating
    return FeedbackResponse(
        success=True,
        message="Feedback successfully incorporated into interest model.",
        updated_interest_dna=updated_dna,
        adaptation_summary=f"Profile adapted based on '{request.rating}' rating and reasons: [{reasons_str}]."
    )
