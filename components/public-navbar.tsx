"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "./ui/button";
import { Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger, SheetTitle, SheetHeader, SheetDescription } from "@/components/ui/sheet";
import { ThemeToggle } from "@/components/theme-toggle";
import { LanguageToggle } from "@/components/language-toggle";
import { useLanguage } from "@/components/language-provider";

export function PublicNavbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { t } = useLanguage();

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <nav className="fixed top-0 w-full z-50 bg-white/90 dark:bg-[#020617]/90 backdrop-blur-md border-b border-outline-variant/20 dark:border-[#1E293B] transition-all">
      <div className="flex justify-between items-center h-16 px-3 sm:px-6 max-w-container-max mx-auto lg:px-8">
        <Link 
          href="/" 
          className="text-xl md:text-2xl font-bold text-[#0F766E] dark:text-white tracking-tight flex items-center gap-2"
        >
          <Image
            src="/assets/cakap.ai-logo.avif"
            alt="Cakap.AI logo"
            width={50}
            height={50}
            className="object-contain dark:brightness-0 dark:invert w-8 h-8 md:w-[50px] md:h-[50px]"
            priority
          />
          <span className="hidden sm:block">Cakap.AI</span>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          <Link 
            href="/#how-it-works" 
            className="text-[#3E4947] dark:text-[#CBD5E1] font-medium hover:text-[#0F766E] dark:hover:text-[#14B8A6] transition-colors duration-200"
          >
            {t("navHowItWorks")}
          </Link>
          <Link 
            href="/features" 
            className="text-[#3E4947] dark:text-[#CBD5E1] font-medium hover:text-[#0F766E] dark:hover:text-[#14B8A6] transition-colors duration-200"
          >
            {t("navFeatures")}
          </Link>
          <Link 
            href="/jobs" 
            className="text-[#3E4947] dark:text-[#CBD5E1] font-medium hover:text-[#0F766E] dark:hover:text-[#14B8A6] transition-colors duration-200"
          >
            {t("navJobs")}
          </Link>
        </div>

        <div className="flex items-center gap-1 sm:gap-4">
          <LanguageToggle />
          <ThemeToggle />
          <Link href="/login" className="hidden sm:flex">
            <Button 
              className="bg-[#0F766E] text-white hover:bg-[#005C55] shadow-sm transition-all duration-200 cursor-pointer font-medium"
            >
              {t("navLogin")} / {t("navSignUp")}
            </Button>
          </Link>

          <div className="flex md:hidden">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" aria-label="Open mobile menu" className="text-[#3E4947] dark:text-[#CBD5E1] ml-0 sm:ml-2">
                  <Menu size={24} />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[350px] p-6 dark:bg-[#0F172A] dark:border-[#1E293B]">
                <SheetHeader className="p-0">
                  <SheetTitle className="text-left">
                    <div className="flex items-center gap-2">
                      <Image
                        src="/assets/cakap.ai-logo.avif"
                        alt="Cakap.AI logo"
                        width={32}
                        height={32}
                        className="object-contain"
                      />
                      <span className="text-xl font-bold text-[#0F766E] dark:text-[#14B8A6] tracking-tight">Cakap.AI</span>
                    </div>
                  </SheetTitle>
                  <SheetDescription className="sr-only">Public Navigation Menu</SheetDescription>
                </SheetHeader>
                <div className="flex flex-col space-y-4 mt-8">
                  <Link href="/#how-it-works" className="text-lg font-medium text-[#3E4947] dark:text-[#CBD5E1] hover:text-[#0F766E] dark:hover:text-[#14B8A6] transition-colors" onClick={() => setIsOpen(false)}>{t("navHowItWorks")}</Link>
                  <Link href="/features" className="text-lg font-medium text-[#3E4947] dark:text-[#CBD5E1] hover:text-[#0F766E] dark:hover:text-[#14B8A6] transition-colors" onClick={() => setIsOpen(false)}>{t("navFeatures")}</Link>
                  <Link href="/jobs" className="text-lg font-medium text-[#3E4947] dark:text-[#CBD5E1] hover:text-[#0F766E] dark:hover:text-[#14B8A6] transition-colors" onClick={() => setIsOpen(false)}>{t("navJobs")}</Link>
                </div>
                <hr className="my-6 border-[#E2E8F0] dark:border-[#1E293B]" />
                <div className="flex flex-col gap-3">
                  <Link href="/login" className="w-full" onClick={() => setIsOpen(false)}>
                    <Button className="w-full bg-[#0F766E] text-white hover:bg-[#005C55]">
                      {t("navLogin")} / {t("navSignUp")}
                    </Button>
                  </Link>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
}
