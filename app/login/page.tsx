"use client";

import { Suspense } from "react";
import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Mail } from "lucide-react";
import Image from "next/image";

function LoginContent() {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/home";

  return (
    <Card className="w-full max-w-md border border-border shadow-xl bg-card rounded-2xl overflow-hidden relative z-10">
      <CardHeader className="text-center pb-6 pt-10">
        <div className="flex justify-center mb-4">
          <Image
            src="/assets/cakap.ai-logo.avif"
            alt="Cakap.AI logo"
            width={64}
            height={64}
            className="object-contain drop-shadow-sm dark:brightness-0 dark:invert"
          />
        </div>
        <CardTitle className="text-3xl font-extrabold text-foreground tracking-tight">Selamat Datang di Cakap.AI</CardTitle>
        <CardDescription className="text-base text-muted-foreground mt-2">
          Masuk atau Daftar untuk mulai berlatih wawancara menggunakan AI.
        </CardDescription>
      </CardHeader>
      <CardContent className="px-8 pb-10">
        <Button
          variant="outline"
          className="w-full py-6 text-lg font-bold rounded-xl shadow-sm transition-all hover:-translate-y-0.5 flex items-center gap-3 justify-center cursor-pointer bg-background"
          onClick={() => signIn("google", { callbackUrl })}
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24">
            <path
              fill="#4285F4"
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            />
            <path
              fill="#34A853"
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            />
            <path
              fill="#FBBC05"
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
            />
            <path
              fill="#EA4335"
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
            />
          </svg>
          Continue with Google
        </Button>
      </CardContent>
    </Card>
  );
}

export default function LoginPage() {
  return (
    <div className="min-h-screen relative overflow-hidden bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/5 via-background to-background flex flex-col items-center justify-center p-6 font-sans">
      <div className="relative z-10 w-full flex justify-center">
        <Suspense fallback={<div className="text-center p-10 text-primary">Loading...</div>}>
          <LoginContent />
        </Suspense>
      </div>
    </div>
  );
}
