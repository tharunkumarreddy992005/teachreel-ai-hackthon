"use client";

import React, { useState, useEffect } from "react";
import { PageContainer } from "@/components/layout/PageContainer";
import { RecommendationCard } from "@/components/dashboard/RecommendationCard";
import { WhyRecommendationCard } from "@/components/dashboard/WhyRecommendation";
import { RejectedRecommendationsCard } from "@/components/dashboard/RejectedRecommendations";
import { MicroLearningCard } from "@/components/learning/MicroLearning";
import { QuizModal } from "@/components/learning/QuizModal";
import { Loading } from "@/components/common/Loading";
import { RecommendationResponse } from "@/types";
import { getRecommendations, submitFeedback } from "@/lib/api";

export default function RecommendationsPage() {
  const [recData, setRecData] = useState<RecommendationResponse | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isQuizOpen, setIsQuizOpen] = useState<boolean>(false);
  const [activeReelId, setActiveReelId] = useState<string>("reel_006");

  useEffect(() => {
    async function loadData() {
      try {
        const data = await getRecommendations("student_001");
        setRecData(data);
      } catch (err) {
        console.error("Error loading recommendations:", err);
      } finally {
        setIsLoading(false);
      }
    }
    loadData();
  }, []);

  const handleFeedback = async (rating: string, reasons?: string[]) => {
    try {
      await submitFeedback({
        user_id: "student_001",
        reel_id: recData?.recommendation.reel_id || "reel_006",
        recommendation_id: recData?.recommendation.id,
        rating,
        reasons
      });
    } catch (err) {
      console.error("Feedback error:", err);
    }
  };

  if (isLoading) {
    return (
      <PageContainer>
        <Loading message="Evaluating Multi-Objective Utility Vectors..." />
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <div className="space-y-8">
        <div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-white font-outfit">
            AI Technology Recommendations
          </h1>
          <p className="text-xs md:text-sm text-slate-400">
            Ranked through a 7-factor composite utility equation balancing interest match, pedagogical depth, career relevance, and novelty.
          </p>
        </div>

        {recData?.recommendation && (
          <div className="space-y-6">
            <RecommendationCard
              recommendation={recData.recommendation}
              onOpenQuiz={() => {
                setActiveReelId(recData.recommendation.reel_id);
                setIsQuizOpen(true);
              }}
              onFeedback={handleFeedback}
            />

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
              <WhyRecommendationCard
                whyPath={recData.recommendation.why_path}
                explanation={recData.why}
              />
              <MicroLearningCard microLearning={recData.recommendation.micro_learning} />
            </div>

            <RejectedRecommendationsCard
              rejectedList={recData.recommendation.rejected_candidates}
            />
          </div>
        )}

        <QuizModal
          isOpen={isQuizOpen}
          onClose={() => setIsQuizOpen(false)}
          reelId={activeReelId}
        />
      </div>
    </PageContainer>
  );
}
