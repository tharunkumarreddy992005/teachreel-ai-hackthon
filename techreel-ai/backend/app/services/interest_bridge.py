from typing import List, Dict, Any

class InterestBridgeService:
    """Discovers multi-disciplinary bridges between distinct topics and smart surprise recommendations."""

    def get_bridges(self) -> List[Dict[str, Any]]:
        return [
            {
                "topic_a": "Java",
                "topic_b": "AI",
                "bridge_topic": "AI Applications & Spring AI with Java",
                "relevance_score": 88,
                "description": "Connecting enterprise object-oriented patterns with generative AI client integrations."
            },
            {
                "topic_a": "Gaming / Graphics",
                "topic_b": "Programming",
                "bridge_topic": "Game AI & ECS (Entity Component System) Architecture",
                "relevance_score": 82,
                "description": "Applying high-performance cache-friendly memory layouts to interactive engines."
            },
            {
                "topic_a": "DSA",
                "topic_b": "Career",
                "bridge_topic": "Technical Interview Patterns & System Complexity",
                "relevance_score": 94,
                "description": "Transforming abstract theoretical algorithms into pragmatic production problem solving."
            },
            {
                "topic_a": "Cloud",
                "topic_b": "Cybersecurity",
                "bridge_topic": "Cloud Security Architecture & Zero Trust IAM",
                "relevance_score": 79,
                "description": "Securing containerized microservices and automated CI/CD deployment pipelines."
            }
        ]

    def get_smart_surprise(self) -> Dict[str, Any]:
        """Recommends a novel topic that is unexpected yet semantically connected (70/20/10 rule)."""
        return {
            "title": "Game Engine Data Structures & Spatial Partitioning (BVH)",
            "category": "Computer Graphics & Systems",
            "difficulty": "Intermediate",
            "connection_explanation": "Connecting your DSA data structure interest with low-level workstation compute hardware.",
            "surprise_factor": 88,
            "semantic_anchor": "DSA + Hardware",
            "reel_id": "reel_surprise_01",
            "reel_title": "How Game Engines Use Bounding Volume Hierarchies for 120 FPS Collision Detection"
        }

interest_bridge_service = InterestBridgeService()
