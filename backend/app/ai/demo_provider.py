from typing import Dict, Any, List
from app.ai.provider import AIProvider
from app.core.logging import logger

class DemoAIProvider(AIProvider):
    """Deterministic, robust AI provider ensuring 100% reliability for hackathon demos."""

    async def analyze_intent(self, reel: Dict[str, Any], interaction: Dict[str, Any]) -> Dict[str, Any]:
        tags = [t.lower() for t in reel.get("tags", [])]
        title = reel.get("title", "").lower()
        watch_pct = interaction.get("watch_percentage", 80)
        replays = interaction.get("replay_count", 0)
        liked = interaction.get("liked", False)
        saved = interaction.get("saved", False)

        # Baseline intents from reel metadata or heuristic
        ent = reel.get("entertainment_intent", 60.0)
        learn = reel.get("learning_intent", 40.0)
        career = reel.get("career_intent", 30.0)
        curiosity = reel.get("curiosity", 40.0)

        # Apply behavioral adjustments
        if "meme" in tags or "humor" in tags or "joke" in tags:
            ent = max(ent, 85.0)
            if not saved:
                learn = min(learn, 25.0)
            insight = "High watch time does not automatically mean high learning intent. Pure entertainment signal."
        elif "interview" in tags or "career" in tags:
            career = max(career, 70.0)
            learn = max(learn, 45.0)
            insight = "Moderate career anxiety and algorithm curiosity disguised as humor."
        elif "lifestyle" in tags:
            career = max(career, 75.0)
            insight = "Strong career exploration signal. Saving the reel indicates high future reference value."
        elif "hardware" in tags:
            curiosity = max(curiosity, 78.0)
            learn = max(learn, 65.0)
            insight = "Workstation hardware & local compute evaluation signal."
        elif "github" in tags or "git" in tags:
            ent = max(ent, 85.0)
            insight = "Version control familiarity and collaborative software team culture."
        else:
            insight = "Technical discovery signal detected."

        return {
            "entertainment_intent": round(ent, 1),
            "learning_intent": round(learn, 1),
            "career_intent": round(career, 1),
            "curiosity": round(curiosity, 1),
            "key_insight": insight
        }

    async def infer_latent_interests(self, interaction_history: List[Dict[str, Any]]) -> Dict[str, Any]:
        """Infers Latent Interests from sequence of interactions (Golden Scenario)."""
        topics_seen = set()
        for item in interaction_history:
            topic = item.get("topic") or item.get("primary_topic") or ""
            if topic:
                topics_seen.add(topic)
            for t in item.get("tags", []):
                topics_seen.add(t)

        # Check for Golden Scenario: Java, Interview, Lifestyle, Hardware, Git
        is_golden = any("java" in str(t).lower() for t in topics_seen) and \
                    any("interview" in str(t).lower() or "dsa" in str(t).lower() for t in topics_seen)

        if is_golden:
            return {
                "primary_topic": "Software Engineering",
                "score": 87.0,
                "confidence": "High",
                "evidence_topics": ["Java", "Coding Interview", "Developer Lifestyle", "GitHub", "Hardware"],
                "synthesis_reasoning": "Your Java, coding interview, developer lifestyle, GitHub and hardware interactions collectively suggest a broader interest in software engineering rather than Java syntax alone.",
                "dna_distribution": [
                    {"topic": "Software Engineering", "score": 87.0, "confidence": "High", "trend": "+42%", "trend_direction": "up", "evidence_count": 5, "domain": "Software Engineering", "category": "Broad Domain"},
                    {"topic": "Programming", "score": 81.0, "confidence": "High", "trend": "+28%", "trend_direction": "up", "evidence_count": 4, "domain": "Software Engineering", "category": "Core Foundation"},
                    {"topic": "DSA", "score": 72.0, "confidence": "High", "trend": "+35%", "trend_direction": "up", "evidence_count": 2, "domain": "Software Engineering", "category": "Problem Solving"},
                    {"topic": "Developer Career", "score": 64.0, "confidence": "Medium", "trend": "+19%", "trend_direction": "up", "evidence_count": 3, "domain": "Software Engineering", "category": "Career Growth"},
                    {"topic": "AI", "score": 51.0, "confidence": "Medium", "trend": "+12%", "trend_direction": "up", "evidence_count": 1, "domain": "Artificial Intelligence", "category": "Emerging Tech"},
                    {"topic": "Hardware", "score": 43.0, "confidence": "Medium", "trend": "+8%", "trend_direction": "neutral", "evidence_count": 1, "domain": "Computer Architecture", "category": "Infrastructure"},
                    {"topic": "Cloud", "score": 32.0, "confidence": "Low", "trend": "+5%", "trend_direction": "neutral", "evidence_count": 1, "domain": "Cloud Computing", "category": "Infrastructure"},
                    {"topic": "Cybersecurity", "score": 24.0, "confidence": "Low", "trend": "+2%", "trend_direction": "neutral", "evidence_count": 0, "domain": "Cybersecurity", "category": "Security"}
                ]
            }
        
        # General fallback inference
        return {
            "primary_topic": "Software Engineering",
            "score": 80.0,
            "confidence": "High",
            "evidence_topics": list(topics_seen)[:5],
            "synthesis_reasoning": "Sequence of programming and engineering interactions indicates emerging interest in backend engineering and system architecture.",
            "dna_distribution": [
                {"topic": "Software Engineering", "score": 80.0, "confidence": "High", "trend": "+30%", "trend_direction": "up", "evidence_count": len(interaction_history), "domain": "Software Engineering", "category": "Broad Domain"},
                {"topic": "Programming", "score": 75.0, "confidence": "High", "trend": "+20%", "trend_direction": "up", "evidence_count": len(interaction_history), "domain": "Software Engineering", "category": "Core Foundation"}
            ]
        }

    async def evaluate_hype(self, reel: Dict[str, Any]) -> Dict[str, Any]:
        title = reel.get("title", "")
        hype_score = reel.get("hype_score", 10.0)
        edu_val = reel.get("educational_value", 70.0)
        cred = reel.get("credibility", 85.0)
        
        reasons = []
        patterns = []
        
        if "guarantee" in title.lower() or "$200k" in title.lower() or "no coding" in title.lower():
            hype_score = 96.0
            edu_val = 22.0
            cred = 14.0
            decision = "Reject"
            reasons.extend([
                "Exaggerated job guarantee claim ('$200k in 30 days')",
                "Promotes no-code shortcuts over rigorous engineering fundamentals",
                "High clickbait keyword density with low technical substance"
            ])
            patterns.extend(["Unrealistic Outcome", "Zero Technical Depth", "High Emotional Manipulation"])
        else:
            decision = "Accept" if hype_score < 40 else "Review"
            reasons.append("Technical substance grounded in verified engineering practices.")
            patterns.append("Pedagogical clarity")

        return {
            "reel_id": reel.get("id", ""),
            "title": title,
            "creator": reel.get("creator", "@creator"),
            "hype_score": hype_score,
            "educational_value": edu_val,
            "credibility": cred,
            "decision": decision,
            "reasons": reasons,
            "detected_patterns": patterns
        }

    async def generate_explanation(self, recommendation: Dict[str, Any], context: Dict[str, Any]) -> str:
        return "Your recent interactions indicate a broader software-engineering interest rather than Java-specific learning intent."

    async def generate_quiz(self, reel: Dict[str, Any]) -> Dict[str, Any]:
        reel_id = reel.get("id", "reel_008")
        if "rag" in reel.get("title", "").lower() or reel_id == "reel_008":
            return {
                "id": f"quiz_{reel_id}",
                "reel_id": reel_id,
                "question": "What is the primary purpose of the 'Retrieval' step in a RAG (Retrieval-Augmented Generation) pipeline?",
                "options": [
                    "A. Fine-tune the underlying neural network weights",
                    "B. Retrieve relevant context documents from a vector database to augment the prompt",
                    "C. Accelerate GPU memory transfer speeds",
                    "D. Compress the token count of the query"
                ],
                "correct_option_index": 1,
                "explanation": "In RAG, retrieval queries an external vector index to fetch factual context snippets, which ground the LLM prompt and prevent hallucinations without retraining.",
                "difficulty": "Intermediate"
            }
        elif "system design" in reel.get("title", "").lower() or reel_id == "reel_006":
            return {
                "id": f"quiz_{reel_id}",
                "reel_id": reel_id,
                "question": "Why is an in-memory cache like Redis placed before the primary database in scalable architectures?",
                "options": [
                    "A. To eliminate the need for any permanent disk storage",
                    "B. To serve frequent read requests in sub-millisecond time and prevent database bottlenecking",
                    "C. To automatically encrypt network traffic",
                    "D. To execute complex SQL joins faster"
                ],
                "correct_option_index": 1,
                "explanation": "Redis caches hot keys in volatile RAM, intercepting 80%+ of read queries to protect disk-bound databases from traffic spikes.",
                "difficulty": "Intermediate"
            }
        else:
            return {
                "id": f"quiz_{reel_id}",
                "reel_id": reel_id,
                "question": f"What is the key engineering takeaway from '{reel.get('title')}'?",
                "options": [
                    "A. Rely on brute force iteration without asymptotic optimization",
                    "B. Apply structured architectural patterns to minimize complexity and latency",
                    "C. Ignore API idempotency and status codes",
                    "D. Avoid using version control"
                ],
                "correct_option_index": 1,
                "explanation": "Robust software engineering focuses on systematic architecture and time/space complexity optimization.",
                "difficulty": "Beginner"
            }
