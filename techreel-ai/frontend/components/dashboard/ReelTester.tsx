"use client";

import React, { useState } from "react";
import { Sparkles, Play, Send, Loader2, CheckCircle2, Bookmark, Flame } from "lucide-react";

interface ReelTesterProps {
  onAnalyzeReel: (reelData: { reel_title: string; reel_description: string; topic: string }) => Promise<void>;
  isAnalyzing?: boolean;
}

export const ReelTester: React.FC<ReelTesterProps> = ({ onAnalyzeReel, isAnalyzing = false }) => {
  const [title, setTitle] = useState<string>("How Discord Scaled WebSocket Gateway to 5M Concurrent Users");
  const [description, setDescription] = useState<string>("Deep dive into distributed message routing, Elixir concurrency, and Rust memory optimization");
  const [topic, setTopic] = useState<string>("System Design");
  const [lastAnalyzed, setLastAnalyzed] = useState<string | null>(null);

  const DEMO_PRESETS = [
    {
      label: "⚡ System Design (Educational)",
      title: "How Discord Scaled WebSocket Gateway to 5M Concurrent Users",
      description: "Deep dive into distributed message routing, Elixir concurrency, and Rust memory optimization",
      topic: "System Design",
      badge: "High Learning Signal"
    },
    {
      label: "😂 Java Meme (Entertainment)",
      title: "POV: Your Java code works on the first try 😂",
      description: "Debugging a multithreaded deadlock at 2 AM with System.out.println",
      topic: "Java",
      badge: "Entertainment Decomposed"
    },
    {
      label: "🚫 $200k Guarantee (Hype Shield)",
      title: "10 AI Tools that GUARANTEE a $200k Tech Job in 30 Days (No Coding!)",
      description: "Secret shortcuts to get hired at FAANG without writing code",
      topic: "AI Tools",
      badge: "Hype Blocked"
    }
  ];

  const handleApplyPreset = (preset: typeof DEMO_PRESETS[0]) => {
    setTitle(preset.title);
    setDescription(preset.description);
    setTopic(preset.topic);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !topic.trim()) return;
    await onAnalyzeReel({
      reel_title: title.trim(),
      reel_description: description.trim(),
      topic: topic.trim()
    });
    setLastAnalyzed(title.trim());
  };

  return (
    <div className="rounded-3xl glass-panel p-6 md:p-8 space-y-6 border border-indigo-500/30 shadow-2xl relative overflow-hidden">
      {/* Top Header */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base md:text-lg font-bold text-white flex items-center gap-2">
              Test a Reel <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300">Live AI Inference</span>
            </h3>
            <p className="text-xs text-slate-400">
              Provide any custom short-form video input to test intent decomposition, latent inference, and MongoDB persistence.
            </p>
          </div>
        </div>

        {lastAnalyzed && (
          <span className="text-xs font-bold text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20 flex items-center gap-1.5 animate-in fade-in">
            <CheckCircle2 className="w-3.5 h-3.5" /> Analyzed & Persisted to MongoDB
          </span>
        )}
      </div>

      {/* Quick Demo Presets */}
      <div className="space-y-2">
        <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">
          Quick Demo Presets:
        </span>
        <div className="flex flex-wrap gap-2">
          {DEMO_PRESETS.map((preset, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => handleApplyPreset(preset)}
              className="px-3.5 py-1.5 rounded-xl text-xs font-semibold bg-slate-900/80 hover:bg-indigo-600/30 border border-white/10 hover:border-indigo-500/40 text-slate-200 transition-all transform active:scale-95 flex items-center gap-2"
            >
              <span>{preset.label}</span>
              <span className="text-[9px] px-1.5 py-0.5 rounded bg-black/40 text-indigo-300 font-mono">
                {preset.topic}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Input Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="md:col-span-2 space-y-1.5">
            <label className="text-xs font-bold text-slate-300">Reel Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. How Discord Scaled WebSocket Gateway..."
              className="w-full px-4 py-2.5 rounded-xl bg-slate-900/90 border border-white/10 text-white text-xs md:text-sm focus:outline-none focus:border-indigo-500 transition-colors"
              required
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-300">Topic / Category</label>
            <input
              type="text"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="e.g. System Design, Java, AI Tools"
              className="w-full px-4 py-2.5 rounded-xl bg-slate-900/90 border border-white/10 text-white text-xs md:text-sm focus:outline-none focus:border-indigo-500 transition-colors"
              required
            />
          </div>
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-bold text-slate-300">Caption / Description</label>
          <textarea
            rows={2}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="e.g. Deep dive into distributed message routing, concurrency, memory optimization..."
            className="w-full px-4 py-2 rounded-xl bg-slate-900/90 border border-white/10 text-white text-xs md:text-sm focus:outline-none focus:border-indigo-500 transition-colors resize-none"
          />
        </div>

        <div className="flex items-center justify-between pt-2 border-t border-white/5">
          <span className="text-[11px] text-slate-400">
            Pipeline: <code className="text-indigo-300">Intent Analysis → Latent Detection → DNA Update → MongoDB Atlas</code>
          </span>

          <button
            type="submit"
            disabled={isAnalyzing}
            className="flex items-center gap-2 px-6 py-2.5 rounded-xl text-xs md:text-sm font-bold bg-gradient-to-r from-indigo-600 to-cyan-500 hover:from-indigo-500 hover:to-cyan-400 text-white shadow-lg shadow-indigo-500/30 transition-all transform active:scale-95 disabled:opacity-50"
          >
            {isAnalyzing ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Analyzing Reel...</span>
              </>
            ) : (
              <>
                <Send className="w-4 h-4" />
                <span>Analyze This Reel</span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};
