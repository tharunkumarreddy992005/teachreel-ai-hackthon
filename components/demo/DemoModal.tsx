"use client";

import React, { useState, useEffect } from "react";
import { Play, CheckCircle2, Loader2, Sparkles, ArrowRight, ShieldCheck, Award, Layers } from "lucide-react";
import { Modal } from "@/components/common/Modal";
import { DemoRunResult } from "@/types";
import { runDemo } from "@/lib/api";

interface DemoModalProps {
  isOpen: boolean;
  onClose: () => void;
  onDemoCompleted?: (result: DemoRunResult) => void;
}

export const DemoModal: React.FC<DemoModalProps> = ({
  isOpen,
  onClose,
  onDemoCompleted,
}) => {
  const [currentStepIndex, setCurrentStepIndex] = useState<number>(0);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [demoResult, setDemoResult] = useState<DemoRunResult | null>(null);

  const DEMO_STEPS = [
    { title: "1. Ingesting Reel Stream", desc: "Reading 5 interactions: Java meme, FAANG joke, SWE lifestyle, Laptop comparison, Git conflict." },
    { title: "2. Decomposing Intent", desc: "Distinguishing 91% Entertainment from 21% Learning intent on Java memes." },
    { title: "3. Latent Interest Synthesis", desc: "Synthesizing broader 'Software Engineering' domain (87%) instead of shallow Java repetition." },
    { title: "4. Semantic Candidate Retrieval", desc: "Searching MongoDB Vector index for distributed systems & backend architecture candidates." },
    { title: "5. Hype Shield & Constraint Filtering", desc: "Rejecting 96% Hype '$200k in 30 days', rejecting repetitive Java tutorial, and rejecting kernel eBPF." },
    { title: "6. Top Recommendation Selected", desc: "Selected 'How Backend Engineers Think About System Design' (Score: 91/100)." },
    { title: "7. Roadmap & Gap Construction", desc: "Generating 6-step curriculum, identifying database prerequisites, and calculating career alignment." }
  ];

  const handleStartDemo = async () => {
    setIsRunning(true);
    setCurrentStepIndex(0);

    try {
      const res = await runDemo();
      setDemoResult(res);

      // Animate through steps smoothly
      for (let i = 0; i < DEMO_STEPS.length; i++) {
        setCurrentStepIndex(i);
        await new Promise((resolve) => setTimeout(resolve, 600));
      }

      if (onDemoCompleted) {
        onDemoCompleted(res);
      }
    } catch (err) {
      console.error("Demo run error:", err);
    } finally {
      setIsRunning(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Hackathon Live Demo Walkthrough" maxWidth="xl">
      <div className="space-y-6 pt-1">
        <div className="p-4 rounded-2xl bg-gradient-to-r from-indigo-950/40 via-purple-950/30 to-slate-900 border border-indigo-500/30 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-indigo-300 flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-indigo-400" /> TECHREEL AI PIPELINE
            </span>
            <span className="text-[10px] text-emerald-400 font-bold bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
              Deterministic Demo
            </span>
          </div>
          <h4 className="text-base font-extrabold text-white">
            &ldquo;Don&apos;t stop scrolling. Upgrade what you discover.&rdquo;
          </h4>
          <p className="text-xs text-slate-300 leading-relaxed font-normal">
            Watch TechReel AI perceive humor and lifestyle videos, synthesize latent software engineering curiosity, reject clickbait hype, and recommend distributed systems design.
          </p>
        </div>

        {/* Stepper Progress */}
        <div className="space-y-3">
          {DEMO_STEPS.map((step, idx) => {
            const isDone = isRunning ? idx < currentStepIndex : demoResult !== null;
            const isCurrent = isRunning && idx === currentStepIndex;

            return (
              <div
                key={idx}
                className={`p-3.5 rounded-2xl border transition-all duration-300 flex items-start gap-3 text-xs ${
                  isCurrent
                    ? "bg-indigo-600/20 border-indigo-500 shadow-lg shadow-indigo-500/20 scale-[1.01]"
                    : isDone
                    ? "bg-slate-900/60 border-emerald-500/30 text-slate-200"
                    : "bg-slate-900/30 border-white/5 text-slate-400"
                }`}
              >
                <div className="mt-0.5">
                  {isCurrent ? (
                    <Loader2 className="w-4 h-4 text-indigo-400 animate-spin" />
                  ) : isDone ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  ) : (
                    <div className="w-4 h-4 rounded-full border border-white/20 flex items-center justify-center text-[9px] text-slate-400 font-mono">
                      {idx + 1}
                    </div>
                  )}
                </div>
                <div className="space-y-0.5">
                  <h5 className="font-bold text-slate-100">{step.title}</h5>
                  <p className="text-xs text-slate-400 leading-relaxed">{step.desc}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-between pt-3 border-t border-white/10">
          <button
            onClick={onClose}
            className="text-xs text-slate-400 hover:text-white transition-colors"
          >
            Close
          </button>

          <button
            onClick={handleStartDemo}
            disabled={isRunning}
            className="flex items-center gap-2 px-6 py-2.5 rounded-xl text-xs font-bold bg-gradient-to-r from-indigo-600 to-cyan-500 hover:from-indigo-500 hover:to-cyan-400 text-white shadow-lg shadow-indigo-500/30 transition-all transform active:scale-95 disabled:opacity-50"
          >
            {isRunning ? (
              <>
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
                <span>Executing Demo Steps...</span>
              </>
            ) : (
              <>
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>Run Golden Scenario</span>
              </>
            )}
          </button>
        </div>
      </div>
    </Modal>
  );
};
