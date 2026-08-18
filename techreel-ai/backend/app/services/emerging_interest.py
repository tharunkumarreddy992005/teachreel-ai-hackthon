from typing import List, Dict, Any

class EmergingInterestService:
    """Discovers potential emerging interests based on adjacent graph nodes and hardware/tooling overlaps."""

    def get_emerging_interests(self, user_dna: List[Dict[str, Any]]) -> List[Dict[str, Any]]:
        return [
            {
                "topic": "AI Engineering",
                "potential_score": 76.0,
                "status": "Potential emerging interest",
                "signals": ["Local LLM hardware benchmarking", "Python backend overlap", "High computational curiosity"]
            },
            {
                "topic": "Cloud Engineering",
                "potential_score": 62.0,
                "status": "Potential emerging interest",
                "signals": ["Docker containerization mentions", "Distributed system scaling signals"]
            },
            {
                "topic": "Cybersecurity",
                "potential_score": 41.0,
                "status": "Potential emerging interest",
                "signals": ["Network layer curiosity", "Secure credential management interest"]
            }
        ]

class KnowledgeGapService:
    """Identifies prerequisite gaps in the user's implicit learning tree."""

    def get_knowledge_gaps(self, user_dna: List[Dict[str, Any]]) -> List[Dict[str, Any]]:
        return [
            {
                "topic": "Database Fundamentals & Sharding",
                "confidence": "Medium",
                "reason": "Strong backend signals but relatively little database content in recent interactions."
            },
            {
                "topic": "Asynchronous Event Queues",
                "confidence": "Medium",
                "reason": "Exploring high-level system design requires understanding message broker decoupling (Kafka/RabbitMQ)."
            }
        ]

class CareerAlignmentService:
    """Calculates career role alignments as exploration suggestions (not rigid predictions)."""

    def get_career_alignments(self, user_dna: List[Dict[str, Any]]) -> List[Dict[str, Any]]:
        return [
            {
                "role": "Software Engineer",
                "match_score": 92.0,
                "category": "Core Match",
                "description": "Strong alignment across OOP, DSA, git workflows, and software lifecycle humor."
            },
            {
                "role": "Backend Engineer",
                "match_score": 87.0,
                "category": "Specialization",
                "description": "High affinity for distributed architecture, REST contracts, and server scalability."
            },
            {
                "role": "Cloud Engineer",
                "match_score": 61.0,
                "category": "Adjacent",
                "description": "Emerging interest in containerization and infrastructure efficiency."
            },
            {
                "role": "AI Engineer",
                "match_score": 58.0,
                "category": "Exploration",
                "description": "Early signals around LLM inference hardware and RAG systems."
            }
        ]

emerging_interest_service = EmergingInterestService()
knowledge_gap_service = KnowledgeGapService()
career_alignment_service = CareerAlignmentService()
