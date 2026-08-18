"use client";

import React from "react";
import { HelpCircle, AlertCircle, ArrowRight, Database } from "lucide-react";

interface KnowledgeGapProps {
  gaps?: Array<{
    topic: string;
    confidence: string;
    reason: string;
  }>;
}

export const KnowledgeGapCard: React.FC<KnowledgeGapProps> = ({
  gaps = [
    {
      topic: "Database Fundamentals & Sharding",
      confidence: "Medium",
      reason: "Strong backend signals but relatively little database content in recent interactions."
    }
  ]
}) => {
  return (
    <div className="rounded-3xl glass-panel p-6 md:p-8 space-y-5 border border-indigo-500/20 shadow-xl">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400">
            <Database className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              Knowledge Gap Analysis <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300">Prerequisite</span>
            </h3>
            <p className="text-xs text-slate-400">Identifies foundational concepts missing from current discovery pattern</p>
          </div>
        </div>
      </div>

      <div className="space-y-3">
        {gaps.map((gap, idx) => (
          <div key={idx} className="p-4 rounded-2xl bg-slate-900/60 border border-white/5 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-100 flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-indigo-400" />
                {gap.topic}
              </span>
              <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-white/5">
                Confidence: {gap.confidence}
              </span>
            </div>
            <p className="text-xs text-slate-300/90 leading-relaxed font-normal">
              &ldquo;{gap.reason}&rdquo;
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};
