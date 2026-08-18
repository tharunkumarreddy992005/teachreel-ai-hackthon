from typing import Dict, Any, List

class CredibilityEngine:
    def calculate_credibility(self, reel: Dict[str, Any]) -> float:
        base_cred = float(reel.get("credibility", 80.0))
        hype = float(reel.get("hype_score", 10.0))
        if hype > 80:
            base_cred = min(base_cred, 25.0)
        return base_cred

class DifficultyEngine:
    def evaluate_fit(self, reel: Dict[str, Any], user_preferred_difficulty: str = "Intermediate") -> float:
        reel_diff = reel.get("difficulty", "Intermediate").lower()
        pref = user_preferred_difficulty.lower()
        
        if reel_diff == pref:
            return 95.0
        elif (pref == "intermediate" and reel_diff in ["beginner", "intermediate"]) or (pref == "beginner" and reel_diff == "beginner"):
            return 85.0
        elif pref == "intermediate" and reel_diff == "advanced":
            return 45.0  # steep penalty for advanced kernel/networking when intermediate
        elif pref == "beginner" and reel_diff == "advanced":
            return 20.0
        return 70.0

class DiversityEngine:
    def evaluate_novelty_and_diversity(self, reel: Dict[str, Any], seen_topics: List[str]) -> float:
        topic = reel.get("primary_topic", "")
        if topic in seen_topics:
            return 40.0  # lower novelty for repeated topic
        return 85.0  # high novelty for fresh connected topic

credibility_engine = CredibilityEngine()
difficulty_engine = DifficultyEngine()
diversity_engine = DiversityEngine()
