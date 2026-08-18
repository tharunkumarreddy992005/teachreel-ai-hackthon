"use client";

import React from "react";
import { Sparkles, Eye, ArrowRight, ShieldCheck, CheckCircle2 } from "lucide-react";
import { HiddenInterest } from "@/types";

interface HiddenInterestProps {
  hiddenInterest?: HiddenInterest;
}

export const HiddenInterestCard: React.FC<HiddenInterestProps> = ({ hiddenInterest }) => {
  if (!hiddenInterest) return null;

  return (
    <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-indigo-900/40 via-purple-900/30 to-slate-900/60 border border-indigo-500/40 p-6 md:p-8 shadow-2xl space-y-4">
      {/* Decorative Glow */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/20 rounded-full blur-3xl -z-10 pointer-events-none" />

      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/20 border border-indigo-500/30 text-indigo-300 text-xs font-bold tracking-wide">
          <Sparkles className="w-3.5 h-3.5 text-indigo-400 animate-pulse" />
          <span>AI DISCOVERED A HIDDEN LATENT INTEREST</span>
        </div>
        <div className="flex items-center gap-2 text-xs text-indigo-300 font-bold bg-indigo-950/60 px-3 py-1 rounded-full border border-indigo-500/20">
          Confidence: <span className="text-emerald-400">{hiddenInterest.confidence}</span> • Match: <span className="text-white">{Math.round(hiddenInterest.score)}%</span>
        </div>
      </div>

      <div className="space-y-2">
        <h3 className="text-2xl md:text-3xl font-extrabold text-white font-outfit tracking-tight">
          {hiddenInterest.primary_topic}
        </h3>
        <p className="text-xs md:text-sm text-slate-300 leading-relaxed font-normal">
          &ldquo;{hiddenInterest.synthesis_reasoning}&rdquo;
        </p>
      </div>

      {/* Evidence Chips */}
      <div className="pt-2">
        <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-2">
          Synthesized Cross-Domain Evidence:
        </span>
        <div className="flex flex-wrap items-center gap-2">
          {hiddenInterest.evidence_topics.map((topic, i) => (
            <span
              key={i}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl text-xs font-semibold bg-slate-900/80 text-indigo-200 border border-indigo-500/20 shadow-sm"
            >
              <CheckCircle2 className="w-3.5 h-3.5 text-indigo-400" />
              <span>{topic}</span>
            </span>
          ))}
          <span className="text-xs text-slate-400 font-medium px-2">
            → Converted to High-Level Design recommendation
          </span>
        </div>
      </div>
    </div>
  );
};
