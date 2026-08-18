import {
  InterestDNAResponse,
  InterestGraphResponse,
  RecommendationResponse,
  RecommendationDetail,
  HypeAnalysisResponse,
  LearningPathResponse,
  QuizResponse,
  FeedbackRequest,
  FeedbackResponse,
  DemoRunResult,
  AnalyzeResponse
} from "@/types";
import { MOCK_INTEREST_DNA, MOCK_RECOMMENDATION, MOCK_GRAPH } from "./mockApi";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

async function fetchWithFallback<T>(endpoint: string, options?: RequestInit, fallbackData?: T): Promise<T> {
  try {
    const res = await fetch(`${API_BASE}${endpoint}`, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...(options?.headers || {})
      },
      cache: "no-store"
    });
    if (!res.ok) {
      throw new Error(`HTTP ${res.status}: ${res.statusText}`);
    }
    return await res.json();
  } catch (err) {
    console.warn(`[TechReel API] Warning: Request to ${endpoint} failed (${err}). Using fallback response.`);
    if (fallbackData !== undefined) {
      return fallbackData;
    }
    throw err;
  }
}

export async function getInterestDNA(userId: string = "student_001"): Promise<InterestDNAResponse> {
  return fetchWithFallback<InterestDNAResponse>(`/api/user/interest-dna?user_id=${userId}`, {}, MOCK_INTEREST_DNA);
}

export async function getInterestGraph(latentTopic: string = "Software Engineering"): Promise<InterestGraphResponse> {
  return fetchWithFallback<InterestGraphResponse>(`/api/user/interest-graph?latent_topic=${encodeURIComponent(latentTopic)}`, {}, MOCK_GRAPH);
}

export async function getRecommendations(userId: string = "student_001"): Promise<RecommendationResponse> {
  return fetchWithFallback<RecommendationResponse>(`/api/user/recommendations?user_id=${userId}`, {}, MOCK_RECOMMENDATION);
}

export async function getRecommendationById(id: string): Promise<RecommendationDetail> {
  return fetchWithFallback<RecommendationDetail>(`/api/user/recommendations/${id}`, {}, MOCK_RECOMMENDATION.recommendation);
}

export async function getHypeAnalysis(): Promise<HypeAnalysisResponse> {
  return fetchWithFallback<HypeAnalysisResponse>("/api/user/hype-analysis", {}, {
    analyzed_items: [
      {
        reel_id: "reel_012",
        title: "10 AI Tools that GUARANTEE a $200k Tech Job in 30 Days (No Coding!)",
        creator: "@hype_grifter",
        hype_score: 96,
        educational_value: 22,
        credibility: 14,
        decision: "Reject",
        reasons: ["Exaggerated job guarantee claim ('$200k in 30 days')", "Promotes no-code shortcuts over rigorous engineering fundamentals"],
        detected_patterns: ["Unrealistic Outcome", "Zero Technical Depth", "Emotional Manipulation"]
      },
      {
        reel_id: "reel_006",
        title: "How Backend Engineers Think About System Design",
        creator: "@system_design_pro",
        hype_score: 8,
        educational_value: 91,
        credibility: 92,
        decision: "Accept",
        reasons: ["Technical substance grounded in verified engineering practices."],
        detected_patterns: ["Pedagogical clarity"]
      }
    ],
    shield_status: "Active",
    total_blocked: 1,
    protection_summary: "Hype Shield actively scanned candidate reels and blocked 1 low-substance clickbait item."
  });
}

export async function getEvolution(userId: string = "student_001") {
  return fetchWithFallback(`/api/user/evolution?user_id=${userId}`, {}, {
    user_id: userId,
    timeline: [
      { week: "Week 1", Programming: 30, Gaming: 70, "Software Engineering": 15, AI: 10 },
      { week: "Week 2", Programming: 42, Gaming: 58, "Software Engineering": 28, AI: 22 },
      { week: "Week 3", Programming: 56, Gaming: 44, "Software Engineering": 48, AI: 35 },
      { week: "Week 4", Programming: 72, Gaming: 25, "Software Engineering": 87, AI: 51 }
    ],
    key_metric: "Programming & Software Engineering interest increased +42% over 4 weeks.",
    summary: "Entertainment-heavy gaming content transitioned into disciplined software engineering and systems architecture discovery."
  });
}

export async function getEmergingInterests(userId: string = "student_001") {
  return fetchWithFallback(`/api/user/emerging-interests?user_id=${userId}`, {}, [
    { topic: "AI Engineering", potential_score: 76, status: "Potential emerging interest", signals: ["Local LLM hardware benchmarking", "Python backend overlap"] },
    { topic: "Cloud Engineering", potential_score: 62, status: "Potential emerging interest", signals: ["Docker containerization mentions", "Distributed system scaling"] },
    { topic: "Cybersecurity", potential_score: 41, status: "Potential emerging interest", signals: ["Network layer curiosity", "Secure credential management"] }
  ]);
}

export async function getKnowledgeGaps(userId: string = "student_001") {
  return fetchWithFallback(`/api/user/knowledge-gaps?user_id=${userId}`, {}, [
    { topic: "Database Fundamentals & Sharding", confidence: "Medium", reason: "Strong backend signals but relatively little database content in recent interactions." }
  ]);
}

export async function getCareerAlignment(userId: string = "student_001") {
  return fetchWithFallback(`/api/user/career-alignment?user_id=${userId}`, {}, {
    disclaimer: "Exploration suggestions based on latent interests, not career predictions.",
    alignments: [
      { role: "Software Engineer", match_score: 92, category: "Core Match" },
      { role: "Backend Engineer", match_score: 87, category: "Specialization" },
      { role: "Cloud Engineer", match_score: 61, category: "Adjacent" },
      { role: "AI Engineer", match_score: 58, category: "Exploration" }
    ]
  });
}

