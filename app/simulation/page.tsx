"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mic, Keyboard, Send, X, Target, Info } from "lucide-react";
import Link from "next/link";

// Dummy Data for the simulation
const chatHistory = [
  { 
    id: 1, 
    role: 'ai', 
    text: 'Welcome! I see you are preparing for a Frontend Web Developer role. Could you start by telling me about a time you had to optimize the performance of a complex web application?', 
    type: 'Behavioral' 
  },
  { 
    id: 2, 
    role: 'user', 
    text: 'Sure! In my last project, we had a dashboard that was taking over 5 seconds to load because it was fetching and rendering too much data at once. It was a React application and we had a lot of nested components that were re-rendering unnecessarily.' 
  },
  { 
    id: 3, 
    role: 'ai', 
    text: 'That sounds like a very common and challenging scenario. How did you specifically diagnose the rendering bottleneck, and what precise steps or tools did you use to resolve it?', 
    type: 'Technical Insight' 
  },
];

export default function SimulationRoom() {
  const [inputMode, setInputMode] = useState<'voice' | 'text'>('voice');

  return (
    <div className="h-dvh w-full flex bg-[#F8FAFC] font-sans overflow-hidden">
      
      {/* ── Left Sidebar (25%) ── */}
      <aside className="hidden lg:flex w-1/4 min-w-[280px] max-w-[350px] bg-white border-r border-[#E2E8F0] flex-col justify-between shadow-sm z-10 relative">
        
        {/* Top Section */}
        <div className="p-6">
          <div className="text-2xl font-bold text-[#0F766E] tracking-tight mb-8">
            Cakap.AI
          </div>
          
          <div className="bg-[#F8FAFC] rounded-xl p-4 border border-[#E2E8F0]">
            <div className="text-xs font-bold text-[#64748B] uppercase tracking-wider mb-1 flex items-center gap-1.5">
              <Target size={14} /> Current Session
            </div>
            <div className="font-semibold text-[#0F172A]">Frontend Web Developer</div>
            <div className="text-sm text-[#64748B] mt-1">Mock Interview</div>
          </div>
        </div>

        {/* Middle Section (Progress) */}
        <div className="flex-grow flex flex-col items-center justify-center p-6">
          {/* Circular Progress SVG */}
          <div className="relative w-48 h-48 flex items-center justify-center mb-6">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
              {/* Background Track */}
              <circle cx="50" cy="50" r="45" fill="none" stroke="#F1F5F9" strokeWidth="8" />
              {/* Active Progress (2/5 = 40% of circumference 283 = ~113 length) */}
              <circle 
                cx="50" cy="50" r="45" 
                fill="none" 
                stroke="#0F766E" 
                strokeWidth="8" 
                strokeDasharray="283" 
                strokeDashoffset="170" 
                strokeLinecap="round" 
                className="transition-all duration-1000 ease-out"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
              <span className="text-4xl font-bold text-[#0F172A] tracking-tighter">
                2<span className="text-[#64748B] text-2xl font-medium">/5</span>
              </span>
              <span className="text-[10px] text-[#64748B] uppercase tracking-widest font-bold mt-1">Question</span>
            </div>
          </div>
          
          {/* Timer */}
          <div className="text-3xl font-mono font-medium text-[#3E4947] tabular-nums tracking-tight">
            04:30
          </div>
          <div className="text-xs text-[#64748B] uppercase tracking-wider mt-1 font-semibold">
            Elapsed Time
          </div>
        </div>

        {/* Bottom Section */}
        <div className="p-6 border-t border-[#F1F5F9]">
          <Link href="/home">
            <Button variant="ghost" className="w-full text-[#64748B] hover:text-[#BA1A1A] hover:bg-[#FFDAD6]/30 flex items-center justify-center gap-2">
              <X size={18} />
              End Session Early
            </Button>
          </Link>
        </div>
      </aside>

      {/* ── Main Chat Area (75%) ── */}
      <main className="flex-grow h-full flex flex-col relative">
        
        {/* Scrollable Chat Feed */}
        <div className="flex-grow overflow-y-auto px-4 md:px-12 py-12 pb-40">
          <div className="w-full max-w-2xl mx-auto flex flex-col gap-8">
            {chatHistory.map((msg, index) => {
              const isAI = msg.role === 'ai';
              return (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.2, ease: [0.16, 1, 0.3, 1] }}
                  className={`flex flex-col ${isAI ? 'items-start' : 'items-end'}`}
                >
                  {isAI && msg.type && (
                    <div className="mb-2 ml-4 bg-white/60 backdrop-blur-sm px-3 py-1 rounded-full border border-[#0F766E]/20 text-[11px] font-bold text-[#0F766E] uppercase tracking-wider flex items-center gap-1.5 shadow-sm">
                      <Info size={12} /> {msg.type}
                    </div>
                  )}
                  
                  <div 
                    className={`
                      relative max-w-[85%] sm:max-w-[75%] px-6 py-4 rounded-3xl shadow-sm text-[15px] leading-relaxed
                      ${isAI 
                        ? 'bg-[#F0FDFA] text-[#0F172A] rounded-tl-sm border border-[#0F766E]/10' 
                        : 'bg-white text-[#0F172A] rounded-tr-sm border border-[#E2E8F0]'}
                    `}
                  >
                    {msg.text}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Floating Input Dock */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 w-[90%] max-w-lg z-20">
          <div className="bg-white/85 backdrop-blur-xl rounded-full shadow-[0_8px_30px_rgb(0,0,0,0.08)] border border-white/50 p-2 flex items-center transition-all duration-300">
            
            {inputMode === 'voice' ? (
              <div className="flex items-center w-full justify-between px-2 h-12">
                <div className="flex items-center gap-4">
                  <div className="relative flex items-center justify-center">
                    <motion.div 
                      className="absolute w-full h-full rounded-full bg-[#0F766E]/20"
                      animate={{ scale: [1, 1.5, 1], opacity: [0.8, 0, 0.8] }}
                      transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    />
                    <Button size="icon" className="w-12 h-12 rounded-full bg-[#0F766E] hover:bg-[#005C55] text-white shadow-md relative z-10 border-2 border-white/20">
                      <Mic size={20} />
                    </Button>
                  </div>
                  <motion.span 
                    className="text-[15px] font-medium text-[#3E4947]"
                    animate={{ opacity: [1, 0.5, 1] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                  >
                    Listening... Speak clearly
                  </motion.span>
                </div>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="text-[#64748B] hover:text-[#0F766E] hover:bg-[#F0FDFA] rounded-full w-10 h-10" 
                  onClick={() => setInputMode('text')}
                  title="Switch to typing"
                >
                  <Keyboard size={20} />
                </Button>
              </div>
            ) : (
              <div className="flex items-center w-full gap-2 px-2 h-12">
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="text-[#64748B] hover:text-[#0F766E] hover:bg-[#F0FDFA] rounded-full w-10 h-10 shrink-0" 
                  onClick={() => setInputMode('voice')}
                  title="Switch to voice"
                >
                  <Mic size={20} />
                </Button>
                <Input 
                  autoFocus
                  placeholder="Type your answer..." 
                  className="flex-grow border-0 focus-visible:ring-0 bg-transparent text-[15px] shadow-none px-0 placeholder:text-[#64748B]" 
                />
                <Button 
                  size="icon" 
                  className="w-10 h-10 rounded-full bg-[#0F766E] hover:bg-[#005C55] text-white shadow-md shrink-0"
                >
                  <Send size={18} />
                </Button>
              </div>
            )}
            
          </div>
        </div>

      </main>
      
    </div>
  );
}
