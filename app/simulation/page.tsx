"use client";

import { useState, useEffect, useRef, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mic, Keyboard, Send, X, Target, Info, Volume2, VolumeX, RefreshCcw, Square } from "lucide-react";
import Link from "next/link";
import type { ChatMessage } from "@/types/interview";
import { toast } from "sonner";
import { useLanguage } from "@/components/language-provider";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

export default function SimulationRoom() {
  return (
    <Suspense fallback={
      <div className="h-dvh w-full flex bg-[#F8FAFC] dark:bg-[#020617] font-sans items-center justify-center">
        <div className="text-xl text-[#0F766E] dark:text-[#14B8A6] font-medium animate-pulse">Loading simulation room...</div>
      </div>
    }>
      <SimulationRoomContent />
    </Suspense>
  );
}

function SimulationRoomContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { t } = useLanguage();
  const sessionId = searchParams?.get("sessionId") || "";

  const [inputMode, setInputMode] = useState<'voice' | 'text'>('text');
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isAiThinking, setIsAiThinking] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(1);
  const [inputValue, setInputValue] = useState("");
  const [isMuted, setIsMuted] = useState(false);
  const [retryFailedMessage, setRetryFailedMessage] = useState(false);
  
  const [sessionMeta, setSessionMeta] = useState<any>(null);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);

  const scrollRef = useRef<HTMLDivElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const hasInitialized = useRef(false);
  const recognitionRef = useRef<any>(null);

  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (messages.length > 1) {
        e.preventDefault();
        e.returnValue = '';
      }
    };
    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [messages.length]);

  useEffect(() => {
    if (!sessionId || hasInitialized.current) {
      if (!sessionId) router.push("/home");
      return;
    }

    hasInitialized.current = true;

    const loadSessionAndStart = async () => {
      const storedData = sessionStorage.getItem('interview_state_' + sessionId);
      if (storedData) {
        try {
          const parsed = JSON.parse(storedData);
          if (parsed.messages && parsed.messages.length > 0) {
            setMessages(parsed.messages);
            if (parsed.currentQuestion) setCurrentQuestion(parsed.currentQuestion);
            return;
          }
        } catch (e) {
          console.error("Failed to parse session storage", e);
        }
      }

      setIsAiThinking(true);
      try {
        const response = await fetch("/api/interview", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            sessionId,
            jobDescription: "Fetched by server", 
            targetRole: "Fetched by server",
            interviewStyle: "strict_hr",
            language: "en",
            chatHistory: [{ id: "init", role: "user", content: "START_INTERVIEW", timestamp: new Date().toISOString() }],
            currentQuestion: 1,
            totalQuestions: 5,
          }),
        });

        const data = await response.json();
        
        if (data.error === "INVALID_CONTEXT") {
          toast.error(t('errors.invalidContextTitle'), {
            description: t('errors.invalidContextDesc'),
          });
          router.push("/home");
          return;
        }

        if (!response.ok) {
          throw new Error(data.error || "Failed to fetch first question");
        }
        
        if (data.next_question) {
          setMessages([
            {
              id: crypto.randomUUID(),
              role: "ai",
              content: data.next_question,
              questionType: data.question_type || "Introduction",
              questionNumber: 1,
              timestamp: new Date().toISOString()
            }
          ]);
        } else {
          toast.error(t('errors.rateLimitTitle'), {
            description: t('errors.rateLimitDesc'),
          });
        }
      } catch (error) {
        console.error(error);
        toast.error(t('errors.rateLimitTitle'), {
          description: t('errors.rateLimitDesc'),
        });
      } finally {
        setIsAiThinking(false);
      }
    };

    loadSessionAndStart();
  }, [sessionId, router]);

  useEffect(() => {
    if (!sessionId) return;
    
    let startTime = sessionStorage.getItem('interviewStartTime_' + sessionId);
    if (!startTime) {
      startTime = Date.now().toString();
      sessionStorage.setItem('interviewStartTime_' + sessionId, startTime);
    }
    
    const startMs = parseInt(startTime, 10);
    const timer = setInterval(() => {
      setElapsedSeconds(Math.floor((Date.now() - startMs) / 1000));
    }, 1000);
    
    return () => clearInterval(timer);
  }, [sessionId]);

  useEffect(() => {
    return () => {
      if (typeof window !== 'undefined' && window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isAiThinking, retryFailedMessage]);

  useEffect(() => {
    if (sessionId && messages.length > 0) {
      sessionStorage.setItem('interview_state_' + sessionId, JSON.stringify({
        messages,
        currentQuestion
      }));
    }
  }, [messages, currentQuestion, sessionId]);

  useEffect(() => {
    if (isMuted && typeof window !== 'undefined' && window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }
  }, [isMuted]);

  const lastSpokenMessageId = useRef<string | null>(null);
  useEffect(() => {
    if (messages.length > 0 && !isMuted) {
      const lastMessage = messages[messages.length - 1];
      if (lastMessage.role === 'ai' && lastMessage.id !== lastSpokenMessageId.current) {
        lastSpokenMessageId.current = lastMessage.id;
        
        if (typeof window !== 'undefined' && window.speechSynthesis) {
          window.speechSynthesis.cancel();
          const utterance = new SpeechSynthesisUtterance(lastMessage.content);
          
          const lang = sessionMeta?.language || "en";
          const targetLang = lang === "id" ? "id" : "en";
          
          let voices = window.speechSynthesis.getVoices();
          let selectedVoice = voices.find(v => v.lang.toLowerCase().includes(targetLang) && (v.name.includes("Google") || v.name.includes("Premium")));
          if (!selectedVoice) selectedVoice = voices.find(v => v.lang.toLowerCase().includes(targetLang));
          
          if (selectedVoice) {
            utterance.voice = selectedVoice;
          }
          
          window.speechSynthesis.speak(utterance);
        }
      }
    }
  }, [messages, isMuted, sessionMeta?.language]);

  const handleSendMessage = async (isRetry = false) => {
    if ((!inputValue.trim() && !isRetry) || isAiThinking) return;

    let updatedMessages = messages;
    if (!isRetry) {
      const userMessage: ChatMessage = {
        id: crypto.randomUUID(),
        role: "user",
        content: inputValue.trim(),
        timestamp: new Date().toISOString(),
      };
      updatedMessages = [...messages, userMessage];
      setMessages(updatedMessages);
      setInputValue("");
    }
    
    setIsAiThinking(true);
    setRetryFailedMessage(false);

    try {
      const response = await fetch("/api/interview", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sessionId,
          jobDescription: "Fetched by server",
          targetRole: "Fetched by server",
          interviewStyle: "strict_hr",
          language: "en",
          chatHistory: updatedMessages,
          currentQuestion,
          totalQuestions: 5,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        if (data.error === "RATE_LIMIT" || response.status === 429) {
          toast.error("Sistem Sibuk", {
            description: "Sistem Sibuk, kuota habis sementara.",
          });
          setRetryFailedMessage(true);
          return;
        }
        throw new Error(data.error || "Failed to process answer");
      }

      if (data.is_final) {
        if (!data.final_evaluation || typeof data.final_evaluation.overall_score === 'undefined') {
          throw new Error("MALFORMED_SCHEMA");
        }
        await fetch("/api/session", {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            sessionId,
            chatHistory: updatedMessages,
            feedbackData: data.final_evaluation,
            score: data.final_evaluation.overall_score,
            status: "completed",
          }),
        });
        sessionStorage.removeItem('interview_state_' + sessionId);
        sessionStorage.removeItem('interviewStartTime_' + sessionId);
        router.push(`/results/${sessionId}`);
      } else {
        if (data.next_question) {
          const aiMessage: ChatMessage = {
            id: crypto.randomUUID(),
            role: "ai",
            content: data.next_question,
            questionType: data.question_type,
            questionNumber: currentQuestion + 1,
            timestamp: new Date().toISOString(),
          };
          setMessages(prev => [...prev, aiMessage]);
          setCurrentQuestion(prev => prev + 1);
        } else {
          toast.error(t('errors.rateLimitTitle'), {
            description: t('errors.rateLimitDesc'),
          });
          setRetryFailedMessage(true);
        }
      }
    } catch (error) {
      console.error("Interview API error:", error);
      toast.error("Sistem Sibuk", {
        description: error instanceof Error && error.message === "MALFORMED_SCHEMA"
          ? "Gagal memproses evaluasi AI. Silakan coba lagi."
          : "Sistem Sibuk, kuota habis sementara.",
      });
      setRetryFailedMessage(true);
    } finally {
      setIsAiThinking(false);
    }
  };

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60).toString().padStart(2, '0');
    const s = (seconds % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  const handleMicClick = () => {
    if (typeof window !== 'undefined') {
      // @ts-ignore
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      if (!SpeechRecognition) {
        toast.error("Speech recognition is not supported in this browser.");
        return;
      }
      
      const recognition = new SpeechRecognition();
      recognitionRef.current = recognition;
      recognition.continuous = true;
      recognition.interimResults = true;
      
      recognition.onstart = () => {
        setInputMode('voice');
      };
      
      recognition.onresult = (event: any) => {
        const transcript = Array.from(event.results)
          .map((result: any) => result[0])
          .map((result: any) => result.transcript)
          .join('');
        setInputValue(transcript);
      };
      
      recognition.onerror = (event: any) => {
        if (event.error === 'no-speech' || event.error === 'aborted') {
          setInputMode('text');
          return;
        }
        console.error("Speech recognition error", event.error);
        setInputMode('text');
        toast.error("Microphone error. Please try again.");
      };
      
      recognition.onend = () => {
        setInputMode('text');
      };
      
      recognition.start();
    }
  };

  const handleEndEarly = async () => {
    sessionStorage.removeItem('interview_state_' + sessionId);
    sessionStorage.removeItem('interviewStartTime_' + sessionId);
    router.push('/home');
  };

  return (
    <div className="h-dvh w-full flex bg-[#F8FAFC] dark:bg-[#020617] font-sans overflow-hidden">
      
      <aside className="hidden lg:flex w-1/4 min-w-[280px] max-w-[350px] bg-white dark:bg-[#0F172A] border-r border-[#E2E8F0] dark:border-[#1E293B] flex-col justify-between shadow-sm z-10 relative">
        <div className="p-6">
          <div className="text-2xl font-bold text-[#0F766E] dark:text-[#14B8A6] tracking-tight mb-8">
            Cakap.AI
          </div>
          <div className="bg-[#F8FAFC] dark:bg-[#020617] rounded-xl p-4 border border-[#E2E8F0] dark:border-[#1E293B]">
            <div className="text-xs font-bold text-[#64748B] dark:text-[#94A3B8] uppercase tracking-wider mb-1 flex items-center gap-1.5">
              <Target size={14} /> Current Session
            </div>
            <div className="font-semibold text-[#0F172A] dark:text-white">Mock Interview</div>
          </div>
        </div>

        <div className="flex-grow flex flex-col items-center justify-center p-6">
          <div className="relative w-48 h-48 flex items-center justify-center mb-6">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="45" fill="none" stroke="#F1F5F9" strokeWidth="8" />
              <circle 
                cx="50" cy="50" r="45" 
                fill="none" 
                stroke="#0F766E" 
                strokeWidth="8" 
                strokeDasharray="283" 
                strokeDashoffset={283 - (283 * Math.min(currentQuestion, 5) / 5)} 
                strokeLinecap="round" 
                className="transition-all duration-1000 ease-out"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
              <span className="text-4xl font-bold text-[#0F172A] dark:text-white tracking-tighter">
                {currentQuestion}<span className="text-[#64748B] dark:text-[#94A3B8] text-2xl font-medium">/5</span>
              </span>
              <span className="text-[10px] text-[#64748B] dark:text-[#94A3B8] uppercase tracking-widest font-bold mt-1">Question</span>
            </div>
          </div>
          
          <div className="text-3xl font-mono font-medium text-[#3E4947] dark:text-[#94A3B8] tabular-nums tracking-tight">
            {formatTime(elapsedSeconds)}
          </div>
          <div className="text-xs text-[#64748B] dark:text-[#94A3B8] uppercase tracking-wider mt-1 font-semibold">
            Elapsed Time
          </div>
        </div>

        <div className="p-6 border-t border-[#F1F5F9] dark:border-[#1E293B]">
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button 
                variant="ghost" 
                className="w-full text-[#64748B] dark:text-[#94A3B8] hover:text-[#BA1A1A] dark:hover:text-[#FF897D] hover:bg-[#FFDAD6]/30 dark:hover:bg-[#93000A]/30 flex items-center justify-center gap-2"
                disabled={isAiThinking}
              >
                <X size={18} />
                {t('alerts.endSessionTitle')}
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>{t('alerts.endSessionTitle')}</AlertDialogTitle>
                <AlertDialogDescription>
                  {t('alerts.endSessionDesc')}
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>{t('alerts.cancel')}</AlertDialogCancel>
                <AlertDialogAction onClick={handleEndEarly} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
                  {t('alerts.end')}
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </aside>

      <main className="flex-grow h-full flex flex-col relative">
        
        <div className="absolute top-6 right-6 z-20">
          <Button 
            variant="outline" 
            size="icon" 
            className="rounded-full bg-white/80 dark:bg-[#020617]/80 backdrop-blur-sm border-[#E2E8F0] dark:border-[#1E293B] text-[#64748B] dark:text-[#94A3B8] hover:text-[#0F766E] dark:hover:text-[#14B8A6] shadow-sm"
            onClick={() => setIsMuted(!isMuted)}
            title={isMuted ? "Unmute AI Voice" : "Mute AI Voice"}
          >
            {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
          </Button>
        </div>

        <div ref={scrollRef} className="flex-grow overflow-y-auto px-4 md:px-12 py-12 pb-40">
          <div className="w-full max-w-2xl mx-auto flex flex-col gap-8">
            {messages.map((msg, index) => {
              const isAI = msg.role === 'ai';
              return (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  className={`flex flex-col ${isAI ? 'items-start' : 'items-end'}`}
                >
                  {isAI && msg.questionType && (
                    <div className="mb-2 ml-4 bg-white/60 dark:bg-[#0F172A]/60 backdrop-blur-sm px-3 py-1 rounded-full border border-[#0F766E]/20 dark:border-[#14B8A6]/20 text-[11px] font-bold text-[#0F766E] dark:text-[#14B8A6] uppercase tracking-wider flex items-center gap-1.5 shadow-sm">
                      <Info size={12} /> {msg.questionType}
                    </div>
                  )}
                  <div 
                    className={`
                      relative max-w-[85%] sm:max-w-[75%] px-6 py-4 rounded-3xl shadow-sm text-[15px] leading-relaxed
                      ${isAI 
                        ? 'bg-[#F0FDFA] dark:bg-[#020617] text-[#0F172A] dark:text-white rounded-tl-sm border border-[#0F766E]/10 dark:border-[#14B8A6]/20' 
                        : 'bg-white dark:bg-[#0F172A] text-[#0F172A] dark:text-white rounded-tr-sm border border-[#E2E8F0] dark:border-[#1E293B]'}
                    `}
                  >
                    {msg.content}
                  </div>
                </motion.div>
              );
            })}
            
            {isAiThinking && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-start"
              >
                <div className="bg-[#F0FDFA] dark:bg-[#020617] rounded-3xl rounded-tl-sm px-6 py-4 border border-[#0F766E]/10 dark:border-[#14B8A6]/20 flex gap-1.5">
                  <motion.span animate={{ opacity: [0.3, 1, 0.3] }} transition={{ duration: 1.2, repeat: Infinity, delay: 0 }}   className="w-2 h-2 rounded-full bg-[#0F766E] dark:bg-[#14B8A6]" />
                  <motion.span animate={{ opacity: [0.3, 1, 0.3] }} transition={{ duration: 1.2, repeat: Infinity, delay: 0.2 }} className="w-2 h-2 rounded-full bg-[#0F766E] dark:bg-[#14B8A6]" />
                  <motion.span animate={{ opacity: [0.3, 1, 0.3] }} transition={{ duration: 1.2, repeat: Infinity, delay: 0.4 }} className="w-2 h-2 rounded-full bg-[#0F766E] dark:bg-[#14B8A6]" />
                </div>
              </motion.div>
            )}

            {retryFailedMessage && !isAiThinking && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-start"
              >
                <Button 
                  onClick={() => handleSendMessage(true)}
                  variant="outline" 
                  size="sm" 
                  className="gap-2 text-destructive border-destructive/20 hover:bg-destructive/10"
                >
                  <RefreshCcw size={14} /> {t('alerts.retryBtn')}
                </Button>
              </motion.div>
            )}

            <div ref={messagesEndRef} />
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 w-[90%] max-w-lg z-20">
          <div className="bg-white/85 dark:bg-[#0F172A]/85 backdrop-blur-xl rounded-full shadow-[0_8px_30px_rgb(0,0,0,0.08)] border border-white/50 dark:border-[#1E293B]/50 p-2 flex items-center transition-all duration-300">
            {inputMode === 'voice' ? (
              <div className="flex items-center w-full justify-between px-2 h-12">
                <div className="flex items-center gap-4">
                  <div className="relative flex items-center justify-center">
                    <motion.div 
                      className="absolute w-full h-full rounded-full bg-[#0F766E]/20 dark:bg-[#14B8A6]/20"
                      animate={{ scale: [1, 1.5, 1], opacity: [0.8, 0, 0.8] }}
                      transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    />
                    <Button 
                      size="icon" 
                      className="w-12 h-12 rounded-full bg-red-500 hover:bg-red-600 text-white shadow-md relative z-10 border-2 border-white/20 dark:border-black/20 animate-pulse"
                      onClick={() => {
                        if (recognitionRef.current) {
                          recognitionRef.current.stop();
                        }
                        setInputMode('text');
                      }}
                      title={t('tooltips.stopMic')}
                    >
                      <Square size={16} fill="currentColor" />
                    </Button>
                  </div>
                  <motion.span 
                    className="text-[15px] font-medium text-[#3E4947] dark:text-[#CBD5E1]"
                    animate={{ opacity: [1, 0.5, 1] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                  >
                    Listening... Speak clearly
                  </motion.span>
                </div>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="text-[#64748B] dark:text-[#94A3B8] hover:text-[#0F766E] dark:hover:text-[#14B8A6] hover:bg-[#F0FDFA] dark:hover:bg-[#020617] rounded-full w-10 h-10" 
                  onClick={() => {
                    setInputMode('text');
                    if (recognitionRef.current) recognitionRef.current.abort();
                  }}
                >
                  <Keyboard size={20} />
                </Button>
              </div>
            ) : (
              <form 
                className="flex items-center w-full gap-2 px-2 h-12"
                onSubmit={(e) => { e.preventDefault(); handleSendMessage(false); }}
              >
                <Button 
                  type="button"
                  variant="ghost" 
                  size="icon" 
                  className="text-[#64748B] dark:text-[#94A3B8] hover:text-[#0F766E] dark:hover:text-[#14B8A6] hover:bg-[#F0FDFA] dark:hover:bg-[#020617] rounded-full w-10 h-10 shrink-0" 
                  onClick={handleMicClick}
                  title={t('tooltips.startMic')}
                >
                  <Mic size={20} />
                </Button>
                <Input 
                  autoFocus
                  placeholder="Type your answer..." 
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  disabled={isAiThinking}
                  className="flex-grow border-0 focus-visible:ring-0 bg-transparent text-[15px] dark:text-white shadow-none px-0 placeholder:text-[#64748B] dark:placeholder:text-[#94A3B8]" 
                />
                <Button 
                  type="submit"
                  disabled={isAiThinking || (!inputValue.trim() && !retryFailedMessage)}
                  size="icon" 
                  className="w-10 h-10 rounded-full bg-[#0F766E] dark:bg-[#0D9488] hover:bg-[#005C55] dark:hover:bg-[#0F766E] text-white shadow-md shrink-0"
                >
                  <Send size={18} />
                </Button>
              </form>
            )}
          </div>
        </div>

      </main>
    </div>
  );
}
