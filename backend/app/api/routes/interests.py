from fastapi import APIRouter, Query
from app.schemas.interests import InterestDNAResponse, InterestGraphResponse
from app.database.collections import get_interactions_collection, get_reels_collection, get_interest_profiles_collection
from app.services.interest_engine import interest_engine
from app.services.interest_graph import interest_graph_service
from app.utils.helpers import get_utc_now

router = APIRouter()

@router.get("/user/interest-dna", response_model=InterestDNAResponse)
async def get_interest_dna(user_id: str = Query(default="student_001")):
    """Returns the inferred Interest DNA, scores, trends, evidence count, and latent interests."""
    profiles_col = get_interest_profiles_collection()
    cached = await profiles_col.find_one({"user_id": user_id})
    if cached and cached.get("interest_dna"):
        return InterestDNAResponse(
            user_id=user_id,
            interest_dna=cached["interest_dna"],
            hidden_interest=cached.get("hidden_interest"),
            fatigue_detected=cached.get("fatigue_detected", False),
            fatigued_topics=cached.get("fatigued_topics", []),
            updated_at=cached.get("updated_at", get_utc_now())
        )

    # Compute freshly from interactions
    interactions_col = get_interactions_collection()
    reels_col = get_reels_collection()
    raw_interactions = await interactions_col.find({"user_id": user_id})
    if not raw_interactions:
        raw_interactions = await interactions_col.find({})
    all_reels = await reels_col.find({})
    reels_map = {r["id"]: r for r in all_reels}

    profile = await interest_engine.compute_interest_profile(user_id, raw_interactions, reels_map)
    await profiles_col.update_one({"user_id": user_id}, {"$set": profile.model_dump()}, upsert=True)

    return InterestDNAResponse(
        user_id=user_id,
        interest_dna=profile.interest_dna,
        hidden_interest=profile.hidden_interest,
        fatigue_detected=profile.fatigue_detected,
        fatigued_topics=profile.fatigued_topics,
        updated_at=profile.updated_at
    )

@router.get("/user/interest-graph", response_model=InterestGraphResponse)
async def get_interest_graph(latent_topic: str = Query(default="Software Engineering")):
    """Returns the hierarchical technology concept graph with nodes, edges, and latent activation."""
    return interest_graph_service.get_full_graph(active_latent_topic=latent_topic)
