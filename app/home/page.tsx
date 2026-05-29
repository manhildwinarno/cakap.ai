import { PrivateNavbar } from "@/components/private-navbar";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Lightbulb, ChevronDown } from "lucide-react";
import Link from "next/link";

export default function HomeDashboard() {
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

              {/* Target Role/Topic Area */}
              <div className="space-y-2">
                <label htmlFor="topic-input" className="block text-sm font-semibold text-[#0F172A] tracking-wide">
                  Target Role or Topic
                </label>
                <Textarea 
                  id="topic-input"
                  placeholder="Paste your Job Description or interview topic here..." 
                  className="min-h-[120px] resize-none border-[#BDC9C6] focus-visible:ring-[#0F766E] text-base p-4 rounded-lg bg-white"
                />
              </div>

              {/* Toggles Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Language Selection */}
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-[#0F172A] tracking-wide">Language</label>
                  <div className="flex bg-[#EAEDFF] rounded-lg p-1">
                    <button className="flex-1 py-2 text-center rounded-md bg-white shadow-sm text-sm font-medium text-[#0F172A] transition-all">
                      English
                    </button>
                    <button className="flex-1 py-2 text-center rounded-md hover:bg-[#E2E7FF] text-sm text-[#3E4947] transition-all">
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
                      className="w-full appearance-none rounded-lg border border-[#BDC9C6] bg-white px-4 py-[10px] text-base text-[#0F172A] focus:outline-none focus:border-[#0F766E] focus:ring-1 focus:ring-[#0F766E] pr-10"
                    >
                      <option>Strict HR</option>
                      <option>Technical</option>
                      <option>Casual</option>
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-[#6E7977]">
                      <ChevronDown size={18} />
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <div className="pt-4 mt-2">
                <Link href="/interview">
                  <Button className="w-full bg-[#0F766E] text-white font-semibold text-base py-6 rounded-lg shadow-sm hover:shadow-md hover:-translate-y-[1px] transition-all duration-200">
                    Initialize Mock Interview
                  </Button>
                </Link>
              </div>
            </Card>

            {/* Recent Configurations */}
            <div className="mt-4">
              <h2 className="text-xs font-semibold text-[#6E7977] mb-3 uppercase tracking-wider">Recent Configurations</h2>
              <div className="flex flex-wrap gap-2">
                {['Frontend Developer', 'Product Manager', 'Data Analyst'].map((role) => (
                  <button key={role} className="px-4 py-2 rounded-full border border-[#BDC9C6] bg-white text-[#3E4947] text-sm hover:bg-[#F1F5F9] transition-colors duration-200">
                    {role}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column (35%) */}
          <div className="w-full lg:w-[35%] flex flex-col gap-6 mt-2 lg:mt-[52px]">
            {/* Weekly Progress Card */}
            <Card className="bg-white rounded-2xl shadow-sm border border-[#E2E8F0] p-8 flex flex-col items-center justify-center text-center hover:shadow-md transition-shadow duration-300">
              <h3 className="text-sm font-semibold text-[#0F172A] mb-6">Weekly Progress</h3>
              <div className="relative w-32 h-32 flex items-center justify-center mb-6">
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                  <circle className="text-[#EAEDFF]" strokeWidth="8" stroke="currentColor" fill="none" r="40" cx="50" cy="50" />
                  <circle 
                    className="text-[#0F766E]" 
                    strokeWidth="8" 
                    strokeDasharray="251.2" 
                    strokeDashoffset="100.48" 
                    strokeLinecap="round" 
                    stroke="currentColor" 
                    fill="none" 
                    r="40" 
                    cx="50" 
                    cy="50" 
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-4xl font-bold text-[#0F172A]">3/5</span>
                </div>
              </div>
              <p className="text-sm text-[#3E4947]">Interviews Completed This Week</p>
            </Card>

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

      {/* Auth Footer */}
      <footer className="w-full bg-white mt-auto border-t border-[#E2E8F0]">
        <div className="flex flex-col md:flex-row justify-between items-center py-6 px-8 max-w-[1280px] mx-auto gap-4 md:gap-0">
          <div className="font-bold text-[#0F766E] text-lg">Cakap.AI</div>
          <div className="flex gap-6">
            <Link href="#" className="text-[#3E4947] text-sm hover:text-[#0F766E] transition-all">Privacy Policy</Link>
            <Link href="#" className="text-[#3E4947] text-sm hover:text-[#0F766E] transition-all">Terms of Service</Link>
            <Link href="#" className="text-[#3E4947] text-sm hover:text-[#0F766E] transition-all">Help Center</Link>
          </div>
          <div className="text-[#3E4947] text-sm">© 2024 Cakap.AI Professional Coaching</div>
        </div>
      </footer>
    </div>
  );
}
