"use client";

import React from "react";
import { Sidebar } from "./Sidebar";
import { Header } from "./Header";

interface PageContainerProps {
  children: React.ReactNode;
  onRunDemo?: () => void;
  isDemoRunning?: boolean;
}

export const PageContainer: React.FC<PageContainerProps> = ({
  children,
  onRunDemo,
  isDemoRunning
}) => {
  return (
    <div className="min-h-screen bg-[#090d16] text-slate-100 flex">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="flex-1 ml-64 flex flex-col min-h-screen">
        <Header onRunDemo={onRunDemo} isDemoRunning={isDemoRunning} />
        <main className="flex-1 p-6 md:p-8 max-w-7xl w-full mx-auto space-y-8">
          {children}
        </main>
      </div>
    </div>
  );
};
