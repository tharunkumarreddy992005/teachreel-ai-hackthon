import {
  InterestDNAResponse,
  InterestGraphResponse,
  RecommendationResponse,
  HypeAnalysisResponse,
  LearningPathResponse,
  QuizResponse,
  FeedbackResponse,
  DemoRunResult
} from "@/types";

export const MOCK_INTEREST_DNA: InterestDNAResponse = {
  user_id: "student_001",
  updated_at: new Date().toISOString(),
  fatigue_detected: true,
  fatigued_topics: ["Java Memes", "Programming Humor"],
  hidden_interest: {
    primary_topic: "Software Engineering",
    score: 87,
    confidence: "High",
    evidence_topics: ["Java", "Coding Interview", "Developer Lifestyle", "GitHub", "Hardware"],
    synthesis_reasoning: "Your Java, coding interview, developer lifestyle, GitHub and hardware interactions collectively suggest a broader interest in software engineering."
  },
  interest_dna: [
    { topic: "Software Engineering", score: 87, confidence: "High", trend: "+42%", trend_direction: "up", evidence_count: 5, domain: "Software Engineering", category: "Broad Domain" },
    { topic: "Programming", score: 81, confidence: "High", trend: "+28%", trend_direction: "up", evidence_count: 4, domain: "Software Engineering", category: "Core Foundation" },
    { topic: "DSA", score: 72, confidence: "High", trend: "+35%", trend_direction: "up", evidence_count: 2, domain: "Software Engineering", category: "Problem Solving" },
    { topic: "Developer Career", score: 64, confidence: "Medium", trend: "+19%", trend_direction: "up", evidence_count: 3, domain: "Software Engineering", category: "Career Growth" },
    { topic: "AI", score: 51, confidence: "Medium", trend: "+12%", trend_direction: "up", evidence_count: 1, domain: "Artificial Intelligence", category: "Emerging Tech" },
    { topic: "Hardware", score: 43, confidence: "Medium", trend: "+8%", trend_direction: "neutral", evidence_count: 1, domain: "Computer Architecture", category: "Infrastructure" },
    { topic: "Cloud", score: 32, confidence: "Low", trend: "+5%", trend_direction: "neutral", evidence_count: 1, domain: "Cloud Computing", category: "Infrastructure" },
    { topic: "Cybersecurity", score: 24, confidence: "Low", trend: "+2%", trend_direction: "neutral", evidence_count: 0, domain: "Cybersecurity", category: "Security" }
  ]
};

export const MOCK_RECOMMENDATION: RecommendationResponse = {
  current_reel: {
    title: "POV: Your Java code works on the first try 😂",
    topic: "Java",
    watch_percentage: 94,
    replay_count: 2,
    liked: true,
    saved: false
  },
  interest_detected: {
    topic: "Software Engineering",
    score: 87,
    confidence: "High"
  },
  scores: {
    interest_match: 94,
    learning_value: 91,
    career_relevance: 88,
    credibility: 86,
    novelty: 79
  },
  why: "Your recent interactions indicate a broader software-engineering interest rather than Java-specific learning intent.",
  confidence: "High",
  recommendation: {
    id: "rec_001",
    reel_id: "reel_006",
    title: "How Backend Engineers Think About System Design",
    description: "Deep dive into High-Level Design (HLD): horizontal scaling, distributed caching with Redis, message queues with Kafka, and database sharding.",
    creator: "@system_design_pro",
    duration_seconds: 60,
    category: "HLD / Backend",
    difficulty: "Intermediate",
    confidence: "High",
    score: 91,
    scores: {
      interest_match: 94,
      learning_value: 91,
      career_relevance: 88,
      credibility: 86,
      novelty: 79,
      difficulty_fit: 92,
      diversity_bonus: 80,
      hype_penalty: 0,
      repetition_penalty: 0,
      total_score: 91
    },
    why: "Your recent interactions indicate a broader software-engineering interest rather than Java-specific learning intent.",
    why_path: ["Java", "Programming", "Software Engineering", "Backend", "System Design"],
    micro_learning: {
      headline: "30-SECOND TAKEAWAY: System Design Foundations",
      key_points: [
        "1. Horizontal Scaling: Add more lightweight servers behind a Load Balancer instead of buying a larger machine.",
        "2. Redis Caching: Intercept database reads in sub-millisecond RAM to prevent database connection saturation.",
        "3. Message Queues (Kafka): Decouple synchronous API requests into asynchronous, resilient background workers."
      ]
    },
    rejected_candidates: [
      {
        reel_id: "reel_012",
        title: "10 AI Tools that GUARANTEE a $200k Tech Job in 30 Days (No Coding!)",
        reason: "Rejected by Hype Shield: High hype (96%), unrealistic career guarantee, low technical evidence (educational value 22%).",
        decision: "Reject",
        hype_score: 96,
        educational_value: 22,
        credibility: 14
      },
      {
        reel_id: "reel_013",
        title: "Complete Java Tutorial for Absolute Beginners (Part 1: Hello World)",
        reason: "Rejected for Content Fatigue: Too repetitive. User already demonstrates familiarity with OOP/Java syntax.",
        decision: "Reject",
        hype_score: 8,
        educational_value: 65,
        credibility: 85
      },
      {
        reel_id: "reel_014",
        title: "Advanced Kubernetes eBPF Kernel Packet Inspection & CNI Mesh",
        reason: "Rejected for Difficulty Mismatch: Advanced kernel-level systems programming is too steep for current intermediate profile.",
        decision: "Reject",
        hype_score: 5,
        educational_value: 94,
        credibility: 96
      }
    ]
  }
};

