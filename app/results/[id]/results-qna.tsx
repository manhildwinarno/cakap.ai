"use client";

import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import { Lightbulb } from "lucide-react";
import type { FinalEvaluation } from "@/types/interview";
import { useLanguage } from "@/components/language-provider";

export function ResultsQnA({ questions }: { questions: FinalEvaluation["questions"] }) {
  const { t } = useLanguage();

  return (
    <div className="mb-8">
      <h2 className="text-2xl font-bold text-foreground mb-6">{t("resultsQnA")}</h2>
      
      <Accordion type="single" collapsible className="w-full flex flex-col gap-4">
        {questions.map((item, index) => (
          <AccordionItem key={index} value={`item-${index}`} className="border border-border dark:border-white/10 shadow-sm bg-card overflow-hidden rounded-xl data-[state=open]:bg-muted/30">
            <AccordionTrigger className="w-full text-left px-6 py-5 flex items-start justify-between gap-4 hover:bg-muted/50 transition-colors cursor-pointer hover:no-underline">
              <div className="flex gap-4">
                <div className="text-muted-foreground font-bold mt-0.5">
                  Q{index + 1}
                </div>
                <div className="font-semibold text-foreground text-[15px] leading-snug pr-8">
                  {item.question}
                </div>
              </div>
            </AccordionTrigger>

            <AccordionContent className="px-6 pb-6 pt-2 border-t border-border flex flex-col gap-6">
              <div className="bg-[#FFFBEB]/50 dark:bg-[#78350F]/10 border border-[#FEF3C7] dark:border-[#78350F]/30 rounded-xl p-5">
                <div className="flex items-center justify-between mb-3">
                   <div className="flex items-center gap-2">
                    <span className="text-xs font-semibold text-[#92400E] dark:text-[#FBBF24] uppercase tracking-wider">{t("resultsYourAnswer")}</span>
                   </div>
                   <div className="text-xs font-semibold text-muted-foreground">{t("resultsScore")}: {item.score}/100</div>
                </div>
                <p className="text-foreground text-[15px] leading-relaxed mb-4">
                  &quot;{item.user_answer}&quot;
                </p>
                <div className="bg-white/60 dark:bg-black/20 p-3 rounded-lg border border-[#FEF3C7] dark:border-[#78350F]/30 text-sm text-[#92400E] dark:text-[#FBBF24]">
                    <strong>{t("resultsFeedback")}:</strong> {item.feedback}
                </div>
              </div>

              <div className="bg-[#F0FDFA] dark:bg-[#064E3B]/10 border border-[#CCFBF1] dark:border-[#064E3B]/30 border-l-4 border-l-[#0F766E] dark:border-l-[#14B8A6] rounded-r-xl rounded-l-sm p-5">
                <div className="flex items-center gap-2 mb-3">
                  <span className="bg-[#0F766E] dark:bg-[#14B8A6] text-white dark:text-[#020617] text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded-full flex items-center gap-1.5">
                    <Lightbulb size={12} /> {t("resultsAISuggestion")}
                  </span>
                  <span className="text-xs font-semibold text-[#0F766E] dark:text-[#14B8A6] uppercase tracking-wider">{t("resultsOptimized")}</span>
                </div>
                <p className="text-foreground text-[15px] leading-relaxed">
                  &quot;{item.improved_answer_suggestion}&quot;
                </p>
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
