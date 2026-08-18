"use client";

import React from "react";
import { Sparkles, ShieldCheck, Cpu, Terminal, Play } from "lucide-react";

interface HeaderProps {
  onRunDemo?: () => void;
  isDemoRunning?: boolean;
}

export const Header: React.FC<HeaderProps> = ({ onRunDemo, isDemoRunning }) => {
  return (
    <header className="h-16 border-b border-white/5 bg-[#090d16]/80 backdrop-blur-xl sticky top-0 z-30 px-6 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-semibold">
          <Cpu className="w-3.5 h-3.5 text-indigo-400" />
          <span>Cognitive Latent Recommender</span>
        </div>
        <div className="hidden md:flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-xs font-medium">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
          <span>Hype Shield Active</span>
        </div>
      </div>

      <div className="flex items-center gap-3">
        {onRunDemo && (
          <button
            onClick={onRunDemo}
            disabled={isDemoRunning}
            className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-500 hover:to-cyan-500 text-white shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40 transition-all duration-300 transform active:scale-95 disabled:opacity-50"
          >
            {isDemoRunning ? (
              <>
                <span className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                <span>Running Agent...</span>
              </>
            ) : (
              <>
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>Run Hackathon Demo</span>
              </>
            )}
          </button>
        )}

        <div className="flex items-center gap-2.5 pl-3 border-l border-white/10">
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-indigo-500 to-emerald-400 p-[1px]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://api.dicebear.com/7.x/bottts/svg?seed=Alex"
              alt="Alex Chen"
              className="w-full h-full rounded-full bg-slate-900 object-cover"
            />
          </div>
          <div className="hidden sm:block text-left">
            <p className="text-xs font-bold text-slate-200">Alex Chen</p>
            <p className="text-[10px] text-slate-400">@alex_codes</p>
          </div>
        </div>
      </div>
    </header>
  );
};
