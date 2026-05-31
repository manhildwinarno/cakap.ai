import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { jobDescription, targetRole, language, interviewStyle, totalQuestions } = body;

    const newInterviewSession = await prisma.interviewSession.create({
      data: {
        userId: session.user.id,
        jobDescription,
        targetRole,
        language,
        interviewStyle,
        totalQuestions: totalQuestions || 5,
        status: "in_progress",
      },
    });

    return NextResponse.json({ sessionId: newInterviewSession.id });
  } catch (error) {
    console.error("[Create Session API Error]", error);
    return NextResponse.json({ error: "Failed to create session" }, { status: 500 });
  }
}

export async function PATCH(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { sessionId, chatHistory, feedbackData, score, status } = body;

    const updatedSession = await prisma.interviewSession.update({
      where: { id: sessionId, userId: session.user.id },
      data: {
        status,
        score,
        feedbackData,
        chatHistory,
      },
    });

    return NextResponse.json({ success: true, session: updatedSession });
  } catch (error) {
    console.error("[Update Session API Error]", error);
    return NextResponse.json({ error: "Failed to update session" }, { status: 500 });
  }
}
