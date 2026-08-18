"use client";

import React from "react";
import { Dna, TrendingUp, TrendingDown, Minus, Info } from "lucide-react";
import { InterestItem } from "@/types";
import { Badge } from "@/components/common/Badge";
import { ScoreBar } from "@/components/common/ScoreBar";

interface InterestDNAProps {
  items: InterestItem[];
}

export const InterestDNA: React.FC<InterestDNAProps> = ({ items }) => {
  return (
    <div className="rounded-3xl glass-panel p-6 md:p-8 space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400">
            <Dna className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              Interest DNA <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300">Live Profile</span>
            </h2>
            <p className="text-xs text-slate-400">Multi-factor weighted latent interest vectors</p>
          </div>
        </div>
        <Badge variant="indigo" size="sm">
          {items.length} Tracked Vectors
        </Badge>
      </div>

      {/* Grid of Interest DNA Items */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {items.map((item) => {
          const isTop = item.score >= 80;
          return (
            <div
              key={item.topic}
              className={`p-4 rounded-2xl border transition-all duration-300 relative overflow-hidden ${
                isTop
                  ? "bg-indigo-950/20 border-indigo-500/30 shadow-lg shadow-indigo-500/5 hover:border-indigo-500/50"
                  : "bg-slate-900/40 border-white/5 hover:border-white/10"
              }`}
            >
              {/* Header: Title and Trend */}
              <div className="flex items-start justify-between gap-2 mb-2">
                <div>
                  <h4 className="text-xs font-bold text-slate-100">{item.topic}</h4>
                  <span className="text-[10px] text-slate-400 font-medium">
                    {item.domain || "Software"}
                  </span>
                </div>
                <div className="flex items-center gap-1 text-[11px] font-bold text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded border border-emerald-500/20">
                  {item.trend_direction === "up" ? (
                    <TrendingUp className="w-3 h-3" />
                  ) : item.trend_direction === "down" ? (
                    <TrendingDown className="w-3 h-3 text-rose-400" />
                  ) : (
                    <Minus className="w-3 h-3 text-slate-400" />
                  )}
                  <span>{item.trend}</span>
                </div>
              </div>

              {/* Score Bar */}
              <ScoreBar
                label=""
                score={item.score}
                color={item.score >= 80 ? "indigo" : item.score >= 60 ? "cyan" : item.score >= 40 ? "emerald" : "amber"}
                showValue={false}
                className="my-3"
              />

              {/* Footer: Confidence and Evidence Count */}
              <div className="flex items-center justify-between text-[10px] text-slate-400 pt-2 border-t border-white/5">
                <span className="flex items-center gap-1">
                  Score: <strong className="text-slate-200">{Math.round(item.score)}%</strong>
                </span>
                <span className="flex items-center gap-1">
                  Evidence: <strong className="text-slate-200">{item.evidence_count}</strong>
                </span>
                <span className="px-1.5 py-0.2 rounded bg-slate-800 text-slate-300 font-medium border border-white/5">
                  {item.confidence}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
