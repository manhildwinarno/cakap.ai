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
import { HistoryClient } from "./history-client";

export default async function HistoryDashboard() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) redirect("/");

  const historySessions = await prisma.interviewSession.findMany({
    where: { userId: session.user.id, status: "completed" },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="min-h-screen bg-[#F8FAFC] dark:bg-[#020617] font-sans pb-24 text-[#0F172A] dark:text-[#F8FAFC] relative overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(#0F766E15_1px,transparent_1px)] dark:bg-[radial-gradient(#14B8A615_1px,transparent_1px)] [background-size:20px_20px] opacity-70 pointer-events-none" />
      
      <div className="absolute -bottom-24 -right-24 text-[#0F766E]/5 dark:text-[#14B8A6]/5 pointer-events-none">
        <Folder size={400} strokeWidth={0.5} />
      </div>

      <PrivateNavbar activeTab="history" />

      <HistoryClient initialSessions={historySessions} />
    </div>
  );
}
