"use client";

import { useState } from "react";
import { PrivateNavbar } from "@/components/private-navbar";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, Target, ChevronDown, Download, RotateCcw, Star, Lightbulb } from "lucide-react";
import Link from "next/link";
import type { FinalEvaluation } from "@/types/interview";

export default function ResultsClient({ 
  reportData, 
  targetRole, 
  date 
}: { 
  reportData: FinalEvaluation; 
  targetRole: string; 
  date: string;
}) {
  const [expandedItems, setExpandedItems] = useState<number[]>(reportData.questions.length > 0 ? [0] : []);

  const toggleItem = (index: number) => {
    setExpandedItems(prev => 
      prev.includes(index) ? prev.filter(item => item !== index) : [...prev, index]
    );
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] font-sans pb-24 text-[#0F172A]">
      <PrivateNavbar activeTab="results" />

      <main className="pt-28 px-6 lg:px-8 max-w-5xl mx-auto w-full">
        <div className="mb-10">
          <h1 className="text-3xl font-bold tracking-tight text-[#0F172A]">Interview Evaluation Report</h1>
          <p className="text-[#3E4947] mt-2">{targetRole} • Completed on {date}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          <Card className="col-span-1 md:col-span-1 p-8 rounded-2xl border border-[#E2E8F0] shadow-sm flex flex-col items-center justify-center bg-[radial-gradient(ellipse_at_top_right,_rgba(15,118,110,0.1)_0%,_rgba(255,255,255,1)_70%)]">
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
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                <span className="text-4xl font-bold text-[#0F172A] tracking-tighter">{reportData.overall_score}<span className="text-xl text-[#64748B]">%</span></span>
              </div>
            </div>
            <h3 className="font-bold text-[#0F172A] text-lg">Overall Readiness</h3>
            <p className="text-sm text-[#3E4947] text-center mt-1">Based on {reportData.questions.length} questions.</p>
          </Card>

          <div className="col-span-1 md:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-6">
            <Card className="p-6 rounded-2xl border border-[#E2E8F0] shadow-sm bg-white flex flex-col h-full">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-full bg-[#F0FDFA] flex items-center justify-center text-[#0F766E]">
                  <CheckCircle2 size={20} />
                </div>
                <h3 className="font-bold text-[#0F172A] text-lg">Key Strengths</h3>
              </div>
              <ul className="space-y-4 flex-grow">
                {reportData.strengths.map((strength, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#0F766E] mt-2 shrink-0"></span>
                    <span className="text-[#3E4947] text-[15px] leading-relaxed">{strength}</span>
                  </li>
                ))}
              </ul>
            </Card>

            <Card className="p-6 rounded-2xl border border-[#E2E8F0] shadow-sm bg-white flex flex-col h-full">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-full bg-[#FFFBEB] flex items-center justify-center text-[#D97706]">
                  <Target size={20} />
                </div>
                <h3 className="font-bold text-[#0F172A] text-lg">Areas to Improve</h3>
              </div>
              <ul className="space-y-4 flex-grow">
                {reportData.improvements.map((improvement, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#D97706] mt-2 shrink-0"></span>
                    <span className="text-[#3E4947] text-[15px] leading-relaxed">{improvement}</span>
                  </li>
                ))}
              </ul>
            </Card>
          </div>
        </div>

        <div className="mb-8">
          <h2 className="text-2xl font-bold text-[#0F172A] mb-6">Question-by-Question Analysis</h2>
          
          <div className="flex flex-col gap-4">
            {reportData.questions.map((item, index) => {
              const isExpanded = expandedItems.includes(index);
              
              return (
                <Card key={index} className="border border-[#E2E8F0] shadow-sm bg-white overflow-hidden rounded-xl">
                  <button 
                    onClick={() => toggleItem(index)}
                    className="w-full text-left px-6 py-5 flex items-start justify-between gap-4 hover:bg-[#F8FAFC]/50 transition-colors"
                  >
                    <div className="flex gap-4">
                      <div className="text-[#64748B] font-bold mt-0.5">
                        Q{index + 1}
                      </div>
                      <div className="font-semibold text-[#0F172A] text-[15px] leading-snug pr-8">
                        {item.question}
                      </div>
                    </div>
                    <ChevronDown 
                      size={20} 
                      className={`text-[#64748B] shrink-0 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`} 
                    />
                  </button>

                  <AnimatePresence initial={false}>
                    {isExpanded && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                      >
                        <div className="px-6 pb-6 pt-2 border-t border-[#F1F5F9] flex flex-col gap-6">
                          
                          <div className="bg-[#FFFBEB]/50 border border-[#FEF3C7] rounded-xl p-5">
                            <div className="flex items-center justify-between mb-3">
                               <div className="flex items-center gap-2">
                                <span className="text-xs font-semibold text-[#92400E] uppercase tracking-wider">Your Answer</span>
                               </div>
                               <div className="text-xs font-semibold text-[#64748B]">Score: {item.score}/100</div>
                            </div>
                            <p className="text-[#3F3F46] text-[15px] leading-relaxed mb-4">
                              "{item.user_answer}"
                            </p>
                            <div className="bg-white/60 p-3 rounded-lg border border-[#FEF3C7] text-sm text-[#92400E]">
                                <strong>Feedback:</strong> {item.feedback}
                            </div>
                          </div>

                          <div className="bg-[#F0FDFA] border border-[#CCFBF1] border-l-4 border-l-[#0F766E] rounded-r-xl rounded-l-sm p-5">
                            <div className="flex items-center gap-2 mb-3">
                              <span className="bg-[#0F766E] text-white text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded-full flex items-center gap-1.5">
                                <Lightbulb size={12} /> AI Suggestion
                              </span>
                              <span className="text-xs font-semibold text-[#0F766E] uppercase tracking-wider">Optimized Response</span>
                            </div>
                            <p className="text-[#0F172A] text-[15px] leading-relaxed">
                              "{item.improved_answer_suggestion}"
                            </p>
                          </div>

                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </Card>
              );
            })}
          </div>
        </div>
      </main>

      <div className="fixed bottom-0 left-0 w-full bg-white/90 backdrop-blur-md border-t border-[#E2E8F0] shadow-[0_-4px_20px_rgb(0,0,0,0.03)] z-40 py-4">
        <div className="max-w-5xl mx-auto px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-sm font-medium text-[#64748B] hidden sm:block">
            Report generated successfully.
          </div>
          <div className="flex w-full sm:w-auto items-center gap-4">
            <Link href="/home" className="flex-1 sm:flex-none">
              <Button className="w-full bg-[#0F766E] hover:bg-[#005C55] text-white shadow-md gap-2 rounded-lg">
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
