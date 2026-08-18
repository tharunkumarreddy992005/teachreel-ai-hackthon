"use client";

import React, { useState } from "react";
import { Sparkles, HelpCircle, ThumbsDown, Play, ExternalLink, CheckCircle2, Award, Zap } from "lucide-react";
import { RecommendationDetail } from "@/types";
import { Badge } from "@/components/common/Badge";
import { ScoreBar } from "@/components/common/ScoreBar";
import { getDifficultyBadgeColor } from "@/lib/utils";

interface RecommendationCardProps {
  recommendation?: RecommendationDetail;
  onOpenWhy?: () => void;
  onOpenQuiz?: () => void;
  onFeedback?: (rating: string, reasons?: string[]) => void;
}

export const RecommendationCard: React.FC<RecommendationCardProps> = ({
  recommendation,
  onOpenWhy,
  onOpenQuiz,
  onFeedback,
}) => {
  const [feedbackGiven, setFeedbackGiven] = useState<string | null>(null);

  if (!recommendation) return null;

  const handleFeedback = (rating: string, reason?: string) => {
    setFeedbackGiven(rating);
    if (onFeedback) {
      onFeedback(rating, reason ? [reason] : []);
    }
  };

  return (
    <div className="rounded-3xl glass-panel-glow p-6 md:p-8 space-y-6 relative overflow-hidden border border-indigo-500/30 shadow-2xl">
      {/* Top Banner */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <Badge variant="indigo" size="md">
            <Sparkles className="w-3.5 h-3.5" /> Top AI Recommendation
          </Badge>
          <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-slate-800 text-slate-300 border border-white/5">
            {recommendation.category}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <span className={`text-xs font-semibold px-2.5 py-1 rounded-full border ${getDifficultyBadgeColor(recommendation.difficulty)}`}>
            {recommendation.difficulty}
          </span>
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-extrabold">
            <span>Score: {Math.round(recommendation.score)}/100</span>
          </div>
        </div>
      </div>

      {/* Main Reel Title & Creator */}
      <div className="space-y-2">
        <h3 className="text-xl md:text-2xl font-extrabold text-white font-outfit tracking-tight">
          {recommendation.title}
        </h3>
        <p className="text-xs md:text-sm text-slate-300 leading-relaxed font-normal">
          {recommendation.description || "Deep dive into High-Level Design (HLD): horizontal scaling, distributed caching with Redis, message queues with Kafka, and database sharding."}
        </p>
        <div className="flex items-center gap-3 text-xs text-slate-400 font-medium pt-1">
          <span>Creator: <strong className="text-slate-200">{recommendation.creator || "@system_design_pro"}</strong></span>
          <span>•</span>
          <span>Duration: <strong className="text-slate-200">{recommendation.duration_seconds || 60}s</strong></span>
          <span>•</span>
          <span>Confidence: <strong className="text-emerald-400">{recommendation.confidence}</strong></span>
        </div>
      </div>

      {/* 6 Multi-Objective Utility Sub-scores */}
      <div className="space-y-2.5 p-4 rounded-2xl bg-slate-900/60 border border-white/5">
        <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
          Recommendation Quality Vector Breakdown:
        </span>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          <ScoreBar label="Interest Match" score={recommendation.scores.interest_match} color="indigo" />
          <ScoreBar label="Learning Value" score={recommendation.scores.learning_value} color="emerald" />
          <ScoreBar label="Career Relevance" score={recommendation.scores.career_relevance} color="cyan" />
          <ScoreBar label="Credibility" score={recommendation.scores.credibility} color="emerald" />
          <ScoreBar label="Novelty" score={recommendation.scores.novelty} color="violet" />
          <ScoreBar label="Difficulty Fit" score={recommendation.scores.difficulty_fit} color="amber" />
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
        <div className="flex flex-wrap items-center gap-2.5">
          <a
            href={recommendation.url || "https://techreel.ai"}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-500/25 transition-all duration-200"
          >
            <Play className="w-3.5 h-3.5 fill-current" />
            <span>Watch Reel</span>
          </a>

          {onOpenWhy && (
            <button
              onClick={onOpenWhy}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold bg-slate-800 hover:bg-slate-700 text-indigo-300 border border-indigo-500/30 transition-all duration-200"
            >
              <HelpCircle className="w-3.5 h-3.5 text-indigo-400" />
              <span>Why This?</span>
            </button>
          )}

          {onOpenQuiz && (
            <button
              onClick={onOpenQuiz}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold bg-emerald-950/40 hover:bg-emerald-900/50 text-emerald-300 border border-emerald-500/30 transition-all duration-200"
            >
              <Zap className="w-3.5 h-3.5 text-emerald-400" />
              <span>Take 30s Quiz</span>
            </button>
          )}
        </div>

        {/* Feedback Section */}
        <div className="flex items-center gap-2">
          {feedbackGiven ? (
            <span className="text-xs text-emerald-400 font-semibold flex items-center gap-1.5 bg-emerald-500/10 px-3 py-1.5 rounded-xl border border-emerald-500/20">
              <CheckCircle2 className="w-3.5 h-3.5" /> Feedback Saved!
            </span>
          ) : (
            <button
              onClick={() => handleFeedback("Not Relevant", "Not Interested")}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 border border-transparent hover:border-rose-500/20 transition-all"
            >
              <ThumbsDown className="w-3.5 h-3.5" />
              <span>Not Interested</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
