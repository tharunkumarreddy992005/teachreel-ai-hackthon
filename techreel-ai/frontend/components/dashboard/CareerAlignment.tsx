"use client";

import React from "react";
import { Briefcase, Compass, Award } from "lucide-react";
import { ScoreBar } from "@/components/common/ScoreBar";

interface CareerAlignmentProps {
  alignments?: Array<{
    role: string;
    match_score: number;
    category: string;
  }>;
}

export const CareerAlignmentCard: React.FC<CareerAlignmentProps> = ({
  alignments = [
    { role: "Software Engineer", match_score: 92, category: "Core Match" },
    { role: "Backend Engineer", match_score: 87, category: "Specialization" },
    { role: "Cloud Engineer", match_score: 61, category: "Adjacent" },
    { role: "AI Engineer", match_score: 58, category: "Exploration" }
  ]
}) => {
  return (
    <div className="rounded-3xl glass-panel p-6 md:p-8 space-y-5 border border-indigo-500/20 shadow-xl">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400">
            <Briefcase className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              Career Alignment <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300">Exploration</span>
            </h3>
            <p className="text-xs text-slate-400">Exploration suggestions based on latent skills (not rigid predictions)</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
        {alignments.map((item, idx) => (
          <div key={idx} className="p-4 rounded-2xl bg-slate-900/60 border border-white/5 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-100">{item.role}</span>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-indigo-500/10 text-indigo-300 border border-indigo-500/20">
                {item.category}
              </span>
            </div>
            <ScoreBar
              label="Role Match Fit"
              score={item.match_score}
              color={item.match_score >= 85 ? "emerald" : item.match_score >= 60 ? "indigo" : "amber"}
            />
          </div>
        ))}
      </div>
    </div>
  );
};
