"use client";

import React from "react";
import { GitFork, ArrowRight, Sparkles } from "lucide-react";

interface BridgeItem {
  topic_a: string;
  topic_b: string;
  bridge_topic: string;
  relevance_score: number;
  description: string;
}

export const InterestBridgeCard: React.FC<{ bridges?: BridgeItem[] }> = ({ bridges }) => {
  const defaultBridges: BridgeItem[] = [
    {
      topic_a: "Java",
      topic_b: "AI",
      bridge_topic: "AI Applications & Spring AI with Java",
      relevance_score: 88,
      description: "Connecting enterprise object-oriented patterns with generative AI client integrations."
    },
    {
      topic_a: "Gaming / Graphics",
      topic_b: "Programming",
      bridge_topic: "Game AI & ECS (Entity Component System) Architecture",
      relevance_score: 82,
      description: "Applying high-performance cache-friendly memory layouts to interactive engines."
    },
    {
      topic_a: "DSA",
      topic_b: "Career",
      bridge_topic: "Technical Interview Patterns & System Complexity",
      relevance_score: 94,
      description: "Transforming abstract theoretical algorithms into pragmatic production problem solving."
    },
    {
      topic_a: "Cloud",
      topic_b: "Cybersecurity",
      bridge_topic: "Cloud Security Architecture & Zero Trust IAM",
      relevance_score: 79,
      description: "Securing containerized microservices and automated CI/CD deployment pipelines."
    }
  ];

  const list = bridges && bridges.length > 0 ? bridges : defaultBridges;

  return (
    <div className="rounded-3xl glass-panel p-6 md:p-8 space-y-6 border border-indigo-500/20 shadow-2xl">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400">
            <GitFork className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              Interest Bridges <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300">Crossover Synergy</span>
            </h2>
            <p className="text-xs text-slate-400">Multi-disciplinary intersections synthesizing two separate interest clusters</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {list.map((bridge, idx) => (
          <div key={idx} className="p-5 rounded-2xl bg-slate-900/60 border border-white/5 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs font-mono text-indigo-300">
                <span className="px-2 py-0.5 rounded bg-slate-800 border border-white/5">{bridge.topic_a}</span>
                <span>+</span>
                <span className="px-2 py-0.5 rounded bg-slate-800 border border-white/5">{bridge.topic_b}</span>
              </div>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-300 border border-emerald-500/20">
                Synergy: {bridge.relevance_score}%
              </span>
            </div>

            <div className="space-y-1">
              <h4 className="text-sm font-bold text-white flex items-center gap-1.5">
                <ArrowRight className="w-4 h-4 text-emerald-400" />
                {bridge.bridge_topic}
              </h4>
              <p className="text-xs text-slate-300 leading-relaxed font-normal">
                {bridge.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
