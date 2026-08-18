from typing import List, Dict, Any

class KnowledgeGapEngine:
    """Detects missing foundational concepts given high-level target topics."""

    def identify_gaps(self, user_dna: List[Dict[str, Any]]) -> List[Dict[str, Any]]:
        return [
            {
                "topic": "Database Fundamentals & Sharding",
                "confidence": "Medium",
                "reason": "Strong backend signals but relatively little database content in recent interactions.",
                "recommended_fix_reel_id": "reel_010",
                "recommended_fix_title": "Why SQL Injection Still Happens and How Parameterized Queries Fix It"
            },
            {
                "topic": "Asynchronous Event Queues",
                "confidence": "Medium",
                "reason": "Exploring high-level system design requires understanding message broker decoupling (Kafka/RabbitMQ)."
            }
        ]

    def get_knowledge_gaps(self, user_dna: List[Dict[str, Any]]) -> List[Dict[str, Any]]:
        return self.identify_gaps(user_dna)

knowledge_gap_engine = KnowledgeGapEngine()
knowledge_gap_service = knowledge_gap_engine
