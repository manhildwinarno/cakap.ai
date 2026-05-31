"use client";

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { useLanguage } from "@/components/language-provider";

export function LandingFaq() {
  const { t } = useLanguage();

  return (
    <div className="max-w-3xl mx-auto relative z-10">
      <div className="text-center mb-12">
        <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">{t("faqHeader")}</h2>
      </div>
      <Accordion type="single" collapsible className="w-full flex flex-col gap-4">
        <AccordionItem value="item-1" className="border-0 rounded-xl px-6 bg-white/10 dark:bg-[#0F172A] hover:bg-white/20 dark:hover:bg-[#1E293B] backdrop-blur-md shadow-sm data-[state=open]:bg-white/20 dark:data-[state=open]:bg-[#1E293B] dark:border dark:border-[#1E293B] transition-colors">
          <AccordionTrigger className="text-lg font-semibold text-white hover:no-underline hover:text-[#99F6E4] dark:hover:text-[#99F6E4] transition-colors py-4 cursor-pointer">{t("faq1Q")}</AccordionTrigger>
          <AccordionContent className="text-white/80 dark:text-[#94A3B8] text-base pb-4">
            {t("faq1A")}
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2" className="border-0 rounded-xl px-6 bg-white/10 dark:bg-[#0F172A] hover:bg-white/20 dark:hover:bg-[#1E293B] backdrop-blur-md shadow-sm data-[state=open]:bg-white/20 dark:data-[state=open]:bg-[#1E293B] dark:border dark:border-[#1E293B] transition-colors">
          <AccordionTrigger className="text-lg font-semibold text-white hover:no-underline hover:text-[#99F6E4] dark:hover:text-[#99F6E4] transition-colors py-4 cursor-pointer">{t("faq2Q")}</AccordionTrigger>
          <AccordionContent className="text-white/80 dark:text-[#94A3B8] text-base pb-4">
            {t("faq2A")}
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-3" className="border-0 rounded-xl px-6 bg-white/10 dark:bg-[#0F172A] hover:bg-white/20 dark:hover:bg-[#1E293B] backdrop-blur-md shadow-sm data-[state=open]:bg-white/20 dark:data-[state=open]:bg-[#1E293B] dark:border dark:border-[#1E293B] transition-colors">
          <AccordionTrigger className="text-lg font-semibold text-white hover:no-underline hover:text-[#99F6E4] dark:hover:text-[#99F6E4] transition-colors py-4 cursor-pointer">{t("faq3Q")}</AccordionTrigger>
          <AccordionContent className="text-white/80 dark:text-[#94A3B8] text-base pb-4">
            {t("faq3A")}
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
