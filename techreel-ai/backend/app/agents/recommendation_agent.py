from typing import Dict, Any, List, Optional
from app.database.collections import (
    get_reels_collection,
    get_interactions_collection,
    get_interest_profiles_collection,
    get_recommendations_collection
)
from app.services.content_analyzer import content_analyzer
from app.services.interest_engine import interest_engine
from app.services.interest_graph import interest_graph_service
from app.services.vector_search import vector_search_service
from app.services.hype_detector import hype_detector
from app.services.fatigue_detector import fatigue_detector
from app.services.recommendation_engine import recommendation_engine
from app.services.explanation_engine import explanation_engine
from app.services.emerging_interest import emerging_interest_service
from app.services.knowledge_gap import knowledge_gap_service
from app.services.career_alignment import career_alignment_service
from app.services.learning_path import learning_path_service
from app.core.logging import logger
from app.utils.helpers import get_utc_now

class RecommendationAgent:
    """
    Unified Recommendation Agent implementing the end-to-end cognitive loop:
    OBSERVE -> UNDERSTAND -> INFER -> PLAN -> RETRIEVE -> EVALUATE -> FILTER -> RANK -> EXPLAIN -> LEARN
    """

    async def run_pipeline(self, user_id: str = "student_001") -> Dict[str, Any]:
        logger.info(f"Agent starting recommendation pipeline for {user_id}")
        
        # 1. OBSERVE: Fetch user interactions and reel catalog
        interactions_col = get_interactions_collection()
        reels_col = get_reels_collection()
        
        raw_interactions = await interactions_col.find({"user_id": user_id})
        if not raw_interactions:
            raw_interactions = await interactions_col.find({})
            
        all_reels_list = await reels_col.find({})
        reels_map = {r["id"]: r for r in all_reels_list}

        # 2. UNDERSTAND: Decompose intent (Entertainment vs Learning vs Career)
        analyzed_interactions = await content_analyzer.analyze_batch(reels_map, raw_interactions)
        
        # 3. INFER: Discover Latent Interests & compute Interest DNA
        interest_profile = await interest_engine.compute_interest_profile(user_id, raw_interactions, reels_map)
        
        # Check Content Fatigue
        is_fatigued, fatigued_topics, fatigue_msg = fatigue_detector.check_fatigue(raw_interactions, reels_map)
        interest_profile.fatigue_detected = is_fatigued
        interest_profile.fatigued_topics = fatigued_topics

        # 4. PLAN: Determine exploration / exploitation strategy (70/20/10)
        seen_topics = list({reels_map.get(i.get("reel_id"), {}).get("primary_topic", "") for i in raw_interactions if reels_map.get(i.get("reel_id"))})
        latent_topic = interest_profile.hidden_interest.primary_topic if interest_profile.hidden_interest else "Software Engineering"

        # 5. RETRIEVE: Semantic search & candidate extraction
        query_text = f"{latent_topic} architecture distributed backend systems design algorithms"
        candidate_reels = await vector_search_service.search_candidates(query_text, all_reels_list, top_k=14)

        # 6. EVALUATE & 7. FILTER & 8. RANK: Multi-objective utility scoring
        recommendations = recommendation_engine.generate_recommendations(
            user_id=user_id,
            interest_profile=interest_profile,
            candidate_reels=candidate_reels,
            seen_topics=seen_topics
        )

        top_rec = recommendations[0] if recommendations else None

        # 9. EXPLAIN: Synthesize why this recommendation and why not others
        curr_id = raw_interactions[0].get("reel_id") if raw_interactions else "reel_001"
        current_reel = reels_map.get(curr_id, {})
        explanation = await explanation_engine.explain_recommendation(
            current_reel=current_reel,
            latent_interest=latent_topic,
            recommended_reel=reels_map.get(top_rec.reel_id, {}) if top_rec else {}
        )

        # 10. Secondary Insights (Graph, Gaps, Bridges, Learning Path, Career)
        graph_data = interest_graph_service.get_full_graph(latent_topic)
        emerging_interests = emerging_interest_service.get_emerging_interests([item.model_dump() for item in interest_profile.interest_dna])
        knowledge_gaps = knowledge_gap_service.get_knowledge_gaps([item.model_dump() for item in interest_profile.interest_dna])
        career_alignments = career_alignment_service.get_career_alignments([item.model_dump() for item in interest_profile.interest_dna])
        learning_path = learning_path_service.get_path_for_user(user_id)

        # Persist updated profile & recommendation
        profiles_col = get_interest_profiles_collection()
        await profiles_col.update_one({"user_id": user_id}, {"$set": interest_profile.model_dump()}, upsert=True)

        if top_rec:
            rec_col = get_recommendations_collection()
            await rec_col.insert_one(top_rec.model_dump())

        return {
            "steps": [
                {"name": "Observing interactions", "status": "completed"},
                {"name": "Understanding context & intent", "status": "completed"},
                {"name": "Inferring Latent Interest DNA", "status": "completed"},
                {"name": "Checking content fatigue", "status": "completed"},
                {"name": "Retrieving semantic candidates", "status": "completed"},
                {"name": "Detecting hype & clickbait", "status": "completed"},
                {"name": "Comparing candidates & constraints", "status": "completed"},
                {"name": "Selecting top recommendation", "status": "completed"},
                {"name": "Generating transparent explanation", "status": "completed"},
                {"name": "Active learning ready", "status": "completed"}
            ],
            "interactions": raw_interactions,
            "content_analysis": analyzed_interactions,
            "interest_dna": [item.model_dump() for item in interest_profile.interest_dna],
            "hidden_interest": interest_profile.hidden_interest.model_dump() if interest_profile.hidden_interest else None,
            "fatigue_info": {
                "detected": is_fatigued,
                "topics": fatigued_topics,
                "message": fatigue_msg
            },
            "interest_graph": graph_data.model_dump(),
            "candidates": [r.model_dump() for r in recommendations],
            "rejected_candidates": [r.model_dump() for r in top_rec.rejected_candidates] if top_rec else [],
            "selected_recommendation": top_rec.model_dump() if top_rec else None,
            "explanation": explanation,
            "emerging_interests": emerging_interests,
            "knowledge_gaps": knowledge_gaps,
            "career_alignment": career_alignments,
            "learning_path": learning_path.model_dump()
        }

recommendation_agent = RecommendationAgent()