export const MOCK_GRAPH: InterestGraphResponse = {
  selected_latent_node: "Software Engineering",
  nodes: [
    { id: "tech_root", label: "Technology", category: "Root", depth: 0, score: 100, active: true, is_latent: false },
    { id: "swe", label: "Software Engineering", category: "Domain", depth: 1, score: 87, active: true, is_latent: true, parent: "tech_root" },
    { id: "ai", label: "AI", category: "Domain", depth: 1, score: 51, active: true, is_latent: false, parent: "tech_root" },
    { id: "cloud", label: "Cloud", category: "Domain", depth: 1, score: 32, active: false, is_latent: false, parent: "tech_root" },
    { id: "cyber", label: "Cybersecurity", category: "Domain", depth: 1, score: 24, active: false, is_latent: false, parent: "tech_root" },
    { id: "hardware", label: "Hardware", category: "Domain", depth: 1, score: 43, active: true, is_latent: false, parent: "tech_root" },
    { id: "prog", label: "Programming", category: "Subdomain", depth: 2, score: 81, active: true, is_latent: false, parent: "swe" },
    { id: "dsa", label: "DSA", category: "Subdomain", depth: 2, score: 72, active: true, is_latent: false, parent: "swe" },
    { id: "backend", label: "Backend", category: "Subdomain", depth: 2, score: 85, active: true, is_latent: false, parent: "swe" },
    { id: "sys_design", label: "System Design", category: "Subdomain", depth: 2, score: 91, active: true, is_latent: false, parent: "swe" },
    { id: "career", label: "Developer Career", category: "Subdomain", depth: 2, score: 64, active: true, is_latent: false, parent: "swe" },
    { id: "java", label: "Java", category: "Concept", depth: 3, score: 88, active: true, is_latent: false, parent: "prog" },
    { id: "python", label: "Python", category: "Concept", depth: 3, score: 60, active: false, is_latent: false, parent: "prog" },
    { id: "cpp", label: "C++", category: "Concept", depth: 3, score: 45, active: false, is_latent: false, parent: "prog" },
    { id: "apis", label: "APIs", category: "Concept", depth: 3, score: 78, active: true, is_latent: false, parent: "backend" },
    { id: "dbs", label: "Databases", category: "Concept", depth: 3, score: 65, active: false, is_latent: false, parent: "backend" },
    { id: "microservices", label: "Microservices", category: "Concept", depth: 3, score: 70, active: true, is_latent: false, parent: "backend" }
  ],
  edges: [
    { source: "tech_root", target: "swe", weight: 1.0, relation: "contains" },
    { source: "tech_root", target: "ai", weight: 0.8, relation: "contains" },
    { source: "tech_root", target: "cloud", weight: 0.7, relation: "contains" },
    { source: "tech_root", target: "cyber", weight: 0.6, relation: "contains" },
    { source: "tech_root", target: "hardware", weight: 0.7, relation: "contains" },
    { source: "swe", target: "prog", weight: 1.0, relation: "includes" },
    { source: "swe", target: "dsa", weight: 0.9, relation: "includes" },
    { source: "swe", target: "backend", weight: 0.95, relation: "includes" },
    { source: "swe", target: "sys_design", weight: 0.95, relation: "includes" },
    { source: "swe", target: "career", weight: 0.8, relation: "includes" },
    { source: "prog", target: "java", weight: 0.9, relation: "implements" },
    { source: "prog", target: "python", weight: 0.7, relation: "implements" },
    { source: "prog", target: "cpp", weight: 0.6, relation: "implements" },
    { source: "backend", target: "apis", weight: 0.85, relation: "builds" },
    { source: "backend", target: "dbs", weight: 0.85, relation: "persists" },
    { source: "backend", target: "microservices", weight: 0.8, relation: "architects" },
    { source: "backend", target: "cloud", weight: 0.75, relation: "deploys_to" },
    { source: "swe", target: "ai", weight: 0.7, relation: "integrates_with" }
  ]
};
