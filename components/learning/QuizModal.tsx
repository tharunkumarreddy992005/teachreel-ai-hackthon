"use client";

import React, { useState } from "react";
import { Zap, CheckCircle2, XCircle, Award, HelpCircle } from "lucide-react";
import { Modal } from "@/components/common/Modal";
import { QuizQuestion, QuizResponse } from "@/types";
import { submitQuiz } from "@/lib/api";

interface QuizModalProps {
  isOpen: boolean;
  onClose: () => void;
  reelId?: string;
}

export const QuizModal: React.FC<QuizModalProps> = ({ isOpen, onClose, reelId = "reel_006" }) => {
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [quizResult, setQuizResult] = useState<QuizResponse | null>(null);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const defaultQuiz: QuizQuestion = {
    id: "quiz_006",
    reel_id: "reel_006",
    question: "Why is an in-memory cache like Redis placed before the primary database in scalable architectures?",
    options: [
      "A. To eliminate the need for any permanent disk storage",
      "B. To serve frequent read requests in sub-millisecond time and prevent database bottlenecking",
      "C. To automatically encrypt network traffic",
      "D. To execute complex SQL joins faster"
    ],
    correct_option_index: 1,
    explanation: "Redis caches hot keys in volatile RAM, intercepting 80%+ of read queries to protect disk-bound databases from traffic spikes.",
    difficulty: "Intermediate"
  };

  const handleSelect = async (index: number) => {
    if (quizResult?.user_submitted) return;
    setSelectedOption(index);
    setIsSubmitting(true);
    try {
      const res = await submitQuiz(reelId, index);
      setQuizResult(res);
    } catch {
      setQuizResult({
        quiz: defaultQuiz,
        user_submitted: true,
        is_correct: index === 1,
        explanation: defaultQuiz.explanation,
        score_awarded: index === 1 ? 100 : 0
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setSelectedOption(null);
    setQuizResult(null);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="30-Second Micro Quiz" maxWidth="lg">
      <div className="space-y-5 pt-1">
        <div className="flex items-center justify-between text-xs">
          <span className="text-slate-400 font-medium">Topic: System Design & Caching</span>
          <span className="text-indigo-400 font-bold px-2 py-0.5 rounded bg-indigo-500/10 border border-indigo-500/20">
            Intermediate
          </span>
        </div>

        {/* Question */}
        <h4 className="text-sm md:text-base font-bold text-white leading-snug">
          {defaultQuiz.question}
        </h4>

        {/* Options */}
        <div className="space-y-2.5">
          {defaultQuiz.options.map((opt, idx) => {
            const isSelected = selectedOption === idx;
            const isSubmitted = quizResult?.user_submitted;
            const isCorrect = idx === defaultQuiz.correct_option_index;

            let btnStyle = "bg-slate-900/80 border-white/10 hover:border-indigo-500/30 text-slate-200";
            if (isSubmitted) {
              if (isCorrect) {
                btnStyle = "bg-emerald-950/40 border-emerald-500/50 text-emerald-200";
              } else if (isSelected && !isCorrect) {
                btnStyle = "bg-rose-950/40 border-rose-500/50 text-rose-200";
              }
            } else if (isSelected) {
              btnStyle = "bg-indigo-600/30 border-indigo-500 text-white";
            }

            return (
              <button
                key={idx}
                onClick={() => handleSelect(idx)}
                disabled={isSubmitted || isSubmitting}
                className={`w-full p-3.5 rounded-2xl border text-left text-xs font-semibold transition-all duration-200 flex items-center justify-between gap-3 ${btnStyle}`}
              >
                <span>{opt}</span>
                {isSubmitted && isCorrect && (
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                )}
                {isSubmitted && isSelected && !isCorrect && (
                  <XCircle className="w-4 h-4 text-rose-400 shrink-0" />
                )}
              </button>
            );
          })}
        </div>

        {/* Explanation & Result Banner */}
        {quizResult?.user_submitted && (
          <div
            className={`p-4 rounded-2xl border space-y-2 text-xs animate-in fade-in ${
              quizResult.is_correct
                ? "bg-emerald-950/30 border-emerald-500/30 text-emerald-300"
                : "bg-rose-950/30 border-rose-500/30 text-rose-300"
            }`}
          >
            <div className="flex items-center gap-2 font-bold">
              {quizResult.is_correct ? (
                <>
                  <Award className="w-4 h-4 text-emerald-400" />
                  <span>Correct! +100 Knowledge XP Awarded</span>
                </>
              ) : (
                <>
                  <XCircle className="w-4 h-4 text-rose-400" />
                  <span>Incorrect. Review the pedagogical explanation below:</span>
                </>
              )}
            </div>
            <p className="text-slate-200 leading-relaxed font-normal">
              <strong>Explanation:</strong> {quizResult.explanation}
            </p>
          </div>
        )}

        <div className="flex items-center justify-between pt-2 border-t border-white/10">
          {quizResult?.user_submitted && (
            <button
              onClick={handleReset}
              className="text-xs text-indigo-400 hover:text-indigo-300 font-semibold"
            >
              Try Again
            </button>
          )}
          <button
            onClick={onClose}
            className="ml-auto px-5 py-2 rounded-xl text-xs font-bold bg-slate-800 hover:bg-slate-700 text-white transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </Modal>
  );
};
