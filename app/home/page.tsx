"use client";

import { useState, useEffect, Suspense, useMemo } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { PrivateNavbar } from "@/components/private-navbar";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Lightbulb } from "lucide-react";
import { useLanguage } from "@/components/language-provider";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

interface FormValues {
  targetRole: string;
  jobDescription: string;
  language: string;
  interviewStyle: string;
}

// Static schema shape — defined ONCE at module level, never reconstructed.
// Only the user-facing error message strings (from t()) vary per language change.
const ROLE_REGEX = /(.)\1{4,}/;
const MIN_JD_WORDS = 5;

function buildFormSchema(messages: { roleLength: string; gibberish: string; descLength: string }) {
  return z.object({
    targetRole: z
      .string()
      .min(5, messages.roleLength)
      .refine((val) => !ROLE_REGEX.test(val), messages.gibberish),
    jobDescription: z
      .string()
      .min(30, messages.descLength)
      .refine((val) => val.trim().split(/\s+/).length >= MIN_JD_WORDS, messages.descLength),
    language: z.string(),
    interviewStyle: z.string(),
  });
}

export default function HomeDashboard() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-background flex flex-col font-sans text-foreground">
        <PrivateNavbar />
        <main className="flex-grow pt-28 flex items-center justify-center">
          <div className="text-xl text-[#0F766E] dark:text-[#14B8A6] font-medium animate-pulse">Loading dashboard...</div>
        </main>
      </div>
    }>
      <HomeDashboardContent />
    </Suspense>
  );
}

function HomeDashboardContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { t, language: globalLang } = useLanguage();
  
  // Only rebuild the schema when error message strings change (language switch).
  // The structural Zod rules (regex, min counts) stay as module-level constants.
  const formSchema = useMemo(
    () =>
      buildFormSchema({
        roleLength: t("errors.roleLength"),
        gibberish: t("errors.gibberish"),
        descLength: t("errors.descLength"),
      }),
    [t]
  );

  const [isInitializing, setIsInitializing] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      targetRole: "",
      jobDescription: "",
      language: "en",
      interviewStyle: "strict_hr",
    },
  });

  const { formState: { errors } } = form;

  useEffect(() => {
    if (globalLang) {
      form.setValue("language", globalLang);
    }
  }, [globalLang, form]);

  useEffect(() => {
    const roleParam = searchParams.get("role");
    const jdParam = searchParams.get("jd");
    
    if (roleParam) {
      form.setValue("targetRole", roleParam);
    }
    if (jdParam) {
      form.setValue("jobDescription", jdParam);
    }
  }, [searchParams, form]);

  const onSubmit = async (values: FormValues) => {
    setIsInitializing(true);
    
    try {
      const response = await fetch("/api/session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          jobDescription: values.jobDescription,
          targetRole: values.targetRole,
          language: values.language,
          interviewStyle: values.interviewStyle,
          totalQuestions: 5,
        }),
      });
      
      const data = await response.json();
      if (data.sessionId) {
        router.push(`/simulation?sessionId=${data.sessionId}`);
      } else {
        console.error("No sessionId returned");
        setIsInitializing(false);
      }
    } catch (error) {
      console.error(error);
      setIsInitializing(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col font-sans text-foreground">
      <PrivateNavbar />

      <main className="flex-grow pt-28 pb-16 px-6 lg:px-8 max-w-[1280px] mx-auto w-full">
        <div className="flex flex-col lg:flex-row gap-8">
          
          <div className="w-full lg:w-[65%] flex flex-col gap-8">
            <div>
              <h1 className="text-3xl font-bold text-foreground">{t("homeTitle")}</h1>
            </div>

            <Card className="bg-card rounded-2xl shadow-sm border border-border dark:border-white/10 p-8 flex flex-col gap-6 hover:shadow-md transition-shadow duration-300">
              <h2 className="text-2xl font-bold text-card-foreground">{t("homeSetupTitle")}</h2>

              <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-6">
                <div className="space-y-2">
                  <Label htmlFor="role-input" className="block text-sm font-semibold text-foreground tracking-wide mb-2">
                    {t("homeRoleLabel")}
                  </Label>
                  <Input 
                    id="role-input"
                    placeholder={t("homeRolePlaceholder")} 
                    {...form.register("targetRole")}
                    className={`border-border focus-visible:ring-[#0F766E] dark:focus-visible:ring-[#14B8A6] bg-background text-foreground text-base p-4 rounded-lg h-auto ${errors.targetRole ? "border-destructive focus-visible:ring-destructive" : ""}`}
                  />
                  {errors.targetRole && (
                    <p className="text-sm text-destructive font-medium mt-1">{errors.targetRole.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="topic-input" className="block text-sm font-semibold text-foreground tracking-wide mb-2">
                    {t("homeTopicLabel")}
                  </Label>
                  <Textarea 
                    id="topic-input"
                    placeholder={t("homeTopicPlaceholder")} 
                    {...form.register("jobDescription")}
                    className={`min-h-[120px] resize-none border-border focus-visible:ring-[#0F766E] dark:focus-visible:ring-[#14B8A6] bg-background text-foreground text-base p-4 rounded-lg ${errors.jobDescription ? "border-destructive focus-visible:ring-destructive" : ""}`}
                  />
                  {errors.jobDescription && (
                    <p className="text-sm text-destructive font-medium mt-1">{errors.jobDescription.message}</p>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label className="block text-sm font-semibold text-foreground tracking-wide mb-2">{t("homeLangLabel")}</Label>
                    <div className="flex bg-muted rounded-lg p-1">
                      <Button 
                        type="button"
                        variant="ghost"
                        onClick={() => form.setValue("language", "en")}
                        className={`flex-1 py-2 h-auto text-center rounded-md shadow-sm text-sm font-medium transition-colors ${form.watch("language") === 'en' ? 'bg-background text-foreground dark:bg-[#0F766E] dark:text-white hover:bg-background hover:text-foreground dark:hover:bg-[#0F766E]' : 'hover:bg-accent text-muted-foreground'}`}
                      >
                        English
                      </Button>
                      <Button 
                        type="button"
                        variant="ghost"
                        onClick={() => form.setValue("language", "id")}
                        className={`flex-1 py-2 h-auto text-center rounded-md shadow-sm text-sm font-medium transition-colors ${form.watch("language") === 'id' ? 'bg-background text-foreground dark:bg-[#0F766E] dark:text-white hover:bg-background hover:text-foreground dark:hover:bg-[#0F766E]' : 'hover:bg-accent text-muted-foreground'}`}
                      >
                        Bahasa Indonesia
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="style-select" className="block text-sm font-semibold text-foreground tracking-wide mb-2">
                      {t("homeStyleLabel")}
                    </Label>
                    <Select 
                      onValueChange={(value) => form.setValue("interviewStyle", value)}
                      value={form.watch("interviewStyle")}
                    >
                      <SelectTrigger id="style-select" className="w-full h-auto py-[10px] rounded-lg border border-border bg-background px-4 text-base text-foreground focus:ring-[#0F766E] dark:focus:ring-[#14B8A6]">
                        <SelectValue placeholder={t("homeStyleLabel")} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="strict_hr">{t("homeStyleStrict")}</SelectItem>
                        <SelectItem value="technical">{t("homeStyleTech")}</SelectItem>
                        <SelectItem value="casual">{t("homeStyleCasual")}</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="pt-4 mt-2">
                  <Button 
                    type="submit"
                    disabled={isInitializing}
                    className="w-full bg-[#0F766E] dark:bg-[#0D9488] text-white font-semibold text-base py-6 rounded-lg shadow-sm hover:shadow-md hover:-translate-y-[1px] transition-[box-shadow,transform] duration-200 disabled:opacity-70 disabled:hover:translate-y-0 cursor-pointer"
                  >
                    {isInitializing ? t("homeInitializing") : t("homeInitBtn")}
                  </Button>
                </div>
              </form>
            </Card>
          </div>

          <div className="w-full lg:w-[35%] flex flex-col gap-6 mt-2 lg:mt-[52px]">
            <Card className="bg-[#F0FDFA] dark:bg-card rounded-2xl shadow-sm border border-[#80D5CB]/40 dark:border-white/10 p-6 hover:shadow-md transition-shadow duration-300">
              <div className="flex items-start gap-4">
                <Lightbulb className="text-[#0F766E] dark:text-[#14B8A6] shrink-0 mt-0.5" size={24} />
                <p className="text-sm text-muted-foreground leading-relaxed">
                  <span className="font-semibold">{t("homeTipLabel")}</span> {t("homeTipDesc")}
                </p>
              </div>
            </Card>
          </div>

        </div>
      </main>
    </div>
  );
}
