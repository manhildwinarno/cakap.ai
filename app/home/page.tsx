"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { PrivateNavbar } from "@/components/private-navbar";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Lightbulb, ChevronDown } from "lucide-react";
import Link from "next/link";

export default function HomeDashboard() {
  const router = useRouter();
  const [jobDescription, setJobDescription] = useState("");
  const [targetRole, setTargetRole] = useState("");
  const [language, setLanguage] = useState("en");
  const [interviewStyle, setInterviewStyle] = useState("strict_hr");
  const [isInitializing, setIsInitializing] = useState(false);

  const handleInitialize = async () => {
    if (!jobDescription.trim() || !targetRole.trim()) return;
    setIsInitializing(true);
    
    try {
      const response = await fetch("/api/session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          jobDescription,
          targetRole,
          language,
          interviewStyle,
          totalQuestions: 5,
        }),
      });
      
      const data = await response.json();
      if (data.sessionId) {
        router.push(`/simulation?sessionId=${data.sessionId}`);
      } else {
        console.error("No sessionId returned");
        setIsInitializing(false);
      }
    } catch (error) {
      console.error(error);
      setIsInitializing(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col font-sans text-[#0F172A]">
      <PrivateNavbar />

      <main className="flex-grow pt-28 pb-16 px-6 lg:px-8 max-w-[1280px] mx-auto w-full">
        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Left Column (65%) */}
          <div className="w-full lg:w-[65%] flex flex-col gap-8">
            <div>
              <h1 className="text-3xl font-bold text-[#0F172A]">Welcome back, Ready to practice?</h1>
            </div>

            {/* Setup Card */}
            <Card className="bg-white rounded-2xl shadow-sm border border-[#E2E8F0] p-8 flex flex-col gap-6 hover:shadow-md transition-shadow duration-300">
              <h2 className="text-2xl font-bold text-[#0F172A]">Setup New Interview</h2>

              {/* Target Role Area */}
              <div className="space-y-2">
                <label htmlFor="role-input" className="block text-sm font-semibold text-[#0F172A] tracking-wide">
                  Target Role
                </label>
                <Input 
                  id="role-input"
                  placeholder="e.g. Frontend Web Developer" 
                  value={targetRole}
                  onChange={(e) => setTargetRole(e.target.value)}
                  className="border-[#BDC9C6] focus-visible:ring-[#0F766E] text-base p-4 rounded-lg bg-white h-auto"
                />
              </div>

              {/* Job Description Area */}
              <div className="space-y-2">
                <label htmlFor="topic-input" className="block text-sm font-semibold text-[#0F172A] tracking-wide">
                  Job Description / Topic Details
                </label>
                <Textarea 
                  id="topic-input"
                  placeholder="Paste your Job Description or interview topic here..." 
                  value={jobDescription}
                  onChange={(e) => setJobDescription(e.target.value)}
                  className="min-h-[120px] resize-none border-[#BDC9C6] focus-visible:ring-[#0F766E] text-base p-4 rounded-lg bg-white"
                />
              </div>

              {/* Toggles Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Language Selection */}
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-[#0F172A] tracking-wide">Language</label>
                  <div className="flex bg-[#EAEDFF] rounded-lg p-1">
                    <button 
                      onClick={() => setLanguage("en")}
                      className={`flex-1 py-2 text-center rounded-md shadow-sm text-sm font-medium transition-all ${language === 'en' ? 'bg-white text-[#0F172A]' : 'hover:bg-[#E2E7FF] text-[#3E4947]'}`}
                    >
                      English
                    </button>
                    <button 
                      onClick={() => setLanguage("id")}
                      className={`flex-1 py-2 text-center rounded-md shadow-sm text-sm font-medium transition-all ${language === 'id' ? 'bg-white text-[#0F172A]' : 'hover:bg-[#E2E7FF] text-[#3E4947]'}`}
                    >
                      Bahasa Indonesia
                    </button>
                  </div>
                </div>

                {/* Interview Style Selection */}
                <div className="space-y-2">
                  <label htmlFor="style-select" className="block text-sm font-semibold text-[#0F172A] tracking-wide">
                    Interview Style
                  </label>
                  <div className="relative">
                    <select 
                      id="style-select"
                      value={interviewStyle}
                      onChange={(e) => setInterviewStyle(e.target.value)}
                      className="w-full appearance-none rounded-lg border border-[#BDC9C6] bg-white px-4 py-[10px] text-base text-[#0F172A] focus:outline-none focus:border-[#0F766E] focus:ring-1 focus:ring-[#0F766E] pr-10"
                    >
                      <option value="strict_hr">Strict HR</option>
                      <option value="technical">Technical</option>
                      <option value="casual">Casual</option>
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-[#6E7977]">
                      <ChevronDown size={18} />
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <div className="pt-4 mt-2">
                {(!jobDescription.trim() || !targetRole.trim()) && (
                  <p className="text-xs text-[#BA1A1A] mb-3 text-center opacity-80 font-medium">
                    * Please enter a Target Role and Job Description to begin.
                  </p>
                )}
                <Button 
                  onClick={handleInitialize} 
                  disabled={isInitializing || !jobDescription.trim() || !targetRole.trim()}
                  className="w-full bg-[#0F766E] text-white font-semibold text-base py-6 rounded-lg shadow-sm hover:shadow-md hover:-translate-y-[1px] transition-all duration-200 disabled:opacity-70 disabled:hover:translate-y-0"
                >
                  {isInitializing ? "Initializing..." : "Initialize Mock Interview"}
                </Button>
              </div>
            </Card>
          </div>

          {/* Right Column (35%) */}
          <div className="w-full lg:w-[35%] flex flex-col gap-6 mt-2 lg:mt-[52px]">
            {/* Pro Tip Card */}
            <Card className="bg-[#F0FDFA] rounded-2xl shadow-sm border border-[#80D5CB]/40 p-6 hover:shadow-md transition-shadow duration-300">
              <div className="flex items-start gap-4">
                <Lightbulb className="text-[#0F766E] shrink-0 mt-0.5" size={24} />
                <p className="text-sm text-[#0F172A] leading-relaxed">
                  <span className="font-semibold">Tip:</span> Always use the STAR method when answering behavioral questions to maximize your AI readiness score.
                </p>
              </div>
            </Card>
          </div>

        </div>
      </main>
    </div>
  );
}
