"use client";

import React, { useState, useEffect } from "react";
import { PageContainer } from "@/components/layout/PageContainer";
import { Hero } from "@/components/dashboard/Hero";
import { ReelTester } from "@/components/dashboard/ReelTester";
import { InterestDNA } from "@/components/dashboard/InterestDNA";
import { HiddenInterestCard } from "@/components/dashboard/HiddenInterest";
import { CurrentReelCard } from "@/components/dashboard/CurrentReel";
import { RecommendationCard } from "@/components/dashboard/RecommendationCard";
import { WhyRecommendationCard } from "@/components/dashboard/WhyRecommendation";
import { RejectedRecommendationsCard } from "@/components/dashboard/RejectedRecommendations";
import { ContentFatigueCard } from "@/components/dashboard/ContentFatigue";
import { HypeShieldWidget } from "@/components/dashboard/HypeShield";
import { EmergingInterestCard } from "@/components/dashboard/EmergingInterest";
import { KnowledgeGapCard } from "@/components/dashboard/KnowledgeGap";
import { CareerAlignmentCard } from "@/components/dashboard/CareerAlignment";
import { AgentActivityCard } from "@/components/dashboard/AgentActivity";
import { QuizModal } from "@/components/learning/QuizModal";
import { DemoModal } from "@/components/demo/DemoModal";
import {
  InterestDNAResponse,
  RecommendationResponse,
  HypeAnalysisResponse,
  DemoRunResult
} from "@/types";
import {
  getInterestDNA,
  getRecommendations,
  getEmergingInterests,
  getKnowledgeGaps,
  getCareerAlignment,
  getHypeAnalysis,
  analyzeFeed,
  submitFeedback,
  runDemo
} from "@/lib/api";

