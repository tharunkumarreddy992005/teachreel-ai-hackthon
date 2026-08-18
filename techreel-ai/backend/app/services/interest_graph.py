from typing import Dict, Any, List
from app.schemas.interests import GraphNode, GraphEdge, InterestGraphResponse

class InterestGraphService:
    """Manages the hierarchical semantic graph of technology concepts and user activations."""

    def get_full_graph(self, active_latent_topic: str = "Software Engineering") -> InterestGraphResponse:
        nodes = [
            # Root
            GraphNode(id="tech_root", label="Technology", category="Root", depth=0, score=100.0, active=True),
            
            # Tier 1 Domains
            GraphNode(id="swe", label="Software Engineering", category="Domain", depth=1, score=87.0, active=True, is_latent=True, parent="tech_root"),
            GraphNode(id="ai", label="AI", category="Domain", depth=1, score=51.0, active=True, is_latent=False, parent="tech_root"),
            GraphNode(id="cloud", label="Cloud", category="Domain", depth=1, score=32.0, active=False, is_latent=False, parent="tech_root"),
            GraphNode(id="cyber", label="Cybersecurity", category="Domain", depth=1, score=24.0, active=False, is_latent=False, parent="tech_root"),
            GraphNode(id="hardware", label="Hardware", category="Domain", depth=1, score=43.0, active=True, is_latent=False, parent="tech_root"),
            
            # Software Engineering Sub-domains (Tier 2)
            GraphNode(id="prog", label="Programming", category="Subdomain", depth=2, score=81.0, active=True, is_latent=False, parent="swe"),
            GraphNode(id="dsa", label="DSA", category="Subdomain", depth=2, score=72.0, active=True, is_latent=False, parent="swe"),
            GraphNode(id="backend", label="Backend", category="Subdomain", depth=2, score=85.0, active=True, is_latent=False, parent="swe"),
            GraphNode(id="sys_design", label="System Design", category="Subdomain", depth=2, score=91.0, active=True, is_latent=False, parent="swe"),
            GraphNode(id="career", label="Developer Career", category="Subdomain", depth=2, score=64.0, active=True, is_latent=False, parent="swe"),
            
            # Tier 3 Concepts
            GraphNode(id="java", label="Java", category="Concept", depth=3, score=88.0, active=True, is_latent=False, parent="prog"),
            GraphNode(id="python", label="Python", category="Concept", depth=3, score=60.0, active=False, is_latent=False, parent="prog"),
            GraphNode(id="cpp", label="C++", category="Concept", depth=3, score=45.0, active=False, is_latent=False, parent="prog"),
            
            GraphNode(id="apis", label="APIs", category="Concept", depth=3, score=78.0, active=True, is_latent=False, parent="backend"),
            GraphNode(id="dbs", label="Databases", category="Concept", depth=3, score=65.0, active=False, is_latent=False, parent="backend"),
            GraphNode(id="microservices", label="Microservices", category="Concept", depth=3, score=70.0, active=True, is_latent=False, parent="backend"),
        ]

        edges = [
            # Root to Tier 1
            GraphEdge(source="tech_root", target="swe", weight=1.0, relation="contains"),
            GraphEdge(source="tech_root", target="ai", weight=0.8, relation="contains"),
            GraphEdge(source="tech_root", target="cloud", weight=0.7, relation="contains"),
            GraphEdge(source="tech_root", target="cyber", weight=0.6, relation="contains"),
            GraphEdge(source="tech_root", target="hardware", weight=0.7, relation="contains"),
            
            # SWE to Tier 2
            GraphEdge(source="swe", target="prog", weight=1.0, relation="includes"),
            GraphEdge(source="swe", target="dsa", weight=0.9, relation="includes"),
            GraphEdge(source="swe", target="backend", weight=0.95, relation="includes"),
            GraphEdge(source="swe", target="sys_design", weight=0.95, relation="includes"),
            GraphEdge(source="swe", target="career", weight=0.8, relation="includes"),
            
            # Programming to Concepts
            GraphEdge(source="prog", target="java", weight=0.9, relation="implements"),
            GraphEdge(source="prog", target="python", weight=0.7, relation="implements"),
            GraphEdge(source="prog", target="cpp", weight=0.6, relation="implements"),
            
            # Backend to Concepts
            GraphEdge(source="backend", target="apis", weight=0.85, relation="builds"),
            GraphEdge(source="backend", target="dbs", weight=0.85, relation="persists"),
            GraphEdge(source="backend", target="microservices", weight=0.8, relation="architects"),
            
            # Cross-domain bridges
            GraphEdge(source="backend", target="cloud", weight=0.75, relation="deploys_to"),
            GraphEdge(source="swe", target="ai", weight=0.7, relation="integrates_with"),
        ]

        return InterestGraphResponse(
            nodes=nodes,
            edges=edges,
            selected_latent_node=active_latent_topic
        )

interest_graph_service = InterestGraphService()
