import pytest
from app.services.recommendation_engine import recommendation_engine
from app.models.interest import InterestProfileModel, HiddenInterestItem, InterestItem

def test_recommendation_scoring_and_rejections():
    """Verifies that System Design is top ranked, while Hype, Repetitive Java, and extreme K8s are rejected."""
    
    latent_interest = "Software Engineering"
    dna = [
        {"topic": "Software Engineering", "score": 87.0},
        {"topic": "Programming", "score": 81.0},
        {"topic": "DSA", "score": 72.0}
    ]
    seen_topics = ["Java", "Coding Interview", "Developer Lifestyle", "Hardware", "GitHub"]

    # Candidate 1: How Backend Engineers Think About System Design (Expected: Top Pick)
    reel_sys_design = {
        "id": "reel_006",
        "title": "How Backend Engineers Think About System Design",
        "primary_topic": "System Design",
        "broader_domain": "Software Engineering",
        "tags": ["system_design", "backend", "scalability"],
        "educational_value": 91.0,
        "career_relevance": 95.0,
        "credibility": 92.0,
        "difficulty": "Intermediate",
        "hype_score": 8.0
    }

    score_sys, breakdown_sys, rej_sys = recommendation_engine.calculate_score(
        reel_sys_design, latent_interest, dna, seen_topics
    )
    assert rej_sys is None
    assert score_sys >= 88.0

    # Candidate 2: 10 AI Tools that GUARANTEE a $200k Tech Job (Expected: Rejected by Hype Shield)
    reel_hype = {
        "id": "reel_012",
        "title": "10 AI Tools that GUARANTEE a $200k Tech Job in 30 Days (No Coding!)",
        "primary_topic": "AI Hype",
        "broader_domain": "Artificial Intelligence",
        "tags": ["ai_tools", "job_guarantee"],
        "educational_value": 22.0,
        "career_relevance": 15.0,
        "credibility": 14.0,
        "difficulty": "Beginner",
        "hype_score": 96.0
    }
    _, _, rej_hype = recommendation_engine.calculate_score(
        reel_hype, latent_interest, dna, seen_topics
    )
    assert rej_hype is not None
    assert "Hype Shield" in rej_hype.reason

    # Candidate 3: Complete Java Tutorial for Beginners (Expected: Rejected for Content Fatigue / Repetition)
    reel_repeat = {
        "id": "reel_013",
        "title": "Complete Java Tutorial for Absolute Beginners (Part 1: Hello World)",
        "primary_topic": "Java",
        "broader_domain": "Software Engineering",
        "tags": ["java", "beginner", "tutorial"],
        "educational_value": 65.0,
        "career_relevance": 50.0,
        "credibility": 85.0,
        "difficulty": "Beginner",
        "hype_score": 8.0
    }
    _, _, rej_repeat = recommendation_engine.calculate_score(
        reel_repeat, latent_interest, dna, seen_topics
    )
    assert rej_repeat is not None
    assert "Repetitive" in rej_repeat.reason or "Fatigue" in rej_repeat.reason

    # Candidate 4: Advanced Kubernetes eBPF Kernel (Expected: Rejected for Difficulty Mismatch)
    reel_hard = {
        "id": "reel_014",
        "title": "Advanced Kubernetes eBPF Kernel Packet Inspection & CNI Mesh",
        "primary_topic": "Kubernetes",
        "broader_domain": "Cloud Computing",
        "tags": ["kubernetes", "ebpf", "linux_kernel"],
        "educational_value": 94.0,
        "career_relevance": 75.0,
        "credibility": 96.0,
        "difficulty": "Advanced",
        "hype_score": 5.0
    }
    _, _, rej_hard = recommendation_engine.calculate_score(
        reel_hard, latent_interest, dna, seen_topics, user_difficulty="Intermediate"
    )
    assert rej_hard is not None
    assert "Difficulty Mismatch" in rej_hard.reason
