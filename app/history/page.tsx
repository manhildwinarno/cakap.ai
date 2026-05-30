import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { PrivateNavbar } from "@/components/private-navbar";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Search, Calendar, ChevronRight, Folder, MoreVertical } from "lucide-react";
import Link from "next/link";

export default async function HistoryDashboard() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) redirect("/");

  const historySessions = await prisma.interviewSession.findMany({
    where: { userId: session.user.id, status: "completed" },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="min-h-screen bg-[#F8FAFC] font-sans pb-24 text-[#0F172A] relative overflow-hidden">
      <div className="absolute -bottom-24 -right-24 text-[#0F766E]/5 pointer-events-none">
        <Folder size={400} strokeWidth={0.5} />
      </div>

      <PrivateNavbar activeTab="history" />

      <main className="pt-28 px-6 lg:px-8 max-w-6xl mx-auto w-full relative z-10">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-10">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-[#0F172A]">Interview History</h1>
            <p className="text-[#64748B] mt-2 text-sm">Review your past sessions and track your progress over time.</p>
          </div>
          
          <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[#64748B]" size={16} />
              <Input 
                placeholder="Search roles..." 
                className="pl-9 bg-white border-[#E2E8F0] focus-visible:ring-[#0F766E] shadow-sm rounded-lg w-full"
              />
            </div>
            <Button variant="outline" className="w-full sm:w-auto bg-white border-[#E2E8F0] text-[#3E4947] shadow-sm hover:bg-[#F8FAFC] gap-2 rounded-lg">
              <Calendar size={16} />
              Filter: All Time
            </Button>
          </div>
        </div>

        {historySessions.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-[#64748B]">No completed interviews found.</p>
            <Link href="/home">
              <Button className="mt-4 bg-[#0F766E] hover:bg-[#005C55] text-white">Start an Interview</Button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {historySessions.map((sessionItem) => (
              <Card 
                key={sessionItem.id} 
                className="bg-white rounded-2xl border border-[#E2E8F0] p-6 shadow-sm hover:shadow-md transition-all duration-300 group flex flex-col h-full relative"
              >
                <div className="flex justify-between items-start mb-4">
                  <Badge 
                    variant="secondary" 
                    className={`
                      ${(sessionItem.score ?? 0) >= 80 ? 'bg-[#ECFDF5] text-[#059669] hover:bg-[#ECFDF5]' : 
                        (sessionItem.score ?? 0) >= 60 ? 'bg-[#FFFBEB] text-[#D97706] hover:bg-[#FFFBEB]' : 
                        'bg-[#FEF2F2] text-[#DC2626] hover:bg-[#FEF2F2]'}
                      font-bold px-3 py-1 text-sm shadow-sm
                    `}
                  >
                    Score: {sessionItem.score ?? 0}
                  </Badge>
                  <Button variant="ghost" size="icon" className="text-[#94A3B8] hover:text-[#0F172A] -mt-2 -mr-2 h-8 w-8">
                    <MoreVertical size={18} />
                  </Button>
                </div>

                <div className="mb-6 flex-grow">
                  <h3 className="text-lg font-bold text-[#0F172A] line-clamp-1 mb-1">
                    {sessionItem.targetRole}
                  </h3>
                  <div className="flex items-center gap-2 text-sm text-[#64748B]">
                    <span className="capitalize">{sessionItem.interviewStyle.replace('_', ' ')}</span>
                    <span className="w-1 h-1 rounded-full bg-[#CBD5E1]"></span>
                    <span>{sessionItem.updatedAt.toLocaleDateString()}</span>
                  </div>
                </div>

                <div className="pt-4 border-t border-[#F1F5F9] flex items-center justify-between">
                  <span className="text-xs font-semibold text-[#94A3B8] uppercase tracking-wider">
                    {sessionItem.totalQuestions} Questions
                  </span>
                  <Link href={`/results/${sessionItem.id}`}>
                    <Button variant="ghost" className="text-[#0F766E] hover:text-[#005C55] hover:bg-[#F0FDFA] p-0 h-auto flex items-center gap-1 font-semibold group-hover:gap-2 transition-all">
                      View Report <ChevronRight size={16} />
                    </Button>
                  </Link>
                </div>
              </Card>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
