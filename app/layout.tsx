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
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"),
  title: "Cakap.AI — AI-Powered Interview & Presentation Coach",
  description: "Platform simulasi wawancara cerdas dengan evaluasi S.T.A.R terstruktur yang ditenagai oleh AI.",
  keywords: [
    "AI interview coach",
    "mock interview",
    "STAR method",
    "presentation practice",
    "Cakap AI",
  ],
  applicationName: "Cakap.AI",
  authors: [{ name: "Cakap.AI Team" }],
  creator: "Cakap.AI",
  openGraph: {
    title: "Cakap.AI — AI-Powered Interview & Presentation Coach",
    description: "Platform simulasi wawancara cerdas dengan evaluasi S.T.A.R terstruktur yang ditenagai oleh AI.",
    images: [{ url: "/images/og-image.png", width: 1200, height: 630 }],
    type: "website",
    siteName: "Cakap.AI",
  },
  twitter: {
    card: "summary_large_image",
    title: "Cakap.AI — AI-Powered Interview & Presentation Coach",
    description: "Platform simulasi wawancara cerdas dengan evaluasi S.T.A.R terstruktur yang ditenagai oleh AI.",
    images: ["/images/og-image.png"],
  },
};

import { NextAuthProvider } from "@/components/providers/session-provider";
import { Toaster } from "@/components/ui/sonner";
import { ThemeProvider } from "@/components/theme-provider";
import { LanguageProvider } from "@/components/language-provider";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={cn(inter.variable, geistMono.variable)}
      suppressHydrationWarning
    >
      <body className={cn("min-h-dvh flex flex-col antialiased overflow-x-hidden", inter.className)}>
        <NextAuthProvider>
          <LanguageProvider>
            <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
              <SmoothScrollProvider>
              {children}
              <Toaster position="top-center" />
            </SmoothScrollProvider>
          </ThemeProvider>
          </LanguageProvider>
        </NextAuthProvider>
      </body>
    </html>
  );
}

