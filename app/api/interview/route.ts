import { NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY!.trim() });

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const {
      sessionId,
      chatHistory = [],
      currentQuestion,
    } = body;

    if (!sessionId) {
      return NextResponse.json({ error: "Session ID is required" }, { status: 400 });
    }

    const interviewSession = await prisma.interviewSession.findUnique({
      where: { id: sessionId },
    });

    if (!interviewSession) {
      return NextResponse.json({ error: "Session not found" }, { status: 404 });
    }

    if (interviewSession.userId !== session.user.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    const {
      jobDescription,
      targetRole,
      interviewStyle,
      language,
      totalQuestions,
    } = interviewSession;

    const isFirstQuestion = chatHistory.length === 0 || currentQuestion === 1;
    const isFinalTurn = currentQuestion >= totalQuestions && !isFirstQuestion;

    const languageDirective = language === "id"
      ? "You MUST respond entirely in professional Bahasa Indonesia."
      : "You MUST respond entirely in professional English.";

    const stylePersona = {
      strict_hr: "You are a strict HR interviewer. Be formal and direct.",
      technical: "You are a senior technical interviewer. Probe deeply into technical concepts.",
      casual: "You are a friendly but professional interviewer.",
    }[interviewStyle as string] || "You are a professional interviewer.";

    let outputDirective = "";
    if (isFirstQuestion) {
      outputDirective = `STEP 1: VALIDATION (STRICT)
      Analyze the 'Role' and 'Job Description' provided. If they are obvious gibberish (e.g., random keyboard smashes like 'asdfg'), entirely empty, completely nonsensical, or if the input is completely unrelated to a professional job, career, or technical context (e.g., it is a recipe, a random story, or a joke), you MUST reject it by returning ONLY the following exact JSON and nothing else:
      { "error": "INVALID_CONTEXT" }
      
      STEP 2: GENERATION
      If the role and description are valid (even if they are brief or simple), accept them. Start the interview by generating the FIRST interview question. 
      CRITICAL: If the input is valid, DO NOT return JSON. Return ONLY the interview question as plain text. Do not add introductory conversational text.`;
    } else if (isFinalTurn) {
       outputDirective = `CRITICAL INSTRUCTION FOR FINAL EVALUATION:
       You are generating the final interview report for question (${currentQuestion}/${totalQuestions}). 
       DO NOT return a 'next_question'. Evaluate the user's answer using the S.T.A.R method.
       You MUST return ONLY a JSON object with this exact structure:
       {
         "is_final": true,
         "final_evaluation": {
           "overall_score": 85,
           "strengths": ["<string>"],
           "improvements": ["<string>"],
           "questions": [
             {
               "question": "<string>",
               "user_answer": "<string>",
               "score": 80,
               "feedback": "<string>",
               "improved_answer_suggestion": "<string>",
               "star_analysis": {
                 "situation": "<string or null>",
                 "task": "<string or null>",
                 "action": "<string or null>",
                 "result": "<string or null>"
               }
             }
           ]
         }
       }
       Failure to use this exact schema will crash the system.`;
    } else {
       outputDirective = `This is question ${currentQuestion} of ${totalQuestions}.
       Evaluate the user's LAST answer using the STAR method, then ask the NEXT question.
       Return JSON EXACTLY like this:
       {
         "evaluation_of_last_answer": {
           "score": 80,
           "feedback": "<string>",
           "improved_answer_suggestion": "<string>"
         },
         "next_question": "<string>",
         "question_type": "Technical",
         "is_final": false
       }`;
    }

    const systemPrompt = `
    ${stylePersona}
    Role: "${targetRole}"
    Job Description: ${jobDescription}
    Language: ${languageDirective}
    
    CRITICAL: Before generating your next question, review the chat history. You MUST NOT repeat any question that has already been asked. Ensure your next question progresses the interview logically.

    OUTPUT FORMAT:
    ${isFirstQuestion ? '' : 'You MUST return ONLY valid JSON.'}
    ${outputDirective}
    `.trim();

    const geminiHistory = chatHistory.length > 1 ? chatHistory.slice(0, -1).map((msg: any) => ({
      role: msg.role === "ai" ? "model" : "user",
      parts: [{ text: msg.content }],
    })) : [];

    const userMessageText = isFirstQuestion 
      ? "Hello, I am ready for the interview. Please introduce yourself and ask the first question." 
      : chatHistory[chatHistory.length - 1]?.content || "Continue.";

    const finalContents = [
      ...geminiHistory,
      { role: "user", parts: [{ text: userMessageText }] }
    ];

    // Model fallback chain — each model has its own per-day quota pool
    const modelsToTry = ["gemini-2.5-flash", "gemini-2.0-flash", "gemini-2.0-flash-lite"];
    let lastError: any = null;

    for (const modelName of modelsToTry) {
      for (let attempt = 0; attempt < 2; attempt++) {
        try {
          console.log(`[GEMINI] Trying model: ${modelName} (attempt ${attempt + 1})`);

          const response = await ai.models.generateContent({
            model: modelName,
            contents: finalContents,
            config: {
              systemInstruction: systemPrompt,
              ...(isFirstQuestion ? {} : { responseMimeType: "application/json" }),
              temperature: 0.7,
            }
          });

          const responseText = response.text;
          console.log("[GEMINI RAW OUTPUT]:", responseText);

          let parsed;
          try {
            const cleanText = responseText!.replace(/```json/gi, '').replace(/```/g, '').trim();
            parsed = JSON.parse(cleanText);
            
            if (parsed.error === "INVALID_CONTEXT") {
              return NextResponse.json({ error: "INVALID_CONTEXT" }, { status: 400 });
            }
            
            return NextResponse.json(parsed);
          } catch (e) {
            // If JSON parsing fails, it means the AI correctly generated a plain text question.
            if (isFirstQuestion) {
              return NextResponse.json({
                next_question: responseText!.trim(),
                question_type: "Behavioral",
                is_final: false
              });
            } else {
              throw e;
            }
          }

        } catch (error: any) {
          lastError = error;
          const status = error?.status || error?.code;
          console.warn(`[GEMINI] ${modelName} attempt ${attempt + 1} failed (status: ${status})`);

          if (status === 429) {
            // Rate limited — wait before retry or try next model
            if (attempt === 0) {
              console.log("[GEMINI] Rate limited. Waiting 5s before retry...");
              await new Promise(resolve => setTimeout(resolve, 5000));
              continue; // retry same model
            }
            // After retry still 429 → break to try next model
            break;
          }
          // Non-429 error — don't retry, don't fallback
          throw error;
        }
      }
    }

    // All models exhausted
    console.error("[API ROUTE ERROR]: All models exhausted.", lastError);
    return NextResponse.json(
      { error: "RATE_LIMIT" },
      { status: 429 }
    );

  } catch (error) {
    console.error("[API ROUTE ERROR]:", error);
    return NextResponse.json(
      { error: "SERVER_ERROR", message: "AI processing failed", details: String(error) },
      { status: 500 }
    );
  }
}
