"use client";

import React, { useState, useEffect } from "react";
import { PageContainer } from "@/components/layout/PageContainer";
import { LearningPathWidget } from "@/components/learning/LearningPath";
import { MicroLearningCard } from "@/components/learning/MicroLearning";
import { KnowledgeGapCard } from "@/components/dashboard/KnowledgeGap";
import { Loading } from "@/components/common/Loading";
import { LearningPathResponse } from "@/types";
import { getLearningPath, getKnowledgeGaps } from "@/lib/api";

export default function LearningPage() {
  const [learningPath, setLearningPath] = useState<LearningPathResponse | null>(null);
  const [gaps, setGaps] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    async function loadData() {
      try {
        const [path, g] = await Promise.all([
          getLearningPath("student_001"),
          getKnowledgeGaps("student_001")
        ]);
        setLearningPath(path);
        setGaps(g);
      } catch (err) {
        console.error("Error loading learning data:", err);
      } finally {
        setIsLoading(false);
      }
    }
    loadData();
  }, []);

  if (isLoading) {
    return (
      <PageContainer>
        <Loading message="Assembling Prerequisite Learning Curriculum..." />
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <div className="space-y-8">
        <div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-white font-outfit">
            Structured Learning Curriculum
          </h1>
          <p className="text-xs md:text-sm text-slate-400">
            Translates casual reel discovery into structured, pedagogical competency milestones with difficulty estimates and conceptual checkpoints.
          </p>
        </div>

        <LearningPathWidget pathData={learningPath || undefined} />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
          <MicroLearningCard />
          <KnowledgeGapCard gaps={gaps} />
        </div>
      </div>
    </PageContainer>
  );
}
