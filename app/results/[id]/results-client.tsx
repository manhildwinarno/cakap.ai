"use client";

import dynamic from "next/dynamic";
import { PrivateNavbar } from "@/components/private-navbar";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { CheckCircle2, Target, RotateCcw } from "lucide-react";
import Link from "next/link";
import type { FinalEvaluation } from "@/types/interview";
import { useLanguage } from "@/components/language-provider";

const ResultsQnA = dynamic(() => import("./results-qna").then(mod => ({ default: mod.ResultsQnA })), {
  loading: () => (
    <div className="mb-8 space-y-4">
      <div className="h-8 w-64 bg-muted animate-pulse rounded-lg" />
      {[1, 2, 3].map(i => (
        <div key={i} className="h-20 bg-muted/50 animate-pulse rounded-xl border border-border" />
      ))}
    </div>
  ),
});

export default function ResultsClient({ 
  reportData, 
  targetRole, 
  date 
}: { 
  reportData: FinalEvaluation; 
  targetRole: string; 
  date: string;
}) {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-background font-sans pb-24 text-foreground relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-[radial-gradient(ellipse_at_top,rgba(15,118,110,0.08),transparent_70%)] dark:bg-[radial-gradient(ellipse_at_top,rgba(20,184,166,0.08),transparent_70%)] pointer-events-none -z-10" />
      
      <PrivateNavbar activeTab="results" />

      <main className="pt-28 px-6 lg:px-8 max-w-5xl mx-auto w-full relative z-10">
        <div className="mb-10">
          <h1 className="text-3xl font-bold tracking-tight text-foreground">{t("resultsTitle")}</h1>
          <p className="text-muted-foreground mt-2">{targetRole} • {t("resultsCompletedOn")} {date}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          <Card className="col-span-1 md:col-span-1 p-8 rounded-2xl border border-border dark:border-white/10 shadow-sm hover:shadow-lg transition-shadow duration-300 flex flex-col items-center justify-center bg-card">
            <div className="relative w-40 h-40 flex items-center justify-center mb-4">
              <svg className="w-full h-full transform -rotate-90 drop-shadow-sm" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="42" fill="none" stroke="#F1F5F9" strokeWidth="10" />
                <motion.circle 
                  cx="50" cy="50" r="42" 
                  fill="none" 
                  stroke="#0F766E" 
                  strokeWidth="10" 
                  strokeDasharray="264" 
                  strokeDashoffset="264"
                  strokeLinecap="round" 
                  animate={{ strokeDashoffset: 264 - (264 * reportData.overall_score) / 100 }}
                  transition={{ duration: 1.5, ease: "easeOut", delay: 0.2 }}
                  style={{ willChange: "stroke-dashoffset" }}
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                <span className="text-4xl font-bold text-foreground tracking-tighter">{reportData.overall_score}<span className="text-xl text-muted-foreground">%</span></span>
              </div>
            </div>
            <h3 className="font-bold text-foreground text-lg">{t("resultsOverall")}</h3>
            <p className="text-sm text-muted-foreground text-center mt-1">{t("resultsBasedOn")} {reportData.questions.length} {t("resultsQuestions")}</p>
          </Card>

          <div className="col-span-1 md:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-6">
            <Card className="p-6 rounded-2xl border border-border dark:border-white/10 shadow-sm hover:shadow-lg transition-shadow duration-300 bg-card flex flex-col h-full">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-full bg-[#F0FDFA] dark:bg-[#064E3B]/30 flex items-center justify-center text-[#0F766E] dark:text-[#34D399]">
                  <CheckCircle2 size={20} />
                </div>
                <h3 className="font-bold text-foreground text-lg">{t("resultsStrengths")}</h3>
              </div>
              <ul className="space-y-4 flex-grow">
                {reportData.strengths.map((strength, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#0F766E] mt-2 shrink-0"></span>
                    <span className="text-muted-foreground text-[15px] leading-relaxed">{strength}</span>
                  </li>
                ))}
              </ul>
            </Card>

            <Card className="p-6 rounded-2xl border border-border dark:border-white/10 shadow-sm hover:shadow-lg transition-shadow duration-300 bg-card flex flex-col h-full">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-full bg-[#FFFBEB] dark:bg-[#78350F]/30 flex items-center justify-center text-[#D97706] dark:text-[#FBBF24]">
                  <Target size={20} />
                </div>
                <h3 className="font-bold text-foreground text-lg">{t("resultsImprovements")}</h3>
              </div>
              <ul className="space-y-4 flex-grow">
                {reportData.improvements.map((improvement, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#D97706] mt-2 shrink-0"></span>
                    <span className="text-muted-foreground text-[15px] leading-relaxed">{improvement}</span>
                  </li>
                ))}
              </ul>
            </Card>
          </div>
        </div>

        <ResultsQnA questions={reportData.questions} />
      </main>

      <div className="fixed bottom-0 left-0 w-full bg-white/90 dark:bg-background/90 backdrop-blur-md border-t border-[#E2E8F0] dark:border-border shadow-[0_-4px_20px_rgb(0,0,0,0.03)] z-40 py-4">
        <div className="max-w-5xl mx-auto px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-sm font-medium text-[#64748B] dark:text-muted-foreground hidden sm:block">
            Report generated successfully.
          </div>
          <div className="flex w-full sm:w-auto items-center gap-4">
            <Link href="/home" className="flex-1 sm:flex-none">
              <Button className="w-full bg-[#0F766E] hover:bg-[#005C55] text-white shadow-md gap-2 rounded-lg cursor-pointer">
                <RotateCcw size={16} />
                Practice Another Scenario
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
