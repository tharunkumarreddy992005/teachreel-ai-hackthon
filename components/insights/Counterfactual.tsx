"use client";

import React, { useState } from "react";
import { HelpCircle, ArrowRight, Sparkles, Sliders, Check } from "lucide-react";
import { ScoreBar } from "@/components/common/ScoreBar";

export const CounterfactualCard: React.FC = () => {
  const [simulatedAIWeight, setSimulatedAIWeight] = useState<number>(85);

  return (
    <div className="rounded-3xl glass-panel p-6 md:p-8 space-y-6 border border-cyan-500/20 shadow-2xl">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400">
            <Sliders className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              Counterfactual AI Simulation <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300">&ldquo;What If?&rdquo;</span>
            </h2>
            <p className="text-xs text-slate-400">Simulate how adjusting specific latent interest weights alters recommendation decisions</p>
          </div>
        </div>
      </div>

      {/* Interactive Slider */}
      <div className="p-4 rounded-2xl bg-slate-900/60 border border-white/5 space-y-3">
        <div className="flex items-center justify-between text-xs">
          <span className="text-slate-300 font-bold">Simulate AI Engineering Weight</span>
          <span className="font-extrabold text-cyan-400">{simulatedAIWeight}%</span>
        </div>
        <input
          type="range"
          min="10"
          max="100"
          value={simulatedAIWeight}
          onChange={(e) => setSimulatedAIWeight(Number(e.target.value))}
          className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
        />
      </div>

      {/* Comparison Result */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Actual Decision */}
        <div className="p-4 rounded-2xl bg-slate-900/80 border border-white/10 space-y-2">
          <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-300">
            Current Profile Decision (AI: 51%)
          </span>
          <h4 className="text-xs md:text-sm font-bold text-white">
            How Backend Engineers Think About System Design
          </h4>
          <p className="text-[11px] text-slate-400">
            Driven by broad Software Engineering & Distributed Systems affinity.
          </p>
        </div>

        {/* Counterfactual Decision */}
        <div className="p-4 rounded-2xl bg-cyan-950/30 border border-cyan-500/40 space-y-2 shadow-lg shadow-cyan-500/10">
          <span className="text-[10px] font-bold uppercase tracking-wider text-cyan-300 flex items-center gap-1.5">
            <Sparkles className="w-3 h-3 text-cyan-400" /> Simulated Decision (AI: {simulatedAIWeight}%)
          </span>
          <h4 className="text-xs md:text-sm font-bold text-cyan-200">
            {simulatedAIWeight > 70
              ? "Building a Production RAG Application with Vector Search"
              : "How Backend Engineers Think About System Design"}
          </h4>
          <p className="text-[11px] text-cyan-300/80">
            {simulatedAIWeight > 70
              ? "AI intent threshold exceeded. Shifts primary recommendation towards LLM embeddings & vector retrieval."
              : "System Design remains optimal below 70% threshold."}
          </p>
        </div>
      </div>
    </div>
  );
};