export async function getLearningPath(userId: string = "student_001"): Promise<LearningPathResponse> {
  return fetchWithFallback<LearningPathResponse>(`/api/user/learning-path?user_id=${userId}`, {}, {
    user_id: userId,
    title: "Software Engineering & Backend Mastery Roadmap",
    steps: [
      { step: 1, topic: "Java & OOP Core", difficulty: "Beginner", status: "Completed", estimated_time: "15 mins", reel_title: "POV: Your Java code works on the first try 😂" },
      { step: 2, topic: "DSA (Arrays & Pointers)", difficulty: "Intermediate", status: "In Progress", estimated_time: "30 mins", reel_title: "Two-Pointer Technique: Master LeetCode Mediums" },
      { step: 3, topic: "Backend REST APIs", difficulty: "Intermediate", status: "Next Up", estimated_time: "45 mins", reel_title: "REST API Best Practices: Status Codes & Idempotency" },
      { step: 4, topic: "Databases & Indexing", difficulty: "Intermediate", status: "Upcoming", estimated_time: "1 hour", reel_title: "Why SQL Injection Still Happens and How Parameterized Queries Fix It" },
      { step: 5, topic: "System Design & Scalability", difficulty: "Intermediate", status: "Upcoming", estimated_time: "1.5 hours", reel_title: "How Backend Engineers Think About System Design" },
      { step: 6, topic: "Cloud & Container Deployment", difficulty: "Advanced", status: "Upcoming", estimated_time: "2 hours", reel_title: "Deploying Containers with Docker & ECS" }
    ],
    estimated_total_hours: 6.5,
    current_step_index: 2,
    career_goal: "Software / Backend Engineer"
  });
}

export async function getInterestBridge() {
  return fetchWithFallback("/api/user/interest-bridge", {}, [
    { topic_a: "Java", topic_b: "AI", bridge_topic: "AI Applications & Spring AI with Java", relevance_score: 88, description: "Connecting enterprise OOP patterns with generative AI integrations." },
    { topic_a: "Gaming", topic_b: "Programming", bridge_topic: "Game AI & ECS Architecture", relevance_score: 82, description: "Applying high-performance cache-friendly memory layouts." },
    { topic_a: "DSA", topic_b: "Career", bridge_topic: "Technical Interview Patterns & System Complexity", relevance_score: 94, description: "Transforming abstract algorithms into pragmatic problem solving." },
    { topic_a: "Cloud", topic_b: "Cybersecurity", bridge_topic: "Cloud Security Architecture & Zero Trust IAM", relevance_score: 79, description: "Securing containerized microservices and CI/CD pipelines." }
  ]);
}

export async function getSmartSurprise() {
  return fetchWithFallback("/api/user/smart-surprise", {}, {
    title: "Game Engine Data Structures & Spatial Partitioning (BVH)",
    category: "Computer Graphics & Systems",
    difficulty: "Intermediate",
    connection_explanation: "Connecting your DSA data structure interest with low-level workstation compute hardware.",
    surprise_factor: 88,
    semantic_anchor: "DSA + Hardware"
  });
}

export async function analyzeFeed(payload?: {
  user_id?: string;
  reel_title?: string;
  reel_description?: string;
  topic?: string;
  watch_percentage?: number;
  replay_count?: number;
  liked?: boolean;
  saved?: boolean;
}) {
  const body = payload ? { user_id: "student_001", ...payload } : { user_id: "student_001" };
  return fetchWithFallback<AnalyzeResponse>("/api/analyze", {
    method: "POST",
    body: JSON.stringify(body)
  });
}

export async function submitFeedback(payload: FeedbackRequest): Promise<FeedbackResponse> {
  return fetchWithFallback<FeedbackResponse>("/api/feedback", {
    method: "POST",
    body: JSON.stringify(payload)
  }, {
    success: true,
    message: "Feedback processed successfully.",
    updated_interest_dna: MOCK_INTEREST_DNA.interest_dna,
    adaptation_summary: `Profile updated based on '${payload.rating}'.`
  });
}

export async function submitQuiz(reelId: string, answerIndex?: number): Promise<QuizResponse> {
  return fetchWithFallback<QuizResponse>("/api/quiz", {
    method: "POST",
    body: JSON.stringify({ reel_id: reelId, user_answer_index: answerIndex })
  }, {
    quiz: {
      id: `quiz_${reelId}`,
      reel_id: reelId,
      question: "What is the primary purpose of the 'Retrieval' step in a RAG pipeline?",
      options: [
        "A. Fine-tune the underlying neural network weights",
        "B. Retrieve relevant context documents from a vector database to augment the prompt",
        "C. Accelerate GPU memory transfer speeds",
        "D. Compress the token count of the query"
      ],
      correct_option_index: 1,
      explanation: "In RAG, retrieval queries an external vector index to fetch factual context snippets, grounding the LLM prompt and preventing hallucinations.",
      difficulty: "Intermediate"
    },
    user_submitted: answerIndex !== undefined,
    is_correct: answerIndex === 1,
    explanation: "Retrieval queries an external vector index to augment the LLM prompt.",
    score_awarded: answerIndex === 1 ? 100 : 0
  });
}

export async function runDemo(): Promise<DemoRunResult> {
  return fetchWithFallback<DemoRunResult>("/api/demo/run", {
    method: "POST"
  });
}
