"use client";

import React from "react";
import { HelpCircle, ArrowRight, CheckCircle2, GitCommit, Sparkles } from "lucide-react";

interface WhyRecommendationProps {
  whyPath?: string[];
  explanation?: string;
}

export const WhyRecommendationCard: React.FC<WhyRecommendationProps> = ({
  whyPath = ["Java", "Programming", "Software Engineering", "Backend", "System Design"],
  explanation = "Your recent interactions indicate a broader software-engineering interest rather than Java-specific learning intent."
}) => {
  return (
    <div className="rounded-3xl glass-panel p-6 md:p-8 space-y-5 border border-indigo-500/20">
      <div className="flex items-center gap-3">
        <div className="p-2.5 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400">
          <HelpCircle className="w-5 h-5" />
        </div>
        <div>
          <h3 className="text-base font-bold text-white">Why This Recommendation?</h3>
          <p className="text-xs text-slate-400">Transparent AI inference reasoning path</p>
        </div>
      </div>

      {/* Visual Inference Pathway */}
      <div className="p-4 rounded-2xl bg-slate-900/70 border border-white/5 space-y-3">
        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
          Inference Knowledge Path:
        </span>
        <div className="flex flex-wrap items-center gap-2 text-xs font-semibold">
          {whyPath.map((step, idx) => {
            const isLast = idx === whyPath.length - 1;
            return (
              <React.Fragment key={idx}>
                <span
                  className={`px-3 py-1.5 rounded-xl border flex items-center gap-1.5 ${
                    isLast
                      ? "bg-emerald-500/10 text-emerald-300 border-emerald-500/30 shadow-[0_0_12px_rgba(16,185,129,0.2)] font-bold"
                      : "bg-slate-800/80 text-indigo-200 border-white/10"
                  }`}
                >
                  {isLast ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> : <GitCommit className="w-3.5 h-3.5 text-indigo-400" />}
                  <span>{step}</span>
                </span>
                {!isLast && <ArrowRight className="w-3.5 h-3.5 text-indigo-400/60" />}
              </React.Fragment>
            );
          })}
        </div>
      </div>

      {/* Textual Explanation */}
      <div className="p-4 rounded-2xl bg-indigo-950/20 border border-indigo-500/20 text-xs md:text-sm text-slate-200 leading-relaxed font-normal">
        <strong className="text-indigo-300 block mb-1">Agent Explanation:</strong>
        &ldquo;{explanation}&rdquo;
      </div>
    </div>
  );
};
