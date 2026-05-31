"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Search, Calendar, ChevronRight, MoreVertical, Trash2 } from "lucide-react";
import Link from "next/link";
import { useLanguage } from "@/components/language-provider";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "sonner";

type HistorySession = {
  id: string;
  targetRole: string;
  interviewStyle: string;
  score: number | null;
  totalQuestions: number;
  updatedAt: Date;
};

export function HistoryClient({ initialSessions }: { initialSessions: HistorySession[] }) {
  const { t } = useLanguage();
  const [searchQuery, setSearchQuery] = useState("");
  const [timeFilter, setTimeFilter] = useState<"all" | "7d" | "30d">("all");
  const [sessions, setSessions] = useState(initialSessions);

  const filteredSessions = sessions.filter((session) => {
    const matchesSearch = session.targetRole.toLowerCase().includes(searchQuery.toLowerCase());
    
    let matchesTime = true;
    if (timeFilter !== "all") {
      const sessionDate = new Date(session.updatedAt);
      const now = new Date();
      const diffTime = Math.abs(now.getTime() - sessionDate.getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      
      if (timeFilter === "7d") matchesTime = diffDays <= 7;
      if (timeFilter === "30d") matchesTime = diffDays <= 30;
    }

    return matchesSearch && matchesTime;
  });

  const handleDelete = (id: string) => {
    // Show a toast as requested since full deletion is in development
    toast(t("historyDeleteToast"));
    setSessions(sessions.filter(s => s.id !== id));
  };

  return (
    <main className="pt-28 px-6 lg:px-8 max-w-6xl mx-auto w-full relative z-10">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-10">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-[#0F172A] dark:text-white">{t("historyTitle")}</h1>
          <p className="text-[#64748B] dark:text-[#94A3B8] mt-2 text-sm">{t("historySubtitle")}</p>
        </div>
        
        <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={16} />
            <Input 
              placeholder={t("historySearch")}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 bg-background border-border focus-visible:ring-[#0F766E] dark:focus-visible:ring-[#14B8A6] shadow-sm rounded-lg w-full"
            />
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="w-full sm:w-auto bg-background border-border text-muted-foreground shadow-sm hover:bg-muted gap-2 rounded-lg cursor-pointer">
                <Calendar size={16} />
                {t("historyFilterPrefix")}: {timeFilter === "all" ? t("historyFilterAll") : timeFilter === "7d" ? t("historyFilter7") : t("historyFilter30")}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuItem onClick={() => setTimeFilter("all")} className="cursor-pointer">
                {t("historyFilterAll")}
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTimeFilter("7d")} className="cursor-pointer">
                {t("historyFilter7")}
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTimeFilter("30d")} className="cursor-pointer">
                {t("historyFilter30")}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {filteredSessions.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-muted-foreground">{t("historyNoData")}</p>
          <Link href="/home">
            <Button className="mt-4 bg-[#0F766E] dark:bg-[#0D9488] hover:bg-[#005C55] dark:hover:bg-[#0F766E] text-white">
              {t("historyStartBtn")}
            </Button>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSessions.map((sessionItem) => (
            <Card 
              key={sessionItem.id} 
              className="bg-card rounded-2xl border border-border dark:border-white/10 p-6 shadow-sm hover:shadow-md transition-all duration-300 group flex flex-col h-full relative"
            >
              <div className="flex justify-between items-start mb-4">
                <Badge 
                  variant="secondary" 
                  className={`
                    ${(sessionItem.score ?? 0) >= 80 ? 'bg-[#ECFDF5] dark:bg-[#064E3B]/50 text-[#059669] dark:text-[#34D399] hover:bg-[#ECFDF5] dark:hover:bg-[#064E3B]/70' : 
                      (sessionItem.score ?? 0) >= 60 ? 'bg-[#FFFBEB] dark:bg-[#78350F]/50 text-[#D97706] dark:text-[#FBBF24] hover:bg-[#FFFBEB] dark:hover:bg-[#78350F]/70' : 
                      'bg-[#FEF2F2] dark:bg-[#7F1D1D]/50 text-[#DC2626] dark:text-[#F87171] hover:bg-[#FEF2F2] dark:hover:bg-[#7F1D1D]/70'}
                    font-bold px-3 py-1 text-sm shadow-sm
                  `}
                >
                  Score: {sessionItem.score ?? 0}
                </Badge>
                
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground -mt-2 -mr-2 h-8 w-8 cursor-pointer">
                      <MoreVertical size={18} />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="start" side="right" sideOffset={8} className="w-40">
                    <DropdownMenuItem 
                      className="text-red-600 focus:text-red-600 focus:bg-red-50 dark:focus:bg-[#020617] cursor-pointer flex items-center gap-2"
                      onClick={() => handleDelete(sessionItem.id)}
                    >
                      <Trash2 size={16} />
                      {t("historyDelete")}
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>

              <div className="mb-6 flex-grow">
                <h3 className="text-lg font-bold text-foreground line-clamp-1 mb-1">
                  {sessionItem.targetRole}
                </h3>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <span className="capitalize">{sessionItem.interviewStyle.replace('_', ' ')}</span>
                  <span className="w-1 h-1 rounded-full bg-border"></span>
                  <span suppressHydrationWarning>{new Date(sessionItem.updatedAt).toLocaleDateString()}</span>
                </div>
              </div>

              <div className="pt-4 border-t border-border flex items-center justify-between">
                <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  {sessionItem.totalQuestions} {t("historyQuestions")}
                </span>
                <Link href={`/results/${sessionItem.id}`}>
                  <Button variant="ghost" className="text-[#0F766E] dark:text-[#14B8A6] hover:text-[#005C55] dark:hover:text-[#0D9488] hover:bg-[#F0FDFA] dark:hover:bg-[#020617] p-0 h-auto flex items-center gap-1 font-semibold group-hover:gap-2 transition-all cursor-pointer">
                    {t("historyViewReport")} <ChevronRight size={16} />
                  </Button>
                </Link>
              </div>
            </Card>
          ))}
        </div>
      )}
    </main>
  );
}
