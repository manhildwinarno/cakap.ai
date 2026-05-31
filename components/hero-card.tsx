"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { LockKeyhole } from "lucide-react";
import Link from "next/link";
import { useLanguage } from "@/components/language-provider";

/**
 * HeroCard — minimal "use client" island.
 * Keeps all interactive state (role/JD inputs) isolated from the SSR
 * landing page so above-the-fold content is fully server-rendered.
 */
export function HeroCard() {
  const { t } = useLanguage();
  const [role, setRole] = useState("");
  const [jd, setJd] = useState("");

  return (
    <Card className="p-4 mt-4 shadow-md border-0 bg-white dark:bg-[#0F172A] rounded-xl flex flex-col gap-3">
      <Input
        placeholder={t("setupRole")}
        value={role}
        onChange={(e) => setRole(e.target.value)}
        className="border-[#BDC9C6] dark:border-[#1E293B] focus-visible:ring-[#0F766E] dark:focus-visible:ring-[#14B8A6] bg-white dark:bg-[#020617] dark:text-white py-5"
      />
      <Textarea
        placeholder={t("heroInputPlaceholder")}
        value={jd}
        onChange={(e) => setJd(e.target.value)}
        className="min-h-[120px] resize-none border-[#BDC9C6] dark:border-[#1E293B] focus-visible:ring-[#0F766E] dark:focus-visible:ring-[#14B8A6] text-base p-4 rounded-lg bg-white dark:bg-[#020617] dark:text-white"
      />
      <div className="flex justify-between items-center mt-2 pt-2 border-t border-[#F1F5F9] dark:border-[#1E293B]">
        <div className="flex items-center gap-2 text-xs text-[#4A5568] dark:text-[#94A3B8]">
          <LockKeyhole size={17} strokeWidth={1.5} />
          {t("heroSecure")}
        </div>
        <Link href={`/home?role=${encodeURIComponent(role)}&jd=${encodeURIComponent(jd)}`}>
          <Button className="bg-[#0F766E] dark:bg-[#0D9488] text-white dark:text-white hover:bg-[#005C55] dark:hover:bg-[#0F766E] rounded-lg px-8 py-6 font-bold text-base shadow-sm transition-[box-shadow,transform] hover:-translate-y-0.5 cursor-pointer">
            {t("heroCTA")}
          </Button>
        </Link>
      </div>
    </Card>
  );
}
