"use client";

import Image from "next/image";
import { PublicNavbar } from "@/components/public-navbar";
import { User } from "lucide-react";
import dynamic from "next/dynamic";
import { HeroCard } from "@/components/hero-card";
import { useLanguage } from "@/components/language-provider";

// Below-the-fold only — safe to lazy-load
const Footer = dynamic(() => import("@/components/footer").then((mod) => mod.Footer));
const LandingFaq = dynamic(() => import("@/components/landing-faq").then((mod) => mod.LandingFaq));

export default function LandingPage() {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-[#F8FAFC] dark:bg-[#020617] flex flex-col font-sans text-[#0F172A] dark:text-[#F8FAFC] overflow-x-hidden">
      <PublicNavbar />

      <main className="flex-grow pt-32 pb-0 px-6 lg:px-8 max-w-[1280px] mx-auto w-full">
        <section className="relative grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center mb-32 pt-8 lg:pt-12">
          <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,#0F766E15_1px,transparent_1px),linear-gradient(to_bottom,#0F766E15_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#14B8A615_1px,transparent_1px),linear-gradient(to_bottom,#14B8A615_1px,transparent_1px)] bg-[size:32px_32px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] -mx-4 sm:-mx-8 lg:-mx-12" />
          
          {/* LEFT COLUMN — purely static, SSR-rendered */}
          <div className="flex flex-col gap-6">
            <h1 className="text-5xl lg:text-7xl font-extrabold leading-tight tracking-tight text-[#0F172A] dark:text-white">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#0F766E] to-emerald-400 dark:from-[#14B8A6] dark:to-emerald-300">{t("heroTitle")}</span>{" "}
              <br className="hidden lg:block" />
              {t("heroSubtitle")}
            </h1>
            <p className="text-lg text-[#3E4947] dark:text-[#94A3B8] max-w-lg">
              {t("heroDescription")}
            </p>

            {/* Interactive CTA card — tiny client island */}
            <HeroCard />

            {/* Social proof — static HTML, no JS */}
            <div className="flex items-center gap-4 mt-8">
              <div className="flex -space-x-2">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="w-8 h-8 rounded-full bg-[#E2E8F0] dark:bg-[#1E293B] border-2 border-white dark:border-[#020617] flex items-center justify-center text-[#64748B] dark:text-[#94A3B8]">
                    <User size={15} className="text-[#0F766E] dark:text-[#14B8A6]"/>
                  </div>
                ))}
              </div>
              <p className="text-sm text-[#4A5568] dark:text-[#94A3B8]">
                {t("heroTrusted")}
              </p>
            </div>
          </div>

          {/* Hero mockup — CSS float animation, zero JS */}
          <div className="relative flex justify-center lg:justify-end w-full max-w-[600px] mx-auto aspect-square hero-float">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(15,118,110,0.1)_0%,transparent_70%)] -z-10" />
              <Image
                src="/assets/hero-mockup.avif"
                alt="Cakap.AI Interview Readiness Score"
                fill
                className="object-contain drop-shadow-2xl"
                sizes="(max-width: 768px) 100vw, 50vw"
                quality={85}
                fetchPriority="high"
                priority
              />
          </div>
        </section>

        <section id="how-it-works" className="py-24 mb-16 rounded-3xl bg-white dark:bg-[#0F172A] shadow-sm px-8 lg:px-16 -mx-6 lg:-mx-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-[#0F172A] dark:text-white">{t("stepsHeader")}</h2>
          </div>
          <div className="flex flex-col gap-20">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <p className="text-sm font-bold text-[#0F766E] dark:text-[#14B8A6] uppercase tracking-wider mb-2">{t("step")} 1</p>
                <h3 className="text-3xl font-bold text-[#0F172A] dark:text-white mb-4">{t("step1Title")}</h3>
                <p className="text-lg text-[#3E4947] dark:text-[#94A3B8]">{t("step1Desc")}</p>
              </div>
              <div className="order-last lg:order-first">
                <div className="w-full aspect-video bg-[#F1F5F9] dark:bg-[#020617] rounded-2xl border-4 border-slate-300 dark:border-slate-700 shadow-inner flex items-center justify-center relative overflow-hidden">
                  <div className="absolute top-0 w-full h-8 bg-[#E2E8F0] dark:bg-[#1E293B] flex items-center px-4 gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-400"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                    <div className="w-3 h-3 rounded-full bg-green-400"></div>
                  </div>
                  <div className="text-slate-600 dark:text-slate-300 font-medium flex flex-col items-center gap-2 mt-8">
                    <span className="text-4xl">📋</span>
                    <span>Paste your job description here</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="order-last lg:order-first">
                <div className="w-full aspect-[4/3] bg-[#F1F5F9] dark:bg-[#020617] rounded-3xl border-8 border-[#0F172A] dark:border-[#1E293B] shadow-xl flex items-center justify-center relative overflow-hidden">
                  <div className="text-slate-600 dark:text-slate-300 font-medium flex flex-col items-center gap-2">
                    <User size={32} />
                    <span>Video Placeholder: Chat UI</span>
                  </div>
                </div>
              </div>
              <div>
                <p className="text-sm font-bold text-[#0F766E] dark:text-[#14B8A6] uppercase tracking-wider mb-2">{t("step")} 2</p>
                <h3 className="text-3xl font-bold text-[#0F172A] dark:text-white mb-4">{t("step2Title")}</h3>
                <p className="text-lg text-[#3E4947] dark:text-[#94A3B8]">{t("step2Desc")}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <p className="text-sm font-bold text-[#0F766E] dark:text-[#14B8A6] uppercase tracking-wider mb-2">{t("step")} 3</p>
                <h3 className="text-3xl font-bold text-[#0F172A] dark:text-white mb-4">{t("step3Title")}</h3>
                <p className="text-lg text-[#3E4947] dark:text-[#94A3B8]">{t("step3Desc")}</p>
              </div>
              <div className="order-first lg:order-last">
                <div className="w-full aspect-[16/10] bg-gradient-to-br from-[#F0FDFA] to-[#CCFBF1] dark:from-[#0F172A] dark:to-[#020617] rounded-2xl border border-[#99F6E4] dark:border-[#1E293B] shadow-md flex items-center justify-center">
                  <div className="text-[#0F766E] dark:text-[#14B8A6] font-medium flex flex-col items-center gap-2">
                    <Image
                      src="/assets/hero-mockup.avif"
                      alt="Cakap.AI Interview Readiness Score"
                      width={300}
                      height={300}
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="object-contain opacity-50"
                    />
                    <span>Image Placeholder: Score Dashboard</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-24 bg-[#0F766E] dark:bg-[#020617] relative w-[100vw] left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] px-6 dark:border-[#1E293B] overflow-hidden shadow-xl">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff15_1px,transparent_1px),linear-gradient(to_bottom,#ffffff15_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#14B8A6_1px,transparent_1px),linear-gradient(to_bottom,#14B8A6_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-30 dark:opacity-10 pointer-events-none" />
          <div className="absolute -top-32 -left-32 w-96 h-96 bg-teal-400/20 dark:bg-[#14B8A6]/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-emerald-400/20 dark:bg-emerald-600/10 rounded-full blur-3xl pointer-events-none" />
          
          <LandingFaq />
        </section>
      </main>

      <Footer />
    </div>
  );
}
