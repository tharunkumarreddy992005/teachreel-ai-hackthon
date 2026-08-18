from abc import ABC, abstractmethod
from typing import Dict, Any, List, Optional

class AIProvider(ABC):
    """Abstract AI Provider interface for LLM inference and reasoning."""
    
    @abstractmethod
    async def analyze_intent(self, reel: Dict[str, Any], interaction: Dict[str, Any]) -> Dict[str, Any]:
        """Analyzes entertainment vs learning vs career intent."""
        pass

    @abstractmethod
    async def infer_latent_interests(self, interaction_history: List[Dict[str, Any]]) -> Dict[str, Any]:
        """Infers higher-order latent interests from a sequence of interactions."""
        pass

    @abstractmethod
    async def evaluate_hype(self, reel: Dict[str, Any]) -> Dict[str, Any]:
        """Detects hype, clickbait, and career guarantee claims."""
        pass

    @abstractmethod
    async def generate_explanation(self, recommendation: Dict[str, Any], context: Dict[str, Any]) -> str:
        """Generates clear, pedagogical explanations for recommendations."""
        pass

    @abstractmethod
    async def generate_quiz(self, reel: Dict[str, Any]) -> Dict[str, Any]:
        """Generates a micro-quiz based on reel technical concepts."""
        pass
