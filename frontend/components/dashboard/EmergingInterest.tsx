"use client";

import React from "react";
import { Sparkles, TrendingUp, Cpu, Cloud, ShieldAlert } from "lucide-react";
import { ScoreBar } from "@/components/common/ScoreBar";

interface EmergingInterestProps {
  items?: Array<{
    topic: string;
    potential_score: number;
    status: string;
    signals?: string[];
  }>;
}

export const EmergingInterestCard: React.FC<EmergingInterestProps> = ({
  items = [
    { topic: "AI Engineering", potential_score: 76, status: "Potential emerging interest", signals: ["Local LLM hardware benchmarking", "Python backend overlap"] },
    { topic: "Cloud Engineering", potential_score: 62, status: "Potential emerging interest", signals: ["Docker containerization mentions", "Distributed system scaling"] },
    { topic: "Cybersecurity", potential_score: 41, status: "Potential emerging interest", signals: ["Network layer curiosity", "Secure credential management"] }
  ]
}) => {
  const getIcon = (topic: string) => {
    if (topic.includes("AI")) return <Cpu className="w-4 h-4 text-cyan-400" />;
    if (topic.includes("Cloud")) return <Cloud className="w-4 h-4 text-indigo-400" />;
    return <ShieldAlert className="w-4 h-4 text-rose-400" />;
  };

  return (
    <div className="rounded-3xl glass-panel p-6 md:p-8 space-y-5 border border-cyan-500/20 shadow-xl">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              Emerging Interests <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300">Probabilistic</span>
            </h3>
            <p className="text-xs text-slate-400">Early signals from hardware telemetry and tooling intersections</p>
          </div>
        </div>
      </div>

      <div className="space-y-3">
        {items.map((item, idx) => (
          <div key={idx} className="p-4 rounded-2xl bg-slate-900/60 border border-white/5 space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                {getIcon(item.topic)}
                <h4 className="text-xs font-bold text-slate-200">{item.topic}</h4>
              </div>
              <span className="text-[10px] italic text-cyan-300 bg-cyan-950/40 px-2 py-0.5 rounded border border-cyan-500/20">
                {item.status}
              </span>
            </div>

            <ScoreBar
              label="Potential Interest Score"
              score={item.potential_score}
              color="cyan"
            />

            {item.signals && (
              <div className="flex flex-wrap gap-1.5 pt-1">
                {item.signals.map((sig, sIdx) => (
                  <span key={sIdx} className="text-[10px] px-2 py-0.5 rounded-md bg-slate-800 text-slate-300 border border-white/5">
                    Signal: {sig}
                  </span>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
