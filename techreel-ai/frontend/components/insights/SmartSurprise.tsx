"use client";

import React from "react";
import { Sparkles, Compass, Play, ArrowRight } from "lucide-react";
import { Badge } from "@/components/common/Badge";

interface SmartSurpriseData {
  title: string;
  category: string;
  difficulty: string;
  connection_explanation: string;
  surprise_factor: number;
  semantic_anchor: string;
}

export const SmartSurpriseCard: React.FC<{ data?: SmartSurpriseData }> = ({ data }) => {
  const surprise = data || {
    title: "Game Engine Data Structures & Spatial Partitioning (BVH)",
    category: "Computer Graphics & Systems",
    difficulty: "Intermediate",
    connection_explanation: "Connecting your DSA data structure interest with low-level workstation compute hardware.",
    surprise_factor: 88,
    semantic_anchor: "DSA + Hardware"
  };

  return (
    <div className="rounded-3xl bg-gradient-to-r from-purple-950/40 via-indigo-950/40 to-slate-900/60 border border-purple-500/30 p-6 md:p-8 space-y-4 shadow-2xl">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/20 border border-purple-500/30 text-purple-300 text-xs font-bold tracking-wide">
          <Sparkles className="w-3.5 h-3.5 text-purple-400" />
          <span>70 / 20 / 10 SMART SURPRISE DISCOVERY</span>
        </div>
        <span className="text-xs font-bold text-purple-300 bg-purple-950/80 px-3 py-1 rounded-full border border-purple-500/20">
          Surprise Factor: {surprise.surprise_factor}%
        </span>
      </div>

      <div className="space-y-2">
        <span className="text-xs text-purple-300 font-semibold">
          Anchor: {surprise.semantic_anchor} • {surprise.category}
        </span>
        <h3 className="text-xl md:text-2xl font-extrabold text-white font-outfit">
          {surprise.title}
        </h3>
        <p className="text-xs md:text-sm text-slate-300 leading-relaxed font-normal">
          &ldquo;{surprise.connection_explanation}&rdquo;
        </p>
      </div>
    </div>
  );
};
