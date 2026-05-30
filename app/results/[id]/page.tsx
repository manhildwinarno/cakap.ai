import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import ResultsClient from "./results-client";
import type { FinalEvaluation } from "@/types/interview";

export default async function ResultsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) redirect("/");

  const interviewSession = await prisma.interviewSession.findUnique({
    where: { id, userId: session.user.id },
  });

  if (!interviewSession || interviewSession.status !== "completed") {
    redirect("/home");
  }

  const feedbackData = interviewSession.feedbackData as unknown as FinalEvaluation;

  return (
    <ResultsClient 
      reportData={feedbackData} 
      targetRole={interviewSession.targetRole} 
      date={interviewSession.updatedAt.toLocaleDateString()} 
    />
  );
}
