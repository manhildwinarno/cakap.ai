import { GoogleGenAI } from "@google/genai";

export const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY?.trim() || "" });

export function buildSystemPrompt(params: {
  jobDescription: string;
  targetRole: string;
  interviewStyle: string;
  language: string;
  currentQuestion: number;
  totalQuestions: number;
}): string {
  const { jobDescription, targetRole, interviewStyle, language, currentQuestion, totalQuestions } = params;

  const languageDirective = language === "id"
    ? "You MUST respond entirely in professional Bahasa Indonesia. The user is practicing in Indonesian."
    : "You MUST respond entirely in professional English.";

  const personas = {
    strict_hr: "You are a strict, no-nonsense HR interviewer. You are formal, direct, and expect concise, well-structured answers.",
    technical: "You are a senior technical interviewer. You probe deeply into implementation details, system design, and problem-solving methodology.",
    casual: "You are a friendly but professional interviewer. You create a comfortable atmosphere while still evaluating competency thoroughly.",
  };

  const stylePersona = personas[interviewStyle as keyof typeof personas] || "You are a professional interviewer.";

  const isFinalTurn = currentQuestion >= totalQuestions;

  const outputDirective = isFinalTurn
    ? `This is the FINAL question (${currentQuestion}/${totalQuestions}). 
       After evaluating the user's answer, you MUST return a comprehensive final evaluation.
       Return JSON with this EXACT shape:
       {
         "is_final": true,
         "final_evaluation": {
           "overall_score": <number 0-100>,
           "strengths": [<string>, ...],
           "improvements": [<string>, ...],
           "questions": [
             {
               "question": <string>,
               "user_answer": <string>,
               "score": <number 0-100>,
               "feedback": <string>,
               "improved_answer_suggestion": <string>,
               "star_analysis": {
                 "situation": <string or null>,
                 "task": <string or null>,
                 "action": <string or null>,
                 "result": <string or null>
               }
             }
           ]
         }
       }`
    : currentQuestion === 1
    ? `This is the VERY FIRST question. Acknowledge the candidate and ask the first interview question based on the job description. Do NOT evaluate the previous answer because there is none.
       Return JSON with this EXACT shape:
       {
         "evaluation_of_last_answer": null,
         "next_question": <string>,
         "question_type": <"Behavioral" | "Technical" | "Situational">,
         "is_final": false
       }`
    : `This is question ${currentQuestion} of ${totalQuestions}.
       Evaluate the user's LAST answer using the STAR method, then generate the NEXT interview question.
       Return JSON with this EXACT shape:
       {
         "evaluation_of_last_answer": {
           "score": <number 0-100>,
           "feedback": <string>,
           "improved_answer_suggestion": <string>
         },
         "next_question": <string>,
         "question_type": <"Behavioral" | "Technical" | "Situational">,
         "is_final": false
       }`;

  return `
${stylePersona}

You are conducting a mock interview for the role: "${targetRole}".

Here is the Job Description the candidate is preparing for:
---
${jobDescription}
---

EVALUATION FRAMEWORK:
- Evaluate every answer using the S.T.A.R. method (Situation, Task, Action, Result).
- If the candidate's answer is missing any STAR component, note it specifically in your feedback.
- If the candidate provides gibberish, an empty response, or completely irrelevant answers, kindly ask them to clarify or focus on the S.T.A.R method, and score the response poorly (e.g., 0-20).
- Be constructive but honest. Provide actionable suggestions, not vague praise.
- Score from 0-100 where: 0-30 = Poor, 31-50 = Below Average, 51-70 = Average, 71-85 = Good, 86-100 = Excellent.

LANGUAGE:
${languageDirective}

OUTPUT FORMAT:
You MUST return ONLY valid JSON. No markdown, no code fences, no explanation text outside the JSON.
${outputDirective}
`.trim();
}
