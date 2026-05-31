"use client";

import Link from "next/link";
import { PublicNavbar } from "@/components/public-navbar";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import dynamic from "next/dynamic";

const Footer = dynamic(() => import("@/components/footer").then((mod) => mod.Footer));
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Building2 } from "lucide-react";
import { useLanguage } from "@/components/language-provider";
import { JOB_LISTINGS } from "./job-listings";

export default function JobsPage() {
  const { t, language } = useLanguage();

  return (
    <div className="min-h-screen bg-[#F8FAFC] dark:bg-[#020617] flex flex-col font-sans text-[#0F172A] dark:text-[#F8FAFC] relative overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,#0F766E0a_1px,transparent_1px),linear-gradient(to_bottom,#0F766E0a_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#14B8A60a_1px,transparent_1px),linear-gradient(to_bottom,#14B8A60a_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[400px] bg-teal-400/5 dark:bg-teal-600/5 rounded-full blur-3xl pointer-events-none" />
      
      <PublicNavbar />

      <main className="flex-grow pt-40 pb-24 px-6 lg:px-8 max-w-[1280px] mx-auto w-full">
        <section className="text-center mb-24">
          <h1 className="text-4xl lg:text-5xl font-extrabold text-[#0F172A] dark:text-white mb-6">
            {t("jobsHeroTitle")}
          </h1>
          <p className="text-xl text-[#64748B] dark:text-[#94A3B8] max-w-2xl mx-auto">
            {t("jobsHeroSubtitle")}
          </p>
        </section>

        <section>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {JOB_LISTINGS.map((job) => (
              <div key={job.id} className="h-full">
                <Card className="h-full flex flex-col hover:shadow-xl transition-shadow duration-300 border-[#E2E8F0] dark:border-[#1E293B] bg-white dark:bg-[#0F172A]">
                  <CardHeader>
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex items-center gap-2 text-[#475569] dark:text-[#94A3B8] text-sm font-semibold">
                        <Building2 size={16} className="text-[#0F766E] dark:text-[#14B8A6]" />
                        <span>{job.company}</span>
                      </div>
                      <Badge variant="secondary" className="bg-[#F1F5F9] dark:bg-[#1E293B] text-[#475569] dark:text-[#CBD5E1] font-medium border border-[#E2E8F0] dark:border-[#334155]">
                        {job.type[language]}
                      </Badge>
                    </div>
                    <CardTitle className="text-2xl font-extrabold text-[#0F172A] dark:text-white leading-tight">
                      {job.role[language]}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="flex-grow">
                    <p className="text-[#475569] dark:text-[#94A3B8] leading-relaxed line-clamp-4">
                      {job.description[language]}
                    </p>
                  </CardContent>
                  <CardFooter className="pt-4 pb-6">
                    <Link 
                      href={`/home?role=${encodeURIComponent(job.role[language])}&jd=${encodeURIComponent(job.description[language])}`}
                      className="w-full"
                    >
                      <Button className="w-full bg-[#0F766E] dark:bg-[#0D9488] hover:bg-[#0D655E] dark:hover:bg-[#0F766E] text-white font-bold py-6 text-md rounded-xl shadow-md hover:shadow-lg transition-shadow hover:-translate-y-0.5 cursor-pointer">
                        {t("jobsCTA")}
                      </Button>
                    </Link>
                  </CardFooter>
                </Card>
              </div>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
