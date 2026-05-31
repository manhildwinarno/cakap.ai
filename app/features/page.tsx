"use client";

import Image from "next/image";
import Link from "next/link";
import { PublicNavbar } from "@/components/public-navbar";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useLanguage } from "@/components/language-provider";
import { motion, useReducedMotion } from "framer-motion";
import { CheckCircle2, XCircle } from "lucide-react";
import dynamic from "next/dynamic";
import { FeaturesGrid } from "@/components/features-grid";

// Footer is strictly below-the-fold — safe to lazy-load
const Footer = dynamic(() => import("@/components/footer").then((mod) => mod.Footer));

export default function FeaturesPage() {
  const { t } = useLanguage();
  // useReducedMotion is SSR-safe: returns null on server (no mismatch),
  // then true/false on client. We treat null as "run full animation".
  const prefersReducedMotion = useReducedMotion();

  return (
    <div className="min-h-screen bg-[#F8FAFC] dark:bg-[#020617] flex flex-col font-sans text-[#0F172A] dark:text-[#F8FAFC]">
      <PublicNavbar />

      <main className="flex-grow pt-32 pb-24 px-6 lg:px-8 max-w-[1280px] mx-auto w-full">
        <section className="relative flex flex-col items-center text-center mb-24 gap-8 pt-8 lg:pt-12">
          <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,#0F766E15_1px,transparent_1px),linear-gradient(to_bottom,#0F766E15_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#14B8A615_1px,transparent_1px),linear-gradient(to_bottom,#14B8A615_1px,transparent_1px)] bg-[size:32px_32px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] -mx-4 sm:-mx-8 lg:-mx-12" />
          
          <motion.div
            initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            style={{ willChange: "transform, opacity" }}
            className="max-w-3xl"
          >
            <h1 className="text-5xl lg:text-7xl font-extrabold leading-tight tracking-tight text-[#0F172A] dark:text-white mb-6">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#0F766E] to-emerald-400 dark:from-[#14B8A6] dark:to-emerald-300">
                {t("featuresHeroTitle")}
              </span>
            </h1>
            <p className="text-xl text-[#3E4947] dark:text-[#94A3B8] mb-8">
              {t("featuresHeroSubtitle")}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            style={{ willChange: "transform, opacity" }}
            className="w-full max-w-4xl flex justify-center mt-4"
          >
            <motion.div 
              animate={prefersReducedMotion ? {} : { y: [0, -15, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              style={{ willChange: "transform" }}
              className="relative z-10 w-full max-w-[800px] mx-auto aspect-[2/1]"
            >
              <Image 
                src="/assets/hero-features.avif" 
                alt="AI Chat Interview Simulation" 
                fill
                className="object-contain drop-shadow-2xl" 
                sizes="(max-width: 768px) 100vw, 50vw"
                quality={85}
                fetchPriority="high"
                priority
              />
            </motion.div>
          </motion.div>
        </section>

        <section className="mb-32 relative">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[500px] bg-[#0F766E]/5 dark:bg-[#14B8A6]/5 blur-[120px] rounded-full pointer-events-none -z-10" />
          
          <FeaturesGrid />
        </section>

        <section className="mb-32 max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-[#0F172A] dark:text-white">{t("compTableTitle")}</h2>
          </div>
          
          <div className="rounded-2xl overflow-hidden border border-[#E2E8F0] dark:border-[#1E293B] bg-white dark:bg-[#0F172A] shadow-sm">
            <Table>
              <TableHeader className="bg-[#F8FAFC] dark:bg-[#1E293B] border-b border-[#E2E8F0] dark:border-[#1E293B]">
                <TableRow>
                  <TableHead className="w-[30%] py-6 text-lg font-bold text-[#0F172A] dark:text-white"></TableHead>
                  <TableHead className="w-[35%] py-6 text-lg font-bold text-[#0F766E] dark:text-[#14B8A6] text-center bg-[#0F766E]/5 dark:bg-[#14B8A6]/10">Cakap.AI</TableHead>
                  <TableHead className="w-[35%] py-6 text-lg font-bold text-[#64748B] dark:text-[#94A3B8] text-center">Lainnya / Others</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell className="font-semibold text-[#0F172A] dark:text-white py-6 px-10">{t("compCost")}</TableCell>
                  <TableCell className="text-center bg-[#0F766E]/5 dark:bg-[#14B8A6]/10 py-6">
                    <div className="flex flex-col items-center gap-2 text-[#0F766E] dark:text-[#14B8A6] font-medium">
                      <CheckCircle2 size={24} />
                      <span>{t("compCostCakap")}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-center py-6">
                    <div className="flex flex-col items-center gap-2 text-[#64748B] dark:text-[#94A3B8]">
                      <XCircle size={24} />
                      <span>{t("compCostOthers")}</span>
                    </div>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-semibold text-[#0F172A] dark:text-white py-6 px-10">{t("compFeedback")}</TableCell>
                  <TableCell className="text-center bg-[#0F766E]/5 dark:bg-[#14B8A6]/10 py-6">
                    <div className="flex flex-col items-center gap-2 text-[#0F766E] dark:text-[#14B8A6] font-medium">
                      <CheckCircle2 size={24} />
                      <span>{t("compFeedbackCakap")}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-center py-6">
                    <div className="flex flex-col items-center gap-2 text-[#64748B] dark:text-[#94A3B8]">
                      <XCircle size={24} />
                      <span>{t("compFeedbackOthers")}</span>
                    </div>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-semibold text-[#0F172A] dark:text-white py-6 px-10">{t("compLang")}</TableCell>
                  <TableCell className="text-center bg-[#0F766E]/5 dark:bg-[#14B8A6]/10 py-6">
                    <div className="flex flex-col items-center gap-2 text-[#0F766E] dark:text-[#14B8A6] font-medium">
                      <CheckCircle2 size={24} />
                      <span>{t("compLangCakap")}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-center py-6">
                    <div className="flex flex-col items-center gap-2 text-[#64748B] dark:text-[#94A3B8]">
                      <XCircle size={24} />
                      <span>{t("compLangOthers")}</span>
                    </div>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-semibold text-[#0F172A] dark:text-white py-6 px-10 border-b-0">{t("compRealism")}</TableCell>
                  <TableCell className="text-center bg-[#0F766E]/5 dark:bg-[#14B8A6]/10 py-6 border-b-0">
                    <div className="flex flex-col items-center gap-2 text-[#0F766E] dark:text-[#14B8A6] font-medium">
                      <CheckCircle2 size={24} />
                      <span>{t("compRealismCakap")}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-center py-6 border-b-0">
                    <div className="flex flex-col items-center gap-2 text-[#64748B] dark:text-[#94A3B8]">
                      <XCircle size={24} />
                      <span>{t("compRealismOthers")}</span>
                    </div>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </section>

        <section className="text-center bg-[#0F766E] dark:bg-[#020617] dark:border dark:border-[#1E293B] rounded-3xl py-20 px-6 lg:px-8 text-white relative overflow-hidden shadow-xl">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#14B8A6_1px,transparent_1px),linear-gradient(to_bottom,#14B8A6_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-10 pointer-events-none" />
          
          <div className="absolute -top-32 -left-32 w-96 h-96 bg-teal-400/20 dark:bg-[#14B8A6]/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-emerald-400/20 dark:bg-emerald-600/20 rounded-full blur-3xl pointer-events-none" />
          
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#0F766E_100%)] dark:bg-[radial-gradient(circle_at_center,transparent_0%,#020617_100%)] pointer-events-none" />
          
          <motion.div 
            initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            style={{ willChange: "transform, opacity" }}
            className="relative z-10 max-w-2xl mx-auto flex flex-col gap-8 items-center"
          >
            <h2 className="text-4xl lg:text-5xl font-bold leading-tight drop-shadow-sm">{t("featuresCTATitle")}</h2>
            <Link href="/home">
              <Button size="lg" className="bg-white text-[#0F766E] hover:bg-[#F0FDFA] dark:bg-[#020617] dark:text-[#14B8A6] dark:hover:bg-[#0F172A] font-bold text-lg px-10 py-7 rounded-xl shadow-xl transition-[box-shadow,transform] hover:-translate-y-1 hover:shadow-2xl ring-4 ring-white/20 dark:ring-black/20 cursor-pointer">
                {t("featuresCTABtn")}
              </Button>
            </Link>
          </motion.div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
