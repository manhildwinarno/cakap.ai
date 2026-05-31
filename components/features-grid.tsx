"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Star, Users, LineChart, Globe } from "lucide-react";
import { useLanguage } from "@/components/language-provider";

export function FeaturesGrid() {
  const { t } = useLanguage();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <Card className="border border-[#E2E8F0] dark:border-[#1E293B] shadow-sm hover:shadow-xl transition-[box-shadow,transform] duration-500 hover:-translate-y-2 bg-white/80 dark:bg-[#0F172A]/80 backdrop-blur-xl overflow-hidden flex flex-col group relative">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0F766E]/5 to-transparent dark:from-[#14B8A6]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        <CardHeader className="pb-4 relative z-10">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#F0FDFA] to-[#CCFBF1] dark:from-[#020617] dark:to-[#0F172A] text-[#0F766E] dark:text-[#14B8A6] flex items-center justify-center mb-4 shadow-sm border border-[#99F6E4] dark:border-[#1E293B] group-hover:scale-110 transition-transform duration-500">
            <Star size={26} strokeWidth={2} />
          </div>
          <CardTitle className="text-2xl font-bold dark:text-white group-hover:text-[#0F766E] dark:group-hover:text-[#14B8A6] transition-colors">{t("feat1Title")}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-[#3E4947] dark:text-[#94A3B8] text-lg leading-relaxed">{t("feat1Desc")}</p>
        </CardContent>
      </Card>

      <Card className="border border-[#E2E8F0] dark:border-[#1E293B] shadow-sm hover:shadow-xl transition-[box-shadow,transform] duration-500 hover:-translate-y-2 bg-white/80 dark:bg-[#0F172A]/80 backdrop-blur-xl overflow-hidden flex flex-col group relative">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0F766E]/5 to-transparent dark:from-[#14B8A6]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        <CardHeader className="pb-4 relative z-10">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#F0FDFA] to-[#CCFBF1] dark:from-[#020617] dark:to-[#0F172A] text-[#0F766E] dark:text-[#14B8A6] flex items-center justify-center mb-4 shadow-sm border border-[#99F6E4] dark:border-[#1E293B] group-hover:scale-110 transition-transform duration-500">
            <Users size={26} strokeWidth={2} />
          </div>
          <CardTitle className="text-2xl font-bold dark:text-white group-hover:text-[#0F766E] dark:group-hover:text-[#14B8A6] transition-colors">{t("feat2Title")}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-[#3E4947] dark:text-[#94A3B8] text-lg leading-relaxed">{t("feat2Desc")}</p>
        </CardContent>
      </Card>

      <Card className="border border-[#E2E8F0] dark:border-[#1E293B] shadow-sm hover:shadow-xl transition-[box-shadow,transform] duration-500 hover:-translate-y-2 bg-white/80 dark:bg-[#0F172A]/80 backdrop-blur-xl overflow-hidden flex flex-col group relative">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0F766E]/5 to-transparent dark:from-[#14B8A6]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        <CardHeader className="pb-4 relative z-10">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#F0FDFA] to-[#CCFBF1] dark:from-[#020617] dark:to-[#0F172A] text-[#0F766E] dark:text-[#14B8A6] flex items-center justify-center mb-4 shadow-sm border border-[#99F6E4] dark:border-[#1E293B] group-hover:scale-110 transition-transform duration-500">
            <LineChart size={26} strokeWidth={2} />
          </div>
          <CardTitle className="text-2xl font-bold dark:text-white group-hover:text-[#0F766E] dark:group-hover:text-[#14B8A6] transition-colors">{t("feat3Title")}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-[#3E4947] dark:text-[#94A3B8] text-lg leading-relaxed">{t("feat3Desc")}</p>
        </CardContent>
      </Card>

      <Card className="border border-[#E2E8F0] dark:border-[#1E293B] shadow-sm hover:shadow-xl transition-[box-shadow,transform] duration-500 hover:-translate-y-2 bg-white/80 dark:bg-[#0F172A]/80 backdrop-blur-xl overflow-hidden flex flex-col group relative">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0F766E]/5 to-transparent dark:from-[#14B8A6]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        <CardHeader className="pb-4 relative z-10">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#F0FDFA] to-[#CCFBF1] dark:from-[#020617] dark:to-[#0F172A] text-[#0F766E] dark:text-[#14B8A6] flex items-center justify-center mb-4 shadow-sm border border-[#99F6E4] dark:border-[#1E293B] group-hover:scale-110 transition-transform duration-500">
            <Globe size={26} strokeWidth={2} />
          </div>
          <CardTitle className="text-2xl font-bold dark:text-white group-hover:text-[#0F766E] dark:group-hover:text-[#14B8A6] transition-colors">{t("feat4Title")}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-[#3E4947] dark:text-[#94A3B8] text-lg leading-relaxed">{t("feat4Desc")}</p>
        </CardContent>
      </Card>
    </div>
  );
}
