"use client";

import React from "react";
import { AlertTriangle, Compass, ArrowRight, Shield } from "lucide-react";

interface ContentFatigueProps {
  detected?: boolean;
  fatiguedTopics?: string[];
}

export const ContentFatigueCard: React.FC<ContentFatigueProps> = ({
  detected = true,
  fatiguedTopics = ["Programming Memes", "Java Humor"],
}) => {
  if (!detected) return null;

  return (
    <div className="rounded-3xl bg-amber-950/20 border border-amber-500/30 p-6 space-y-4 relative overflow-hidden">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5 text-amber-400">
          <AlertTriangle className="w-5 h-5" />
          <h3 className="text-sm md:text-base font-bold">Content Fatigue Warning</h3>
        </div>
        <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30">
          Repetition Alert
        </span>
      </div>

      <p className="text-xs text-slate-300 leading-relaxed">
        High frequency of repetitive meme/Java syntax interactions detected ({fatiguedTopics.join(", ")}).
        To prevent filter bubbles and content exhaustion, TechReel AI has diversified recommendations towards broader engineering concepts:
      </p>

      <div className="flex flex-wrap items-center gap-2 pt-1">
        {["Backend APIs", "DSA Algorithms", "System Design", "Cloud Deployment"].map((topic, i) => (
          <span
            key={i}
            className="px-3 py-1 rounded-xl text-xs font-semibold bg-slate-900/80 text-amber-200 border border-amber-500/20 shadow-sm"
          >
            {topic}
          </span>
        ))}
      </div>
    </div>
  );
};
