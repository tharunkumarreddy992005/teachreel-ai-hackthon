from typing import List, Dict, Any
from app.models.interest import InterestItem, InterestProfileModel
from app.utils.helpers import clamp

class FeedbackEngine:
    """Dynamically adapts user Interest DNA based on explicit user feedback and sentiment."""

    def process_feedback(
        self,
        current_dna: List[InterestItem],
        rating: str,
        reasons: List[str]
    ) -> List[InterestItem]:
        updated_dna = [InterestItem(**item.model_dump()) for item in current_dna]
        
        # Factor adjustments based on user request reasons
        for r in reasons:
            r_lower = r.lower()
            if "more ai" in r_lower:
                for item in updated_dna:
                    if item.topic == "AI":
                        item.score = clamp(item.score + 15.0, 0, 100)
                        item.trend = "+27%"
                        item.trend_direction = "up"
            elif "more coding" in r_lower:
                for item in updated_dna:
                    if item.topic in ["Programming", "DSA"]:
                        item.score = clamp(item.score + 8.0, 0, 100)
            elif "more career" in r_lower:
                for item in updated_dna:
                    if item.topic == "Developer Career":
                        item.score = clamp(item.score + 12.0, 0, 100)
            elif "too basic" in r_lower:
                for item in updated_dna:
                    if item.topic == "Software Engineering":
                        item.score = clamp(item.score + 5.0, 0, 100)
            elif "not interested" in r_lower:
                for item in updated_dna:
                    if item.topic == "Hardware":
                        item.score = clamp(item.score - 10.0, 0, 100)

        # Rating adjustments
        if rating == "Very Useful":
            for item in updated_dna:
                if item.topic in ["Software Engineering", "System Design"]:
                    item.score = clamp(item.score + 3.0, 0, 100)
        elif rating == "Not Relevant":
            for item in updated_dna:
                if item.topic == "Software Engineering":
                    item.score = clamp(item.score - 4.0, 0, 100)

        return updated_dna

feedback_engine = FeedbackEngine()
