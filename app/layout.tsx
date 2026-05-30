import type { Metadata } from "next";
import { Inter, Geist_Mono } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { SmoothScrollProvider } from "@/components/providers/smooth-scroll-provider";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Cakap.AI — AI-Powered Interview & Presentation Coach",
  description:
    "Practice interviews with an AI coach that evaluates your responses using the S.T.A.R. methodology. Get actionable feedback, readiness scores, and improve your communication skills.",
  keywords: [
    "AI interview coach",
    "mock interview",
    "STAR method",
    "presentation practice",
    "Cakap AI",
  ],
};

import { NextAuthProvider } from "@/components/providers/session-provider";
import { Toaster } from "@/components/ui/sonner";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={cn(inter.variable, geistMono.variable)}
      suppressHydrationWarning
    >
      <body className={cn("min-h-dvh flex flex-col antialiased", inter.className)}>
        <NextAuthProvider>
          <SmoothScrollProvider>
            {children}
            <Toaster position="top-center" />
          </SmoothScrollProvider>
        </NextAuthProvider>
      </body>
    </html>
  );
}

