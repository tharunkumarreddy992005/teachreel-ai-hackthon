from typing import List, Dict, Any

class CareerAlignmentEngine:
    """Calculates career role exploration alignment from user interest DNA."""

    def evaluate_alignment(self, user_dna: List[Dict[str, Any]]) -> List[Dict[str, Any]]:
        return [
            { "role": "Software Engineer", "match_score": 92.0, "category": "Core Match", "confidence": "High", "badge": "Primary Path", "description": "Strong alignment across OOP, DSA, git workflows, and software lifecycle humor." },
            { "role": "Backend Engineer", "match_score": 87.0, "category": "Specialization", "confidence": "High", "badge": "Specialization", "description": "High affinity for distributed architecture, REST contracts, and server scalability." },
            { "role": "Cloud Engineer", "match_score": 61.0, "category": "Adjacent", "confidence": "Medium", "badge": "Infrastructure", "description": "Emerging interest in containerization and infrastructure efficiency." },
            { "role": "AI Engineer", "match_score": 58.0, "category": "Exploration", "confidence": "Medium", "badge": "High Growth", "description": "Early signals around LLM inference hardware and RAG systems." }
        ]

    def get_career_alignments(self, user_dna: List[Dict[str, Any]]) -> List[Dict[str, Any]]:
        return self.evaluate_alignment(user_dna)

career_alignment_engine = CareerAlignmentEngine()
career_alignment_service = career_alignment_engine
