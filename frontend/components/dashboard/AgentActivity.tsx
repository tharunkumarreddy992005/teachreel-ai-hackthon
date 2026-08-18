"use client";

import React from "react";
import { Bot, CheckCircle2, Loader2, Sparkles, Terminal } from "lucide-react";
import { DemoStep } from "@/types";

interface AgentActivityProps {
  steps?: DemoStep[];
  currentStepIndex?: number;
  isRunning?: boolean;
}

export const AgentActivityCard: React.FC<AgentActivityProps> = ({
  steps = [
    { name: "Observing interactions", status: "completed" },
    { name: "Understanding context & intent", status: "completed" },
    { name: "Inferring Latent Interest DNA", status: "completed" },
    { name: "Checking content fatigue", status: "completed" },
    { name: "Retrieving semantic candidates", status: "completed" },
    { name: "Detecting hype & clickbait", status: "completed" },
    { name: "Comparing candidates & constraints", status: "completed" },
    { name: "Selecting top recommendation", status: "completed" },
    { name: "Generating transparent explanation", status: "completed" },
    { name: "Active learning ready", status: "completed" },
  ],
  currentStepIndex,
  isRunning = false,
}) => {
  return (
    <div className="rounded-3xl glass-panel p-6 md:p-8 space-y-5 border border-indigo-500/20 shadow-xl">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400">
            <Bot className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              Recommendation Agent <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">10-Step Loop</span>
            </h3>
            <p className="text-xs text-slate-400">Cognitive perception, inference, ranking, and explanation</p>
          </div>
        </div>
        {isRunning && (
          <div className="flex items-center gap-2 text-xs text-indigo-400 font-semibold animate-pulse">
            <Loader2 className="w-4 h-4 animate-spin" />
            <span>Agent Active...</span>
          </div>
        )}
      </div>

      {/* 10 Step Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-2.5 pt-2">
        {steps.map((step, idx) => {
          const isDone = isRunning
            ? currentStepIndex !== undefined && idx < currentStepIndex
            : true;
          const isCurrent = isRunning && currentStepIndex === idx;

          return (
            <div
              key={idx}
              className={`p-3 rounded-2xl border transition-all duration-300 flex items-center gap-2.5 text-xs ${
                isCurrent
                  ? "bg-indigo-600/20 border-indigo-500/50 shadow-lg shadow-indigo-500/20 scale-[1.02]"
                  : isDone
                  ? "bg-slate-900/60 border-emerald-500/20 text-slate-200"
                  : "bg-slate-900/30 border-white/5 text-slate-400"
              }`}
            >
              {isCurrent ? (
                <Loader2 className="w-4 h-4 text-indigo-400 animate-spin shrink-0" />
              ) : isDone ? (
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              ) : (
                <span className="w-4 h-4 rounded-full border border-white/20 flex items-center justify-center text-[10px] text-slate-400 shrink-0 font-mono">
                  {idx + 1}
                </span>
              )}
              <span className="font-semibold truncate">{step.name}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
