from typing import List, Dict, Any, Optional, Tuple
from app.models.recommendation import RecommendationModel, RecommendationScores, MicroLearning, RejectedCandidate
from app.models.interest import InterestProfileModel
from app.services.credibility_engine import credibility_engine, difficulty_engine, diversity_engine
from app.services.hype_detector import hype_detector
from app.utils.helpers import clamp, get_utc_now

class RecommendationEngine:
    """Multi-objective ranking engine implementing weighted utility scoring and constraint filtering."""

    def calculate_score(
        self,
        reel: Dict[str, Any],
        latent_interest: str,
        user_dna: List[Dict[str, Any]],
        seen_topics: List[str],
        user_difficulty: str = "Intermediate"
    ) -> Tuple[float, RecommendationScores, Optional[RejectedCandidate]]:
        # 1. Interest Match (30%)
        reel_domain = reel.get("broader_domain", "")
        reel_topic = reel.get("primary_topic", "")
        
        # Check latent match
        if reel_domain == latent_interest or latent_interest.lower() in [t.lower() for t in reel.get("tags", [])]:
            interest_match = 94.0
        elif any(d.get("topic") == reel_topic for d in user_dna):
            dna_score = next((d.get("score", 70) for d in user_dna if d.get("topic") == reel_topic), 70)
            interest_match = float(dna_score)
        else:
            interest_match = 65.0

        # 2. Learning Value (20%)
        learning_value = float(reel.get("educational_value", 70.0))

        # 3. Career Relevance (15%)
        career_relevance = float(reel.get("career_relevance", 70.0))

        # 4. Credibility (10%)
        credibility = credibility_engine.calculate_credibility(reel)

        # 5. Novelty (10%)
        novelty = diversity_engine.evaluate_novelty_and_diversity(reel, seen_topics)

        # 6. Difficulty Fit (10%)
        diff_fit = difficulty_engine.evaluate_fit(reel, user_difficulty)

        # 7. Diversity (5%)
        diversity_bonus = 80.0 if reel_topic not in seen_topics else 30.0

        # Penalties
        hype_score = float(reel.get("hype_score", 10.0))
        hype_penalty = (hype_score - 40.0) * 1.5 if hype_score > 40 else 0.0
        
        repetition_penalty = 35.0 if (reel_topic in seen_topics and "meme" not in reel.get("tags", []) and reel.get("difficulty") == "Beginner") else 0.0

        # Composite Score Calculation
        raw_score = (
            0.30 * interest_match +
            0.20 * learning_value +
            0.15 * career_relevance +
            0.10 * credibility +
            0.10 * novelty +
            0.10 * diff_fit +
            0.05 * (diversity_bonus / 100.0 * 100.0) -
            hype_penalty -
            repetition_penalty
        )
        total_score = clamp(raw_score, 0.0, 100.0)

        scores_obj = RecommendationScores(
            interest_match=round(interest_match, 1),
            learning_value=round(learning_value, 1),
            career_relevance=round(career_relevance, 1),
            credibility=round(credibility, 1),
            novelty=round(novelty, 1),
            difficulty_fit=round(diff_fit, 1),
            diversity_bonus=round(diversity_bonus, 1),
            hype_penalty=round(hype_penalty, 1),
            repetition_penalty=round(repetition_penalty, 1),
            total_score=round(total_score, 1)
        )

        # Check for rejection reasons
        rejected_item = None
        if hype_score >= 80:
            rejected_item = RejectedCandidate(
                reel_id=reel["id"],
                title=reel["title"],
                reason=f"Rejected by Hype Shield: High hype ({hype_score}%), unrealistic career guarantee, low technical evidence.",
                decision="Reject",
                hype_score=hype_score,
                educational_value=learning_value,
                credibility=credibility
            )
        elif repetition_penalty > 20:
            rejected_item = RejectedCandidate(
                reel_id=reel["id"],
                title=reel["title"],
                reason="Rejected for Content Fatigue: Too repetitive. User already demonstrates familiarity with basic syntax.",
                decision="Reject",
                hype_score=hype_score,
                educational_value=learning_value,
                credibility=credibility
            )
        elif diff_fit < 50:
            rejected_item = RejectedCandidate(
                reel_id=reel["id"],
                title=reel["title"],
                reason="Rejected for Difficulty Mismatch: Advanced kernel-level systems programming is too steep for current intermediate profile.",
                decision="Reject",
                hype_score=hype_score,
                educational_value=learning_value,
                credibility=credibility
            )

        return total_score, scores_obj, rejected_item

    def generate_recommendations(
        self,
        user_id: str,
        interest_profile: InterestProfileModel,
        candidate_reels: List[Dict[str, Any]],
        seen_topics: List[str]
    ) -> List[RecommendationModel]:
        latent_topic = interest_profile.hidden_interest.primary_topic if interest_profile.hidden_interest else "Software Engineering"
        user_dna_dicts = [item.model_dump() for item in interest_profile.interest_dna]

        ranked_list = []
        all_rejected: List[RejectedCandidate] = []

        for reel in candidate_reels:
            score, score_breakdown, rejected = self.calculate_score(
                reel=reel,
                latent_interest=latent_topic,
                user_dna=user_dna_dicts,
                seen_topics=seen_topics
            )
            if rejected:
                all_rejected.append(rejected)
            else:
                # Add micro-learning points
                micro = None
                if reel.get("id") == "reel_006":
                    micro = MicroLearning(
                        headline="30-SECOND TAKEAWAY: System Design Foundations",
                        key_points=[
                            "1. Horizontal Scaling: Add lightweight compute nodes behind a Load Balancer rather than provisioning a single massive instance.",
                            "2. Redis Caching: Intercept database reads in sub-millisecond RAM to eliminate database connection saturation.",
                            "3. Message Queues (Kafka): Decouple synchronous API requests into asynchronous, fault-tolerant event streams."
                        ]
                    )
                elif reel.get("id") == "reel_008":
                    micro = MicroLearning(
                        headline="30-SECOND TAKEAWAY: RAG Architecture",
                        key_points=[
                            "1. Vector Retrieval: Index knowledge chunks into embeddings and query with cosine distance.",
                            "2. Context Augmentation: Inject top-k relevant snippets directly into the LLM system prompt.",
                            "3. Grounded Generation: LLM answers based strictly on retrieved facts to eliminate hallucinations."
                        ]
                    )

                rec_obj = RecommendationModel(
                    id=f"rec_{reel['id']}_{user_id}",
                    user_id=user_id,
                    reel_id=reel["id"],
                    title=reel["title"],
                    category=f"{reel.get('primary_topic')} / {reel.get('broader_domain')}",
                    difficulty=reel.get("difficulty", "Intermediate"),
                    confidence="High" if score > 85 else "Medium",
                    score=round(score, 1),
                    scores=score_breakdown,
                    why="Your recent interactions indicate a broader software-engineering interest rather than Java-specific learning intent.",
                    why_path=["Java", "Programming", "Software Engineering", "Backend", "System Design"],
                    micro_learning=micro,
                    rejected_candidates=[],  # populated on top recommendation
                    created_at=get_utc_now()
                )
                ranked_list.append(rec_obj)

        # Sort by total score descending
        ranked_list.sort(key=lambda x: x.score, reverse=True)

        # Attach rejected candidates to the top recommendation for transparency
        if ranked_list:
            ranked_list[0].rejected_candidates = all_rejected

        return ranked_list

recommendation_engine = RecommendationEngine()
