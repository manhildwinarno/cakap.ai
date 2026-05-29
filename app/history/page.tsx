"use client";

import { PrivateNavbar } from "@/components/private-navbar";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  Search,
  Calendar,
  ArrowRight,
  TrendingUp,
  Folder,
  ChevronDown,
} from "lucide-react";

// ── Types ──
interface SessionData {
  id: string;
  role: string;
  language: "EN" | "ID";
  duration: string;
  score: number;
  date: string;
  questionsCount: number;
}

// ── Mock Data ──
const mockSessions: SessionData[] = [
  {
    id: "s1",
    role: "Frontend Web Developer",
    language: "EN",
    duration: "15 mins",
    score: 85,
    date: "Oct 24, 2024",
    questionsCount: 5,
  },
  {
    id: "s2",
    role: "Product Manager",
    language: "EN",
    duration: "20 mins",
    score: 72,
    date: "Oct 20, 2024",
    questionsCount: 5,
  },
  {
    id: "s3",
    role: "Data Analyst",
    language: "ID",
    duration: "12 mins",
    score: 64,
    date: "Oct 15, 2024",
    questionsCount: 5,
  },
  {
    id: "s4",
    role: "Backend Engineer",
    language: "EN",
    duration: "18 mins",
    score: 91,
    date: "Oct 10, 2024",
    questionsCount: 5,
  },
  {
    id: "s5",
    role: "UX Designer",
    language: "ID",
    duration: "14 mins",
    score: 78,
    date: "Oct 5, 2024",
    questionsCount: 5,
  },
  {
    id: "s6",
    role: "DevOps Engineer",
    language: "EN",
    duration: "22 mins",
    score: 55,
    date: "Sep 28, 2024",
    questionsCount: 5,
  },
];

// ── Helpers ──
function getScoreStyle(score: number) {
  if (score >= 80)
    return {
      bg: "bg-[#F0FDF4]",
      text: "text-[#15803D]",
      border: "border-[#BBF7D0]",
    };
  if (score >= 70)
    return {
      bg: "bg-[#F0FDFA]",
      text: "text-[#0F766E]",
      border: "border-[#CCFBF1]",
    };
  return {
    bg: "bg-[#FFFBEB]",
    text: "text-[#D97706]",
    border: "border-[#FEF3C7]",
  };
}

// ── Animation Variants ──
const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] as const },
  },
};

export default function HistoryDashboard() {
  return (
    <div className="min-h-screen bg-[#F8FAFC] font-sans text-[#0F172A] relative overflow-hidden">
      <PrivateNavbar activeTab="history" />

      {/* Decorative background icon */}
      <div className="absolute bottom-0 right-0 pointer-events-none select-none">
        <Folder
          size={400}
          className="text-[#0F172A] opacity-[0.02] translate-x-16 translate-y-16"
          strokeWidth={0.5}
        />
      </div>

      <main className="pt-28 pb-16 px-6 lg:px-8 max-w-6xl mx-auto w-full relative z-10">
        {/* ── Header Section ── */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-10">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-[#0F172A]">
              Interview History
            </h1>
            <p className="text-[#64748B] mt-1 text-sm">
              Review your past sessions and track your improvement over time.
            </p>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3 w-full md:w-auto">
            {/* Search */}
            <div className="relative flex-grow md:flex-grow-0 md:w-64">
              <Search
                size={16}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-[#94A3B8]"
              />
              <Input
                placeholder="Search by role..."
                className="pl-9 h-10 border-[#E2E8F0] bg-white focus-visible:ring-[#0F766E] rounded-lg text-sm"
              />
            </div>

            {/* Filter */}
            <Button
              variant="outline"
              className="h-10 border-[#E2E8F0] text-[#3E4947] hover:bg-white gap-2 rounded-lg text-sm shrink-0"
            >
              <Calendar size={14} />
              <span className="hidden sm:inline">Filter by:</span> Date
              <ChevronDown size={14} className="text-[#94A3B8]" />
            </Button>
          </div>
        </div>

        {/* ── Session Grid ── */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {mockSessions.map((session) => {
            const style = getScoreStyle(session.score);

            return (
              <motion.div key={session.id} variants={cardVariants}>
                <Card className="group overflow-hidden bg-white border border-[#E2E8F0] shadow-sm hover:shadow-lg rounded-xl transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between h-full">
                  {/* Card Body */}
                  <div className="p-5 flex flex-col gap-4 flex-grow">
                    {/* Top Row */}
                    <div className="flex items-start justify-between gap-3">
                      {/* Left: Role & Badges */}
                      <div className="flex-grow min-w-0">
                        <h3 className="font-semibold text-[#0F172A] text-[15px] leading-snug truncate">
                          {session.role}
                        </h3>
                        <div className="flex items-center gap-2 mt-2">
                          <Badge
                            variant="secondary"
                            className="bg-[#F1F5F9] text-[#64748B] border-0 text-[11px] font-semibold px-2 py-0.5 h-auto"
                          >
                            {session.language}
                          </Badge>
                          <Badge
                            variant="secondary"
                            className="bg-[#F1F5F9] text-[#64748B] border-0 text-[11px] font-semibold px-2 py-0.5 h-auto"
                          >
                            {session.duration}
                          </Badge>
                        </div>
                      </div>

                      {/* Right: Score Badge & Trend */}
                      <div className="flex flex-col items-end gap-1.5 shrink-0">
                        <span
                          className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold ${style.bg} ${style.text} border ${style.border}`}
                        >
                          {session.score}%
                        </span>
                        <TrendingUp
                          size={16}
                          className={`${style.text} opacity-60`}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Card Footer */}
                  <div className="px-5 py-3.5 border-t border-[#F1F5F9] flex items-center justify-between bg-[#FAFBFC]">
                    <div className="flex items-center gap-1.5 text-[#94A3B8] text-xs">
                      <Calendar size={13} />
                      <span>{session.date}</span>
                    </div>
                    <Link
                      href="/results"
                      className="flex items-center gap-1 text-xs font-semibold text-[#0F766E] hover:text-[#005C55] transition-colors"
                    >
                      View Full Report
                      <ArrowRight
                        size={14}
                        className="transition-transform duration-200 group-hover:translate-x-0.5"
                      />
                    </Link>
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </motion.div>
      </main>
    </div>
  );
}
