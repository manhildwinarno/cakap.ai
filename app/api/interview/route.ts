import { NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY!.trim() });

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {
      jobDescription,
      targetRole,
      interviewStyle,
      language,
      chatHistory = [],
      currentQuestion,
      totalQuestions,
    } = body;

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
      outputDirective = `This is the START of the interview. Acknowledge the candidate and ask the VERY FIRST interview question based on the job description.
      Return JSON EXACTLY like this:
      {
        "evaluation_of_last_answer": null,
        "next_question": "<your first question>",
        "question_type": "Behavioral",
        "is_final": false
      }`;
    } else if (isFinalTurn) {
       outputDirective = `This is the FINAL question (${currentQuestion}/${totalQuestions}). 
       Evaluate the user's answer using the S.T.A.R method and return the comprehensive final evaluation.
       Return JSON EXACTLY like this:
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
       }`;
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
    You MUST return ONLY valid JSON.
    ${outputDirective}
    `.trim();

    // Map history to the new SDK structure
    const geminiHistory = chatHistory.length > 1 ? chatHistory.slice(0, -1).map((msg: any) => ({
      role: msg.role === "ai" ? "model" : "user",
      parts: [{ text: msg.content }],
    })) : [];

    const userMessageText = isFirstQuestion 
      ? "Hello, I am ready for the interview. Please introduce yourself and ask the first question." 
      : chatHistory[chatHistory.length - 1]?.content || "Continue.";

    // Append the latest user message to the contents array
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
              responseMimeType: "application/json",
              temperature: 0.7,
            }
          });

          const responseText = response.text;
          console.log("[GEMINI RAW OUTPUT]:", responseText);

          const cleanText = responseText!.replace(/```json/gi, '').replace(/```/g, '').trim();
          const parsed = JSON.parse(cleanText);

          return NextResponse.json(parsed);

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
      { error: "AI quota exceeded. Please wait a minute and try again.", details: String(lastError) },
      { status: 429 }
    );

  } catch (error) {
    console.error("[API ROUTE ERROR]:", error);
    return NextResponse.json(
      { error: "AI processing failed", details: String(error) },
      { status: 500 }
    );
  }
}
