"use client";

import Link from "next/link";
import Image from "next/image";
import { useLanguage } from "@/components/language-provider";
import { XIcon, GithubIcon, InstagramIcon } from "@/components/icons";


export function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="bg-[#F8FAFC] dark:bg-[#020617] text-[#0F172A] dark:text-white pt-10 pb-5 mt-auto border-t border-[#E2E8F0] dark:border-[#1E293B]">
      <div className="max-w-[1280px] mx-auto px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-12 border-b border-[#E2E8F0] dark:border-[#1E293B] pb-12">
        <div className="col-span-1 md:col-span-2">
          <Link href="/" className="text-2xl font-bold text-[#0F766E] dark:text-white tracking-tight flex items-center gap-2 mb-4">
            <Image
              src="/assets/cakap.ai-logo.avif"
              alt="Cakap.AI logo"
              width={40}
              height={40}
              className="object-contain dark:brightness-0 dark:invert"
            />
            Cakap.AI
          </Link>
          <p className="text-[#475569] dark:text-[#94A3B8] max-w-sm text-sm">
            {t("footerTagline")}
          </p>
        </div>
        <div>
          <p className="font-semibold text-sm mb-4 text-[#0F172A] dark:text-white uppercase tracking-wider">{t("footerQuickLinks")}</p>
          <div className="flex flex-col gap-3 text-sm text-[#475569] dark:text-[#94A3B8]">
            <Link href="/#how-it-works" className="hover:text-[#0F766E] dark:hover:text-white transition-colors">{t("navHowItWorks")}</Link>
            <Link href="/features" className="hover:text-[#0F766E] dark:hover:text-white transition-colors">{t("navFeatures")}</Link>
            <Link href="/jobs" className="hover:text-[#0F766E] dark:hover:text-white transition-colors">{t("navJobs")}</Link>
          </div>
        </div>
        <div>
          <p className="font-semibold text-sm mb-4 text-[#0F172A] dark:text-white uppercase tracking-wider">{t("footerSocial")}</p>
          <div className="flex items-center gap-4 text-[#475569] dark:text-[#94A3B8]">
            <Link href="https://twitter.com/manhillih" aria-label="X (Twitter) profile" className="hover:text-[#0F766E] dark:hover:text-white transition-colors" target="_blank" rel="noopener noreferrer">
              <XIcon className="w-5 h-5" />
            </Link>
            <Link href="https://github.com/manhildwinarno" aria-label="GitHub profile" className="hover:text-[#0F766E] dark:hover:text-white transition-colors" target="_blank" rel="noopener noreferrer">
              <GithubIcon className="w-5 h-5" />
            </Link>
            <Link href="https://www.instagram.com/manhillih/" aria-label="Instagram profile" className="hover:text-[#0F766E] dark:hover:text-white transition-colors" target="_blank" rel="noopener noreferrer">
              <InstagramIcon className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </div>
      <div className="max-w-[1280px] mx-auto px-5 lg:px-8 pt-6 text-center text-[#475569] dark:text-[#94A3B8] text-xs">
        {t("footerCopyright")}
      </div>
    </footer>
  );
}