export default function DashboardPage() {
  const [interestData, setInterestData] = useState<InterestDNAResponse | null>(null);
  const [recommendationData, setRecommendationData] = useState<RecommendationResponse | null>(null);
  const [emergingData, setEmergingData] = useState<any[]>([]);
  const [knowledgeGapsData, setKnowledgeGapsData] = useState<any[]>([]);
  const [careerAlignmentData, setCareerAlignmentData] = useState<any>(null);
  const [hypeAnalysisData, setHypeAnalysisData] = useState<HypeAnalysisResponse | null>(null);

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);
  const [isAnalyzingManual, setIsAnalyzingManual] = useState<boolean>(false);
  const [isDemoRunning, setIsDemoRunning] = useState<boolean>(false);
  const [isQuizOpen, setIsQuizOpen] = useState<boolean>(false);
  const [isDemoModalOpen, setIsDemoModalOpen] = useState<boolean>(false);
  const [isWhyOpen, setIsWhyOpen] = useState<boolean>(true);

  // Initial Data Fetch directly from FastAPI Backend
  useEffect(() => {
    async function loadInitialData() {
      setIsLoading(true);
      try {
        const [dna, rec, emerging, gaps, career, hype] = await Promise.all([
          getInterestDNA("student_001"),
          getRecommendations("student_001"),
          getEmergingInterests("student_001"),
          getKnowledgeGaps("student_001"),
          getCareerAlignment("student_001"),
          getHypeAnalysis()
        ]);
        setInterestData(dna);
        setRecommendationData(rec);
        setEmergingData(emerging);
        setKnowledgeGapsData(gaps);
        setCareerAlignmentData(career);
        setHypeAnalysisData(hype);
      } catch (err) {
        console.error("Dashboard backend data load error:", err);
      } finally {
        setIsLoading(false);
      }
    }
    loadInitialData();
  }, []);

  const handleAnalyzeFeed = async () => {
    setIsAnalyzing(true);
    try {
      await analyzeFeed({ user_id: "student_001" });
      const [dna, rec, emerging, gaps, career, hype] = await Promise.all([
        getInterestDNA("student_001"),
        getRecommendations("student_001"),
        getEmergingInterests("student_001"),
        getKnowledgeGaps("student_001"),
        getCareerAlignment("student_001"),
        getHypeAnalysis()
      ]);
      setInterestData(dna);
      setRecommendationData(rec);
      setEmergingData(emerging);
      setKnowledgeGapsData(gaps);
      setCareerAlignmentData(career);
      setHypeAnalysisData(hype);
    } catch (err) {
      console.error("Feed analysis error:", err);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleAnalyzeManualReel = async (reelData: { reel_title: string; reel_description: string; topic: string }) => {
    setIsAnalyzingManual(true);
    try {
      const analyzeRes = await analyzeFeed({
        user_id: "student_001",
        reel_title: reelData.reel_title,
        reel_description: reelData.reel_description,
        topic: reelData.topic,
        watch_percentage: 96.0,
        liked: true,
        saved: true,
        replay_count: 2
      });

      const [dna, rec, emerging, gaps, career, hype] = await Promise.all([
        getInterestDNA("student_001"),
        getRecommendations("student_001"),
        getEmergingInterests("student_001"),
        getKnowledgeGaps("student_001"),
        getCareerAlignment("student_001"),
        getHypeAnalysis()
      ]);

      setInterestData(dna);
      setEmergingData(emerging);
      setKnowledgeGapsData(gaps);
      setCareerAlignmentData(career);
      setHypeAnalysisData(hype);

      // Find the analyzed reel summary for immediate display in CurrentReelCard
      const lastAnalyzed = analyzeRes.analyzed_reels?.[analyzeRes.analyzed_reels.length - 1];
      if (lastAnalyzed) {
        setRecommendationData({
          ...rec,
          current_reel: {
            title: lastAnalyzed.title,
            topic: lastAnalyzed.primary_topic,
            watch_percentage: lastAnalyzed.watch_percentage,
            replay_count: lastAnalyzed.replay_count,
            liked: lastAnalyzed.liked,
            saved: lastAnalyzed.saved,
            intent: lastAnalyzed.intent
          }
        });
      } else {
        setRecommendationData(rec);
      }
    } catch (err) {
      console.error("Manual reel analysis error:", err);
    } finally {
      setIsAnalyzingManual(false);
    }
  };

  const handleRunDemo = async () => {
    setIsDemoModalOpen(true);
  };

  const handleDemoCompleted = (result: DemoRunResult) => {
    if (result) {
      setInterestData({
        user_id: "student_001",
        interest_dna: result.interest_dna,
        hidden_interest: result.hidden_interest,
        fatigue_detected: result.fatigue_info?.detected ?? true,
        fatigued_topics: result.fatigue_info?.topics ?? ["Java Memes"],
        updated_at: new Date().toISOString()
      });

      if (result.selected_recommendation) {
        setRecommendationData({
          current_reel: {
            title: "POV: Your Java code works on the first try 😂",
            topic: "Java",
            watch_percentage: 94,
            replay_count: 2,
            liked: true,
            saved: false,
            intent: {
              entertainment_intent: 91,
              learning_intent: 21,
              career_intent: 13,
              curiosity: 38,
              key_insight: "High watch time does not automatically mean high learning intent. Pure entertainment signal."
            }
          },
          interest_detected: {
            topic: result.hidden_interest?.primary_topic || "Software Engineering",
            score: result.hidden_interest?.score || 87,
            confidence: result.hidden_interest?.confidence || "High"
          },
          recommendation: result.selected_recommendation,
          scores: {
            interest_match: result.selected_recommendation.scores.interest_match,
            learning_value: result.selected_recommendation.scores.learning_value,
            career_relevance: result.selected_recommendation.scores.career_relevance,
            credibility: result.selected_recommendation.scores.credibility,
            novelty: result.selected_recommendation.scores.novelty
          },
          why: result.selected_recommendation.why,
          confidence: result.selected_recommendation.confidence,
          all_recommendations: result.candidates
        });
      }

      if (result.emerging_interests) {
        setEmergingData(result.emerging_interests);
      }
      if (result.knowledge_gaps) {
        setKnowledgeGapsData(result.knowledge_gaps);
      }
      if (result.career_alignment) {
        setCareerAlignmentData({
          disclaimer: "Exploration suggestions based on latent interests, not career predictions.",
          alignments: result.career_alignment
        });
      }
    }
  };

  const handleFeedback = async (rating: string, reasons?: string[]) => {
    try {
      const res = await submitFeedback({
        user_id: "student_001",
        reel_id: recommendationData?.recommendation.reel_id || "reel_006",
        recommendation_id: recommendationData?.recommendation.id,
        rating,
        reasons
      });
      if (res.updated_interest_dna && interestData) {
        setInterestData({
          ...interestData,
          interest_dna: res.updated_interest_dna
        });
      }
    } catch (err) {
      console.error("Feedback submit error:", err);
    }
  };

  return (
    <PageContainer onRunDemo={handleRunDemo} isDemoRunning={isDemoRunning}>
      {/* 1. Hero with Before vs After Comparison */}
      <Hero
        onAnalyzeFeed={handleAnalyzeFeed}
        onRunDemo={handleRunDemo}
        isAnalyzing={isAnalyzing}
        isDemoRunning={isDemoRunning}
      />

      {/* 2. Interactive Reel Tester for Live Demo Input */}
      <ReelTester
        onAnalyzeReel={handleAnalyzeManualReel}
        isAnalyzing={isAnalyzingManual}
      />

      {/* 3. Hidden Latent Interest Discovery Card */}
      {interestData?.hidden_interest && (
        <HiddenInterestCard hiddenInterest={interestData.hidden_interest} />
      )}

      {/* 4. Real-time Agent Activity 10-Step Timeline */}
      <AgentActivityCard isRunning={isDemoRunning} />

      {/* 5. Current Reel Observed vs Top Recommendation Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        <div className="lg:col-span-5 space-y-6">
          <CurrentReelCard currentReel={recommendationData?.current_reel} />
          <ContentFatigueCard
            detected={interestData?.fatigue_detected ?? true}
            fatiguedTopics={interestData?.fatigued_topics}
          />
        </div>

        <div className="lg:col-span-7 space-y-6">
          {recommendationData?.recommendation && (
            <RecommendationCard
              recommendation={recommendationData.recommendation}
              onOpenWhy={() => setIsWhyOpen(!isWhyOpen)}
              onOpenQuiz={() => setIsQuizOpen(true)}
              onFeedback={handleFeedback}
            />
          )}

          {isWhyOpen && (
            <WhyRecommendationCard
              whyPath={recommendationData?.recommendation.why_path}
              explanation={recommendationData?.why}
            />
          )}

          <RejectedRecommendationsCard
            rejectedList={recommendationData?.recommendation.rejected_candidates}
          />
        </div>
      </div>

      {/* 6. Interest DNA Full Breakdown */}
      {interestData?.interest_dna && (
        <InterestDNA items={interestData.interest_dna} />
      )}

      {/* 7. Hype Shield & Secondary Intelligence Modules */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <EmergingInterestCard items={emergingData} />
        <KnowledgeGapCard gaps={knowledgeGapsData} />
        <CareerAlignmentCard alignments={careerAlignmentData?.alignments} />
      </div>

      {/* 8. Hype Shield Banner */}
      <HypeShieldWidget items={hypeAnalysisData?.analyzed_items} />

      {/* Modals */}
      <QuizModal
        isOpen={isQuizOpen}
        onClose={() => setIsQuizOpen(false)}
        reelId={recommendationData?.recommendation.reel_id || "reel_006"}
      />

      <DemoModal
        isOpen={isDemoModalOpen}
        onClose={() => setIsDemoModalOpen(false)}
        onDemoCompleted={handleDemoCompleted}
      />
    </PageContainer>
  );
}
