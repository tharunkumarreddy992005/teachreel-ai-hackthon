"use client";

import React, { useState } from "react";
import { Network, Sparkles, Layers, ArrowRight, Zap, CheckCircle2 } from "lucide-react";
import { GraphNode, GraphEdge, InterestGraphResponse } from "@/types";
import { Badge } from "@/components/common/Badge";

interface InterestGraphProps {
  graphData?: InterestGraphResponse;
  onSelectNode?: (node: GraphNode) => void;
}

export const InterestGraph: React.FC<InterestGraphProps> = ({ graphData, onSelectNode }) => {
  const [selectedNodeId, setSelectedNodeId] = useState<string>("swe");

  const nodes: GraphNode[] = graphData?.nodes || [
    { id: "tech_root", label: "Technology", category: "Root", depth: 0, score: 100, active: true, is_latent: false },
    { id: "swe", label: "Software Engineering", category: "Domain", depth: 1, score: 87, active: true, is_latent: true, parent: "tech_root" },
    { id: "ai", label: "AI", category: "Domain", depth: 1, score: 51, active: true, is_latent: false, parent: "tech_root" },
    { id: "cloud", label: "Cloud", category: "Domain", depth: 1, score: 32, active: false, is_latent: false, parent: "tech_root" },
    { id: "cyber", label: "Cybersecurity", category: "Domain", depth: 1, score: 24, active: false, is_latent: false, parent: "tech_root" },
    { id: "hardware", label: "Hardware", category: "Domain", depth: 1, score: 43, active: true, is_latent: false, parent: "tech_root" },
    { id: "prog", label: "Programming", category: "Subdomain", depth: 2, score: 81, active: true, is_latent: false, parent: "swe" },
    { id: "dsa", label: "DSA", category: "Subdomain", depth: 2, score: 72, active: true, is_latent: false, parent: "swe" },
    { id: "backend", label: "Backend", category: "Subdomain", depth: 2, score: 85, active: true, is_latent: false, parent: "swe" },
    { id: "sys_design", label: "System Design", category: "Subdomain", depth: 2, score: 91, active: true, is_latent: false, parent: "swe" },
    { id: "career", label: "Developer Career", category: "Subdomain", depth: 2, score: 64, active: true, is_latent: false, parent: "swe" },
    { id: "java", label: "Java", category: "Concept", depth: 3, score: 88, active: true, is_latent: false, parent: "prog" },
    { id: "python", label: "Python", category: "Concept", depth: 3, score: 60, active: false, is_latent: false, parent: "prog" },
    { id: "cpp", label: "C++", category: "Concept", depth: 3, score: 45, active: false, is_latent: false, parent: "prog" },
    { id: "apis", label: "APIs", category: "Concept", depth: 3, score: 78, active: true, is_latent: false, parent: "backend" },
    { id: "dbs", label: "Databases", category: "Concept", depth: 3, score: 65, active: false, is_latent: false, parent: "backend" },
    { id: "microservices", label: "Microservices", category: "Concept", depth: 3, score: 70, active: true, is_latent: false, parent: "backend" }
  ];

  const selectedNode = nodes.find(n => n.id === selectedNodeId) || nodes[1];

  const handleNodeClick = (node: GraphNode) => {
    setSelectedNodeId(node.id);
    if (onSelectNode) onSelectNode(node);
  };

  return (
    <div className="rounded-3xl glass-panel p-6 md:p-8 space-y-6 border border-indigo-500/30 shadow-2xl">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400">
            <Network className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              Semantic Interest Graph <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300">Interactive Hierarchy</span>
            </h2>
            <p className="text-xs text-slate-400">Click any node to inspect semantic affinities and latent bridges</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Badge variant="indigo" size="sm">
            Latent Anchor: Software Engineering
          </Badge>
        </div>
      </div>

      {/* Interactive Visual Graph Canvas */}
      <div className="p-6 rounded-2xl bg-[#070b14] border border-white/10 space-y-6 relative overflow-hidden">
        {/* Background Grid Accent */}
        <div className="absolute inset-0 bg-grid-pattern opacity-40 pointer-events-none" />

        {/* Tier 0: Root */}
        <div className="flex justify-center relative z-10">
          <button
            onClick={() => handleNodeClick(nodes[0])}
            className={`px-6 py-2.5 rounded-2xl text-xs font-extrabold border transition-all duration-300 transform hover:scale-105 ${
              selectedNodeId === "tech_root"
                ? "bg-indigo-600 text-white border-indigo-400 shadow-[0_0_20px_rgba(99,102,241,0.6)]"
                : "bg-slate-900/90 text-slate-200 border-white/10 hover:border-white/30"
            }`}
          >
            🚀 Technology (Root Domain)
          </button>
        </div>

        {/* Tier 1: Major Domains */}
        <div className="space-y-2 relative z-10">
          <div className="text-center">
            <span className="text-[10px] uppercase font-bold tracking-widest text-slate-400">
              Primary Knowledge Domains
            </span>
          </div>
          <div className="flex flex-wrap justify-center gap-3">
            {nodes.filter(n => n.depth === 1).map((node) => {
              const isSelected = selectedNodeId === node.id;
              const isLatent = node.is_latent;
              return (
                <button
                  key={node.id}
                  onClick={() => handleNodeClick(node)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold border transition-all duration-300 flex items-center gap-2 transform hover:scale-105 ${
                    isSelected
                      ? "bg-indigo-600/30 text-white border-indigo-400 shadow-[0_0_20px_rgba(99,102,241,0.5)]"
                      : isLatent
                      ? "bg-emerald-950/40 text-emerald-300 border-emerald-500/40 shadow-[0_0_15px_rgba(16,185,129,0.3)] animate-pulse"
                      : "bg-slate-900/80 text-slate-300 border-white/10 hover:border-white/20"
                  }`}
                >
                  {isLatent && <Sparkles className="w-3.5 h-3.5 text-emerald-400" />}
                  <span>{node.label}</span>
                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-black/40 text-slate-300">
                    {Math.round(node.score)}%
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Tier 2: Sub-domains */}
        <div className="space-y-2 relative z-10 pt-2 border-t border-white/5">
          <div className="text-center">
            <span className="text-[10px] uppercase font-bold tracking-widest text-indigo-400">
              Software Engineering Specializations
            </span>
          </div>
          <div className="flex flex-wrap justify-center gap-2.5">
            {nodes.filter(n => n.depth === 2).map((node) => {
              const isSelected = selectedNodeId === node.id;
              return (
                <button
                  key={node.id}
                  onClick={() => handleNodeClick(node)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold border transition-all duration-200 flex items-center gap-1.5 ${
                    isSelected
                      ? "bg-indigo-500/30 text-indigo-200 border-indigo-400 shadow-[0_0_15px_rgba(99,102,241,0.4)]"
                      : "bg-slate-900/70 text-slate-300 border-white/5 hover:border-indigo-500/20"
                  }`}
                >
                  <span>{node.label}</span>
                  <span className="text-[10px] text-indigo-400 font-bold">
                    {Math.round(node.score)}%
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Tier 3: Core Concepts */}
        <div className="space-y-2 relative z-10 pt-2 border-t border-white/5">
          <div className="text-center">
            <span className="text-[10px] uppercase font-bold tracking-widest text-slate-400">
              Granular Technical Concepts
            </span>
          </div>
          <div className="flex flex-wrap justify-center gap-2">
            {nodes.filter(n => n.depth === 3).map((node) => {
              const isSelected = selectedNodeId === node.id;
              return (
                <button
                  key={node.id}
                  onClick={() => handleNodeClick(node)}
                  className={`px-3 py-1 rounded-lg text-[11px] font-medium border transition-all ${
                    isSelected
                      ? "bg-indigo-600/40 text-white border-indigo-400 font-bold"
                      : "bg-slate-900/40 text-slate-400 border-white/5 hover:text-slate-200 hover:border-white/10"
                  }`}
                >
                  <span>{node.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Selected Node Details Panel */}
      <div className="p-4 rounded-2xl bg-slate-900/60 border border-indigo-500/20 space-y-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <h4 className="text-sm font-bold text-white">
              Selected Node: <span className="text-indigo-300">{selectedNode.label}</span>
            </h4>
          </div>
          <Badge variant={selectedNode.is_latent ? "emerald" : "indigo"} size="sm">
            {selectedNode.category} • Score {Math.round(selectedNode.score)}%
          </Badge>
        </div>
        <p className="text-xs text-slate-300 leading-relaxed font-normal">
          {selectedNode.is_latent
            ? "Primary Latent Interest discovered across 5 disparate interaction topics. Anchors High-Level Design and distributed systems recommendations."
            : `Sub-topic node in ${selectedNode.parent ? "parent domain" : "technology network"} with ${Math.round(selectedNode.score)}% inferred affinity.`}
        </p>
      </div>
    </div>
  );
};
