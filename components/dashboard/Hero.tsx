"use client";

import React from "react";
import { Sparkles, Play, Compass, ArrowRight, ArrowDown, Cpu, Layers } from "lucide-react";

interface HeroProps {
  onAnalyzeFeed: () => void;
  onRunDemo: () => void;
  isAnalyzing: boolean;
  isDemoRunning: boolean;
}

export const Hero: React.FC<HeroProps> = ({
  onAnalyzeFeed,
  onRunDemo,
  isAnalyzing,
  isDemoRunning,
}) => {
  return (
    <div className="relative overflow-hidden rounded-3xl bg-gradient-to-b from-indigo-950/40 via-slate-900/60 to-[#090d16] border border-indigo-500/20 p-6 md:p-10 shadow-2xl space-y-8">
      {/* Background Decorative Glows */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl -z-10 pointer-events-none" />
      <div className="absolute bottom-0 left-1/3 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl -z-10 pointer-events-none" />

      {/* Header & Tagline */}
      <div className="space-y-4 max-w-3xl">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-bold tracking-wide">
          <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
          <span>TECHREEL AI • HACKATHON REVOLUTION</span>
        </div>

        <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-white leading-tight font-outfit">
          Your scrolling has a <span className="text-gradient-primary">pattern</span>.
        </h1>

        <p className="text-sm md:text-base text-slate-300 font-normal leading-relaxed">
          TechReel AI discovered what you&apos;re <span className="text-indigo-300 font-semibold underline decoration-indigo-400/50 underline-offset-4">becoming interested in</span>. Don&apos;t recommend what the student just watched—recommend where their latent curiosity is leading.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-3 pt-2">
          <button
            onClick={onRunDemo}
            disabled={isDemoRunning}
            className="flex items-center gap-2.5 px-6 py-3 rounded-xl text-xs md:text-sm font-bold bg-gradient-to-r from-indigo-600 via-indigo-500 to-cyan-500 hover:from-indigo-500 hover:to-cyan-400 text-white shadow-xl shadow-indigo-500/30 hover:shadow-indigo-500/50 transition-all duration-300 transform active:scale-95 disabled:opacity-50"
          >
            {isDemoRunning ? (
              <>
                <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                <span>Running Golden Demo...</span>
              </>
            ) : (
              <>
                <Play className="w-4 h-4 fill-current" />
                <span>Run Hackathon Demo</span>
              </>
            )}
          </button>

          <button
            onClick={onAnalyzeFeed}
            disabled={isAnalyzing}
            className="flex items-center gap-2 px-5 py-3 rounded-xl text-xs md:text-sm font-bold bg-slate-800/80 hover:bg-slate-700/80 text-slate-200 border border-white/10 hover:border-white/20 transition-all duration-200"
          >
            <Compass className="w-4 h-4 text-cyan-400" />
            <span>{isAnalyzing ? "Analyzing Feed..." : "Analyze My Feed"}</span>
          </button>
        </div>
      </div>

      {/* Large Before vs After Visual Comparison */}
      <div className="mt-8 pt-6 border-t border-white/10 space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-bold tracking-wider text-slate-400 uppercase flex items-center gap-2">
            <Layers className="w-3.5 h-3.5 text-indigo-400" /> The Core Product Differentiator
          </span>
          <span className="text-[10px] text-indigo-400 font-semibold px-2 py-0.5 rounded bg-indigo-500/10 border border-indigo-500/20">
            Latent Interest Discovery
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Shallow Traditional System */}
          <div className="p-4 rounded-2xl bg-rose-950/20 border border-rose-500/20 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-rose-400">TRADITIONAL RECOMMENDER</span>
              <span className="text-[10px] text-rose-400/80 bg-rose-500/10 px-2 py-0.5 rounded border border-rose-500/20">
                &ldquo;What did they watch?&rdquo;
              </span>
            </div>
            <div className="flex items-center justify-between text-xs text-slate-400 bg-slate-900/60 p-2.5 rounded-xl border border-white/5 font-mono">
              <span>Java Meme</span>
              <ArrowRight className="w-3.5 h-3.5 text-rose-400" />
              <span>Java Tutorial</span>
              <ArrowRight className="w-3.5 h-3.5 text-rose-400" />
              <span>Java Framework</span>
            </div>
            <p className="text-[11px] text-rose-300/80 italic">
              Traps user in narrow keyword repetition loop with zero educational growth.
            </p>
          </div>

          {/* TechReel AI */}
          <div className="p-4 rounded-2xl bg-indigo-950/30 border border-indigo-500/30 shadow-lg shadow-indigo-500/10 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-indigo-300 flex items-center gap-1.5">
                <Cpu className="w-3.5 h-3.5 text-indigo-400" /> TECHREEL AI ENGINE
              </span>
              <span className="text-[10px] text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20 font-bold">
                &ldquo;What are they becoming interested in?&rdquo;
              </span>
            </div>
            <div className="space-y-1.5">
              <div className="flex flex-wrap items-center gap-1 text-[11px] text-slate-300 font-mono bg-slate-900/80 p-2 rounded-lg border border-white/5">
                <span className="text-indigo-300">Java</span> + <span className="text-indigo-300">Coding</span> + <span className="text-indigo-300">Career</span> + <span className="text-indigo-300">GitHub</span> + <span className="text-indigo-300">Hardware</span>
              </div>
              <div className="flex items-center justify-center gap-2 text-xs font-bold text-emerald-400 py-0.5">
                <ArrowDown className="w-3.5 h-3.5 text-emerald-400 animate-bounce" />
                <span>Latent: Software Engineering</span>
              </div>
              <div className="flex flex-wrap items-center justify-between text-[11px] text-slate-300 bg-indigo-950/60 p-2 rounded-lg border border-indigo-500/20 font-semibold">
                <span className="text-cyan-300">Backend</span>
                <span>•</span>
                <span className="text-indigo-300">DSA</span>
                <span>•</span>
                <span className="text-emerald-300">System Design</span>
                <span>•</span>
                <span className="text-violet-300">Cloud</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
