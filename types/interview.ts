// ── Chat message stored in InterviewSession.chatHistory ──
export interface ChatMessage {
  id: string;
  role: "user" | "ai";
  content: string;
  questionType?: string;      // e.g. "Behavioral", "Technical Insight"
  questionNumber?: number;     // 1-based, set on AI messages only
  timestamp: string;           // ISO 8601
}

// ── Per-question evaluation from Gemini (mid-interview turn) ──
export interface TurnEvaluation {
  score: number;               // 0–100
  feedback: string;
  improved_answer_suggestion: string;
}

// ── Gemini's response shape for each turn ──
export interface GeminiTurnResponse {
  evaluation_of_last_answer: TurnEvaluation | null;  // null on first question
  next_question: string | null;                      // null on final evaluation
  question_type: string;                             // e.g. "Behavioral"
  is_final: boolean;                                 // true when all questions are done
}

// ── Final evaluation object stored in InterviewSession.feedbackData ──
export interface FinalEvaluation {
  overall_score: number;
  strengths: string[];
  improvements: string[];
  questions: QuestionFeedback[];
}

export interface QuestionFeedback {
  question: string;
  user_answer: string;
  score: number;
  feedback: string;
  improved_answer_suggestion: string;
  star_analysis: {
    situation: string | null;
    task: string | null;
    action: string | null;
    result: string | null;
  };
}
