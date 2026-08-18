from fastapi import APIRouter, HTTPException
from app.schemas.analysis import AnalyzeRequest, AnalyzeResponse, AnalyzedReelSummary, IntentBreakdown
from app.database.collections import get_interactions_collection, get_reels_collection, get_interest_profiles_collection
from app.services.content_analyzer import content_analyzer
from app.services.fatigue_detector import fatigue_detector
from app.services.interest_engine import interest_engine
from app.ai.embeddings import embedding_engine
import time

router = APIRouter()

@router.post("/analyze", response_model=AnalyzeResponse)
async def analyze_feed(request: AnalyzeRequest):
    """Decomposes recent interactions into Entertainment, Learning, Career, and Curiosity intents.
    Supports whole-feed analysis and custom manual reel testing with live MongoDB persistence."""
    interactions_col = get_interactions_collection()
    reels_col = get_reels_collection()
    profiles_col = get_interest_profiles_collection()

    # Handle manual reel submission if provided
    if request.reel_title and request.topic:
        manual_reel_id = f"custom_reel_{int(time.time())}"
        custom_reel = {
            "id": manual_reel_id,
            "title": request.reel_title,
            "description": request.reel_description or request.reel_title,
            "primary_topic": request.topic,
            "broader_domain": "Software Engineering" if request.topic in ["Java", "System Design", "Backend", "DSA", "Programming"] else "Technology",
            "difficulty": "Intermediate",
            "creator": "@demo_creator",
            "duration_seconds": 60,
            "educational_value": 85.0 if "System" in request.reel_title or "Scale" in request.reel_title else (25.0 if "GUARANTEE" in request.reel_title else 60.0),
            "credibility": 88.0 if "GUARANTEE" not in request.reel_title else 15.0,
            "hype_score": 95.0 if "GUARANTEE" in request.reel_title or "10 AI Tools" in request.reel_title else 12.0,
            "embedding": embedding_engine.generate_embedding(f"{request.reel_title} {request.reel_description} {request.topic}")
        }
        await reels_col.update_one({"id": manual_reel_id}, {"$set": custom_reel}, upsert=True)

        custom_interaction = {
            "id": f"inter_{manual_reel_id}",
            "user_id": request.user_id,
            "reel_id": manual_reel_id,
            "watch_percentage": request.watch_percentage or 95.0,
            "replay_count": request.replay_count or 1,
            "liked": request.liked if request.liked is not None else True,
            "saved": request.saved if request.saved is not None else False,
            "shared": False,
            "created_at": time.strftime("%Y-%m-%dT%H:%M:%SZ")
        }
        await interactions_col.update_one({"id": custom_interaction["id"]}, {"$set": custom_interaction}, upsert=True)

    raw_interactions = await interactions_col.find({"user_id": request.user_id})
    if not raw_interactions:
        raw_interactions = await interactions_col.find({})

    all_reels = await reels_col.find({})
    reels_map = {r["id"]: r for r in all_reels}

    # Recalculate Interest DNA profile and persist to MongoDB
    updated_profile = await interest_engine.compute_interest_profile(request.user_id, raw_interactions, reels_map)
    await profiles_col.update_one({"user_id": request.user_id}, {"$set": updated_profile.model_dump()}, upsert=True)

    analyzed_list = []
    for inter in raw_interactions:
        reel_id = inter.get("reel_id")
        reel = reels_map.get(reel_id, {})
        res = await content_analyzer.analyze_interaction(reel, inter)
        analyzed_list.append(
            AnalyzedReelSummary(
                reel_id=res["reel_id"] or str(reel_id),
                title=res["title"] or reel.get("title", "Untitled Reel"),
                primary_topic=res["primary_topic"] or reel.get("primary_topic", "General"),
                domain=res["domain"] or reel.get("broader_domain", "Technology"),
                watch_percentage=res["watch_percentage"],
                replay_count=res["replay_count"],
                liked=res["liked"],
                saved=res["saved"],
                shared=res["shared"],
                intent=IntentBreakdown(
                    entertainment_intent=res["intent"]["entertainment_intent"],
                    learning_intent=res["intent"]["learning_intent"],
                    career_intent=res["intent"]["career_intent"],
                    curiosity=res["intent"]["curiosity"],
                    key_insight=res["intent"]["key_insight"]
                )
            )
        )

    is_fatigued, fatigued_topics, _ = fatigue_detector.check_fatigue(raw_interactions, reels_map)

    return AnalyzeResponse(
        user_id=request.user_id,
        analyzed_count=len(analyzed_list),
        analyzed_reels=analyzed_list,
        summary_insight="High watch time does not automatically mean high learning intent. Multidimensional intent decomposed and persisted to MongoDB.",
        fatigue_detected=is_fatigued,
        fatigued_topics=fatigued_topics
    )
