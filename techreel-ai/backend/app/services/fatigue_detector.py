from typing import List, Dict, Any, Tuple

class FatigueDetector:
    """Detects content fatigue when user repeatedly interacts with the same narrow topic or meme category."""

    def check_fatigue(self, interactions: List[Dict[str, Any]], reels_map: Dict[str, Dict[str, Any]]) -> Tuple[bool, List[str], str]:
        topic_counts: Dict[str, int] = {}
        meme_count = 0

        for inter in interactions:
            r = reels_map.get(inter.get("reel_id"), {})
            topic = r.get("primary_topic", "General")
            topic_counts[topic] = topic_counts.get(topic, 0) + 1
            if "meme" in r.get("tags", []) or "humor" in r.get("tags", []):
                meme_count += 1

        fatigued_topics = []
        for t, count in topic_counts.items():
            if count >= 3:
                fatigued_topics.append(t)

        if meme_count >= 2 or fatigued_topics:
            return (
                True,
                fatigued_topics if fatigued_topics else ["Programming Memes"],
                "Content fatigue detected: High frequency of humor/Java memes. Recommending branching into Backend, DSA, System Design, and Cloud."
            )

        return False, [], "Optimal content diversity maintained."

fatigue_detector = FatigueDetector()
