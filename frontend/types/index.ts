export interface UserPreferences {
  preferred_difficulty: string;
  curiosity_tolerance: number;
  hype_tolerance: number;
}

export interface User {
  id: string;
  name: string;
  handle: string;
  avatar: string;
  role: string;
  university?: string;
  year?: string;
  preferences: UserPreferences;
}

export interface InterestItem {
  topic: string;
  score: number;
  confidence: string;
  trend: string;
  trend_direction: "up" | "down" | "neutral";
  evidence_count: number;
  domain?: string;
  category?: string;
}

export interface HiddenInterest {
  primary_topic: string;
  score: number;
  confidence: string;
  evidence_topics: string[];
  synthesis_reasoning: string;
}

export interface InterestDNAResponse {
  user_id: string;
  interest_dna: InterestItem[];
  hidden_interest?: HiddenInterest;
  fatigue_detected: boolean;
  fatigued_topics: string[];
  updated_at: string;
}

export interface GraphNode {
  id: string;
  label: string;
  category: string;
  depth: number;
  score: number;
  active: boolean;
  is_latent: boolean;
  parent?: string;
}

export interface GraphEdge {
  source: string;
  target: string;
  weight: number;
  relation: string;
}

export interface InterestGraphResponse {
  nodes: GraphNode[];
  edges: GraphEdge[];
  selected_latent_node?: string;
}

export interface RecommendationScores {
  interest_match: number;
  learning_value: number;
  career_relevance: number;
  credibility: number;
  novelty: number;
  difficulty_fit: number;
  diversity_bonus?: number;
  hype_penalty?: number;
  repetition_penalty?: number;
  total_score?: number;
}

export interface MicroLearning {
  headline: string;
  key_points: string[];
}

export interface RejectedCandidate {
  reel_id: string;
  title: string;
  reason: string;
  decision: string;
  hype_score: number;
  educational_value: number;
  credibility: number;
}

export interface RecommendationDetail {
  id: string;
  reel_id: string;
  title: string;
  description?: string;
  creator?: string;
  duration_seconds?: number;
  category: string;
  difficulty: string;
  confidence: string;
  score: number;
  scores: RecommendationScores;
  why: string;
  why_path: string[];
  micro_learning?: MicroLearning;
  rejected_candidates: RejectedCandidate[];
  thumbnail_url?: string;
  url?: string;
}

export interface IntentBreakdown {
  entertainment_intent: number;
  learning_intent: number;
  career_intent: number;
  curiosity: number;
  key_insight: string;
}

export interface CurrentReelInfo {
  title: string;
  topic?: string;
  watch_percentage?: number;
  replay_count?: number;
  liked?: boolean;
  saved?: boolean;
  intent?: IntentBreakdown;
}

export interface InterestDetectedInfo {
  topic: string;
  score: number;
  confidence: string;
}

export interface RecommendationResponse {
  current_reel: CurrentReelInfo;
  interest_detected: InterestDetectedInfo;
  recommendation: RecommendationDetail;
  scores: Record<string, number>;
  why: string;
  confidence: string;
  all_recommendations?: RecommendationDetail[];
}

export interface HypeAnalysisItem {
  reel_id: string;
  title: string;
  creator: string;
  hype_score: number;
  educational_value: number;
  credibility: number;
  decision: string;
  reasons: string[];
  detected_patterns: string[];
}

export interface HypeAnalysisResponse {
  analyzed_items: HypeAnalysisItem[];
  shield_status: string;
  total_blocked: number;
  protection_summary: string;
}

export interface AnalyzedReelSummary {
  reel_id: string;
  title: string;
  primary_topic: string;
  domain: string;
  watch_percentage: number;
  replay_count: number;
  liked: boolean;
  saved: boolean;
  shared: boolean;
  intent: IntentBreakdown;
}

export interface AnalyzeResponse {
  user_id: string;
  analyzed_count: number;
  analyzed_reels: AnalyzedReelSummary[];
  summary_insight: string;
  fatigue_detected: boolean;
  fatigued_topics: string[];
}

export interface LearningStep {
  step: number;
  topic: string;
  difficulty: string;
  status: string;
  estimated_time: string;
  reel_id?: string;
  reel_title: string;
}

export interface LearningPathResponse {
  user_id: string;
  title: string;
  steps: LearningStep[];
  estimated_total_hours: number;
  current_step_index: number;
  career_goal: string;
}

export interface QuizQuestion {
  id: string;
  reel_id: string;
  question: string;
  options: string[];
  correct_option_index: number;
  explanation: string;
  difficulty: string;
}

export interface QuizResponse {
  quiz: QuizQuestion;
  user_submitted: boolean;
  is_correct?: boolean | null;
  explanation: string;
  score_awarded: number;
}

export interface FeedbackRequest {
  user_id?: string;
  reel_id: string;
  recommendation_id?: string;
  rating: string;
  reasons?: string[];
}

export interface FeedbackResponse {
  success: boolean;
  message: string;
  updated_interest_dna: InterestItem[];
  adaptation_summary: string;
}

export interface DemoStep {
  name: string;
  status: string;
}

export interface DemoRunResult {
  steps: DemoStep[];
  interactions: any[];
  content_analysis: any[];
  interest_dna: InterestItem[];
  hidden_interest?: HiddenInterest;
  fatigue_info: {
    detected: boolean;
    topics: string[];
    message: string;
  };
  interest_graph: InterestGraphResponse;
  candidates: RecommendationDetail[];
  rejected_candidates: RejectedCandidate[];
  selected_recommendation: RecommendationDetail;
  explanation: {
    current_reel: string;
    interest_detected: string;
    recommended_reel: string;
    category: string;
    why_this_recommendation: string;
    why_path: string[];
    difficulty: string;
    confidence: string;
  };
  emerging_interests: any[];
  knowledge_gaps: any[];
  career_alignment: any[];
  learning_path: LearningPathResponse;
}
