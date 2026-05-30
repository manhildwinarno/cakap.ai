"use client";

import Image from "next/image";
import { PublicNavbar } from "@/components/public-navbar";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { ClipboardList, Mic, LineChart, MapPin, Target, Zap, Trophy, User, LockKeyhole } from "lucide-react";
import Link from "next/link";
import { signIn } from "next-auth/react";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col font-sans text-[#0F172A]">
      <PublicNavbar />

      <main className="flex-grow pt-32 pb-24 px-6 lg:px-8 max-w-[1280px] mx-auto w-full">
        {/* Hero Section */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center mb-32">
          {/* Left: Copy & Input */}
          <div className="flex flex-col gap-6">
            <h1 className="text-5xl lg:text-6xl font-bold leading-tight tracking-tight text-[#0F172A]">
              Master Your Next <br className="hidden lg:block" />
              Interview with AI
            </h1>
            <p className="text-lg text-[#3E4947] max-w-lg">
              Paste your job description, practice in a safe environment, and get structured, actionable feedback instantly.
            </p>

            <Card className="p-4 mt-4 shadow-md border-0 bg-white rounded-xl">
              <Textarea 
                placeholder="Paste Job Description or Presentation Topic here..." 
                className="min-h-[120px] resize-none border-[#BDC9C6] focus-visible:ring-[#0F766E] text-base p-4 rounded-lg bg-white"
              />
              <div className="flex justify-between items-center mt-4 pt-2 border-t border-[#F1F5F9]">
                <div className="flex items-center gap-2 text-xs text-[#6E7977]">
                  <LockKeyhole size={17} strokeWidth={1.5}/>
                  Secure & Private
                </div>
                <Button 
                  className="bg-[#0F766E] text-white hover:bg-[#005C55] rounded-lg px-6 shadow-sm transition-all hover:-translate-y-0.5"
                  onClick={() => signIn("google", { callbackUrl: "/home" })}
                >
                  Start Simulation <span className="ml-2">→</span>
                </Button>
              </div>
            </Card>

            {/* Social Proof */}
            <div className="flex items-center gap-4 mt-8">
              <div className="flex -space-x-2">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="w-8 h-8 rounded-full bg-[#E2E8F0] border-2 border-white flex items-center justify-center text-[#64748B]">
                    <User size={15} className="text-[#0F766E]"/>
                  </div>
                ))}
              </div>
              <p className="text-sm text-[#6E7977]">
                Trusted by 10,000+ professionals preparing for high-stakes interviews.
              </p>
            </div>
          </div>

          {/* Right: Hero Image */}
          <div className="relative flex justify-center lg:justify-end">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(15,118,110,0.1)_0%,transparent_70%)] -z-10" />
            <Image
              src="/assets/hero-mockup.webp"
              alt="Cakap.AI Interview Readiness Score"
              width={600}
              height={600}
              className="object-contain drop-shadow-2xl hover:-translate-y-2 transition-transform duration-700"
              priority
            />
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-24 mb-16 rounded-3xl bg-[#F1F5F9] px-8 lg:px-16 -mx-6 lg:-mx-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-[#0F172A]">Three Steps to Confidence</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="bg-white p-8 rounded-xl border-0 shadow-sm hover:shadow-md transition-shadow duration-300 text-center flex flex-col items-center gap-4">
              <div className="w-16 h-16 rounded-2xl bg-[#EAEDFF] flex items-center justify-center text-[#0F766E] mb-2">
                <ClipboardList size={32} strokeWidth={1.5} />
              </div>
              <h3 className="text-sm font-bold text-[#0F766E] uppercase tracking-wider">Step 1</h3>
              <h4 className="text-xl font-bold text-[#0F172A]">Set the Context</h4>
              <p className="text-[#3E4947]">Input the specific job description or topic you want to prepare for.</p>
            </Card>

            <Card className="bg-white p-8 rounded-xl border-0 shadow-sm hover:shadow-md transition-shadow duration-300 text-center flex flex-col items-center gap-4">
              <div className="w-16 h-16 rounded-2xl bg-[#EAEDFF] flex items-center justify-center text-[#0F766E] mb-2">
                <Mic size={32} strokeWidth={1.5} />
              </div>
              <h3 className="text-sm font-bold text-[#0F766E] uppercase tracking-wider">Step 2</h3>
              <h4 className="text-xl font-bold text-[#0F172A]">Practice Live</h4>
              <p className="text-[#3E4947]">Engage in a dynamic, AI-driven mock interview tailored to your role.</p>
            </Card>

            <Card className="bg-white p-8 rounded-xl border-0 shadow-sm hover:shadow-md transition-shadow duration-300 text-center flex flex-col items-center gap-4">
              <div className="w-16 h-16 rounded-2xl bg-[#EAEDFF] flex items-center justify-center text-[#0F766E] mb-2">
                <LineChart size={32} strokeWidth={1.5} />
              </div>
              <h3 className="text-sm font-bold text-[#0F766E] uppercase tracking-wider">Step 3</h3>
              <h4 className="text-xl font-bold text-[#0F172A]">Get Feedback</h4>
              <p className="text-[#3E4947]">Receive a detailed readiness score and actionable tips to improve your answers.</p>
            </Card>
          </div>
        </section>

        {/* Methodology Section */}
        <section id="methodology" className="py-16">
          <div className="text-center mb-16 max-w-2xl mx-auto">
            <h2 className="text-3xl lg:text-4xl font-bold text-[#0F172A] mb-4">Master the S.T.A.R. Framework</h2>
            <p className="text-[#3E4947] text-lg">
              Our Gemini-powered AI evaluates your interview responses based on this industry-standard structure to ensure maximum impact.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            <Card className="bg-white p-8 rounded-xl border border-[#E2E8F0] shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1">
              <div className="w-12 h-12 rounded-lg bg-[#F0FDFA] text-[#0F766E] flex items-center justify-center mb-6">
                <MapPin size={24} />
              </div>
              <h3 className="text-2xl font-bold text-[#0F172A] mb-3">S - Situation</h3>
              <p className="text-[#3E4947]">Set the scene and provide the necessary context of your challenge.</p>
            </Card>

            <Card className="bg-white p-8 rounded-xl border border-[#E2E8F0] shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1">
              <div className="w-12 h-12 rounded-lg bg-[#F0FDFA] text-[#0F766E] flex items-center justify-center mb-6">
                <Target size={24} />
              </div>
              <h3 className="text-2xl font-bold text-[#0F172A] mb-3">T - Task</h3>
              <p className="text-[#3E4947]">Describe your specific responsibility and the objective you needed to achieve.</p>
            </Card>

            <Card className="bg-white p-8 rounded-xl border border-[#E2E8F0] shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1">
              <div className="w-12 h-12 rounded-lg bg-[#F0FDFA] text-[#0F766E] flex items-center justify-center mb-6">
                <Zap size={24} />
              </div>
              <h3 className="text-2xl font-bold text-[#0F172A] mb-3">A - Action</h3>
              <p className="text-[#3E4947]">Explain the exact, detailed steps you took to address the task.</p>
            </Card>

            <Card className="bg-white p-8 rounded-xl border border-[#E2E8F0] shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1">
              <div className="w-12 h-12 rounded-lg bg-[#F0FDFA] text-[#0F766E] flex items-center justify-center mb-6">
                <Trophy size={24} />
              </div>
              <h3 className="text-2xl font-bold text-[#0F172A] mb-3">R - Result</h3>
              <p className="text-[#3E4947]">Share the quantifiable outcomes and the impact of your actions.</p>
            </Card>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-[#E2E8F0] py-12 mt-auto">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-[#0F766E] font-bold text-xl">Cakap.AI</div>
          <div className="flex gap-8 text-sm text-[#3E4947]">
            <Link href="#" className="hover:text-[#0F766E]">Privacy Policy</Link>
            <Link href="#" className="hover:text-[#0F766E]">Terms of Service</Link>
            <Link href="#" className="hover:text-[#0F766E]">Help Center</Link>
          </div>
          <div className="text-sm text-[#6E7977]">© 2024 Cakap.AI Professional Coaching</div>
        </div>
      </footer>
    </div>
  );
}
