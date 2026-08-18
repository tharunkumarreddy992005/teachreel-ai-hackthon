"use client";

import React from "react";
import { Play, Heart, Bookmark, Repeat, AlertCircle, Sparkles } from "lucide-react";
import { CurrentReelInfo } from "@/types";
import { ScoreBar } from "@/components/common/ScoreBar";

interface CurrentReelProps {
  currentReel?: CurrentReelInfo;
}

export const CurrentReelCard: React.FC<CurrentReelProps> = ({ currentReel }) => {
  const reel = currentReel || {
    title: "POV: Your Java code works on the first try 😂",
    topic: "Java",
    watch_percentage: 94,
    replay_count: 2,
    liked: true,
    saved: false,
    intent: {
      entertainment_intent: 91,
      learning_intent: 21,
      career_intent: 13,
      curiosity: 38,
      key_insight: "High watch time does not automatically mean high learning intent. Pure entertainment signal."
    }
  };

  const intent = reel.intent || {
    entertainment_intent: 91,
    learning_intent: 21,
    career_intent: 13,
    curiosity: 38,
    key_insight: "High watch time does not automatically mean high learning intent. Pure entertainment signal."
  };

  return (
    <div className="rounded-3xl glass-panel p-6 md:p-8 space-y-6 border border-white/10">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400">
            <Play className="w-5 h-5 fill-current" />
          </div>
          <div>
            <h3 className="text-base font-bold text-white">Current Reel Observed</h3>
            <p className="text-xs text-slate-400">Real-time telemetry and intent decomposition</p>
          </div>
        </div>
        <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-slate-800 text-slate-300 border border-white/5">
          Topic: {reel.topic || "Java"}
        </span>
      </div>

      {/* Reel Header & Telemetry */}
      <div className="p-4 rounded-2xl bg-slate-900/60 border border-white/5 space-y-3">
        <h4 className="text-sm md:text-base font-bold text-indigo-200">
          &ldquo;{reel.title}&rdquo;
        </h4>

        {/* Telemetry Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2 border-t border-white/5 text-xs">
          <div className="p-2 rounded-xl bg-slate-800/50">
            <span className="text-[10px] text-slate-400 block">Watch Completion</span>
            <strong className="text-white text-xs">{reel.watch_percentage}%</strong>
          </div>
          <div className="p-2 rounded-xl bg-slate-800/50 flex items-center justify-between">
            <div>
              <span className="text-[10px] text-slate-400 block">Replays</span>
              <strong className="text-white text-xs">{reel.replay_count}x</strong>
            </div>
            <Repeat className="w-3.5 h-3.5 text-slate-400" />
          </div>
          <div className="p-2 rounded-xl bg-slate-800/50 flex items-center justify-between">
            <div>
              <span className="text-[10px] text-slate-400 block">Liked</span>
              <strong className="text-emerald-400 text-xs">{reel.liked ? "Yes" : "No"}</strong>
            </div>
            <Heart className={`w-3.5 h-3.5 ${reel.liked ? "text-emerald-400 fill-current" : "text-slate-400"}`} />
          </div>
          <div className="p-2 rounded-xl bg-slate-800/50 flex items-center justify-between">
            <div>
              <span className="text-[10px] text-slate-400 block">Saved</span>
              <strong className="text-rose-400 text-xs">{reel.saved ? "Yes" : "No"}</strong>
            </div>
            <Bookmark className={`w-3.5 h-3.5 ${reel.saved ? "text-rose-400 fill-current" : "text-slate-400"}`} />
          </div>
        </div>
      </div>

      {/* AI Interpretation Bars */}
      <div className="space-y-3">
        <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
          AI Intent Decomposition:
        </span>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <ScoreBar label="Entertainment Intent" score={intent.entertainment_intent} color="rose" />
          <ScoreBar label="Learning Intent" score={intent.learning_intent} color="indigo" />
          <ScoreBar label="Career Intent" score={intent.career_intent} color="amber" />
          <ScoreBar label="Curiosity Factor" score={intent.curiosity} color="cyan" />
        </div>
      </div>

      {/* Critical Principle Warning */}
      <div className="flex items-start gap-2.5 p-3.5 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-200 text-xs">
        <AlertCircle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
        <p className="leading-relaxed">
          <strong>Key AI Principle:</strong> {intent.key_insight || "High watch time does not automatically mean high learning intent. Multidimensional intent decomposed."}
        </p>
      </div>
    </div>
  );
};
