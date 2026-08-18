from fastapi import APIRouter, HTTPException, Query
from typing import Optional
from app.schemas.recommendation import (
    RecommendationResponse,
    RecommendationDetail,
    CurrentReelInfo,
    InterestDetectedInfo,
    HypeAnalysisResponse
)
from app.schemas.analysis import IntentBreakdown
from app.database.collections import (
    get_interactions_collection,
    get_reels_collection,
    get_interest_profiles_collection
)
from app.services.interest_engine import interest_engine
from app.services.vector_search import vector_search_service
from app.services.recommendation_engine import recommendation_engine
from app.services.hype_detector import hype_detector
from app.services.explanation_engine import explanation_engine
from app.services.content_analyzer import content_analyzer

router = APIRouter()

@router.get("/user/recommendations", response_model=RecommendationResponse)
async def get_recommendations(user_id: str = Query(default="student_001")):
    """Retrieves top recommendations and rejection explanations."""
    interactions_col = get_interactions_collection()
    reels_col = get_reels_collection()
    profiles_col = get_interest_profiles_collection()

    raw_interactions = await interactions_col.find({"user_id": user_id})
    if not raw_interactions:
        raw_interactions = await interactions_col.find({})

    all_reels = await reels_col.find({})
    reels_map = {r["id"]: r for r in all_reels}

    interest_profile = await interest_engine.compute_interest_profile(user_id, raw_interactions, reels_map)
    latent_topic = interest_profile.hidden_interest.primary_topic if interest_profile.hidden_interest else "Software Engineering"

    seen_topics = [reels_map.get(i.get("reel_id"), {}).get("primary_topic", "") for i in raw_interactions]

    query_text = f"{latent_topic} backend distributed system design dsa"
    candidates = await vector_search_service.search_candidates(query_text, all_reels, top_k=10)

    recs = recommendation_engine.generate_recommendations(
        user_id=user_id,
        interest_profile=interest_profile,
        candidate_reels=candidates,
        seen_topics=seen_topics
    )

    if not recs:
        raise HTTPException(status_code=404, detail="No candidate recommendations found")

    top_rec = recs[0]

    curr_inter = raw_interactions[0] if raw_interactions else {}
    curr_reel = reels_map.get(curr_inter.get("reel_id"), {})
    
    # Decompose current reel intent
    analyzed_curr = await content_analyzer.analyze_interaction(curr_reel, curr_inter)

    curr_info = CurrentReelInfo(
        title=curr_reel.get("title", "POV: Your Java code works on the first try 😂"),
        topic=curr_reel.get("primary_topic", "Java"),
        watch_percentage=curr_inter.get("watch_percentage", 94.0),
        replay_count=curr_inter.get("replay_count", 2),
        liked=curr_inter.get("liked", True),
        saved=curr_inter.get("saved", False),
        intent=IntentBreakdown(
            entertainment_intent=analyzed_curr["intent"]["entertainment_intent"],
            learning_intent=analyzed_curr["intent"]["learning_intent"],
            career_intent=analyzed_curr["intent"]["career_intent"],
            curiosity=analyzed_curr["intent"]["curiosity"],
            key_insight=analyzed_curr["intent"]["key_insight"]
        )
    )

    detected_info = InterestDetectedInfo(
        topic=latent_topic,
        score=interest_profile.hidden_interest.score if interest_profile.hidden_interest else 87.0,
        confidence=interest_profile.hidden_interest.confidence if interest_profile.hidden_interest else "High"
    )

    # Convert recs to details
    details = []
    for r in recs:
        r_reel = reels_map.get(r.reel_id, {})
        details.append(RecommendationDetail(
            id=r.id,
            reel_id=r.reel_id,
            title=r.title,
            description=r_reel.get("description"),
            creator=r_reel.get("creator"),
            duration_seconds=r_reel.get("duration_seconds", 60),
            category=r.category,
            difficulty=r.difficulty,
            confidence=r.confidence,
            score=r.score,
            scores=r.scores,
            why=r.why,
            why_path=r.why_path,
            micro_learning=r.micro_learning,
            rejected_candidates=r.rejected_candidates,
            thumbnail_url=r_reel.get("thumbnail_url"),
            url=r_reel.get("url")
        ))

    return RecommendationResponse(
        current_reel=curr_info,
        interest_detected=detected_info,
        recommendation=details[0],
        scores={
            "interest_match": top_rec.scores.interest_match,
            "learning_value": top_rec.scores.learning_value,
            "career_relevance": top_rec.scores.career_relevance,
            "credibility": top_rec.scores.credibility,
            "novelty": top_rec.scores.novelty
        },
        why=top_rec.why,
        confidence=top_rec.confidence,
        all_recommendations=details
    )

@router.get("/user/recommendations/{id}", response_model=RecommendationDetail)
async def get_recommendation_by_id(id: str):
    """Fetches details for a specific recommendation ID or reel ID."""
    reels_col = get_reels_collection()
    reel = await reels_col.find_one({"id": id})
    if not reel:
        all_reels = await reels_col.find({})
        reel = all_reels[0] if all_reels else None

    if not reel:
        raise HTTPException(status_code=404, detail="Reel not found")

    return RecommendationDetail(
        id=f"rec_{reel['id']}",
        reel_id=reel["id"],
        title=reel["title"],
        description=reel.get("description"),
        creator=reel.get("creator"),
        duration_seconds=reel.get("duration_seconds", 60),
        category=f"{reel.get('primary_topic')} / {reel.get('broader_domain')}",
        difficulty=reel.get("difficulty", "Intermediate"),
        confidence="High",
        score=91.0,
        scores={
            "interest_match": 94.0,
            "learning_value": 91.0,
            "career_relevance": 88.0,
            "credibility": 86.0,
            "novelty": 79.0,
            "difficulty_fit": 92.0,
            "diversity_bonus": 80.0,
            "hype_penalty": 0.0,
            "repetition_penalty": 0.0,
            "total_score": 91.0
        },
        why="High educational value and direct alignment with your latent software engineering discovery.",
        why_path=["Java", "Software Engineering", "System Design"],
        thumbnail_url=reel.get("thumbnail_url"),
        url=reel.get("url")
    )

@router.get("/user/hype-analysis", response_model=HypeAnalysisResponse)
async def get_hype_analysis():
    """Scans all reels and returns Hype Shield decisions, educational credibility, and blocked items."""
    reels_col = get_reels_collection()
    all_reels = await reels_col.find({})
    return await hype_detector.get_system_hype_analysis(all_reels)
