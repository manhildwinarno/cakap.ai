"use client"

import * as React from "react"
import { Globe } from "lucide-react"

import { Button } from "@/components/ui/button"
import { useLanguage } from "@/components/language-provider"

export function LanguageToggle() {
  const { language, setLanguage } = useLanguage()

  const toggleLanguage = () => {
    setLanguage(language === "id" ? "en" : "id")
  }

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={toggleLanguage}
      aria-label="Toggle language"
      className="text-muted-foreground hover:text-foreground font-medium flex items-center gap-2 cursor-pointer"
    >
      <Globe className="h-[1.2rem] w-[1.2rem]" />
      <span className="hidden sm:inline">{language.toUpperCase()}</span>
      <span className="sr-only">Toggle language</span>
    </Button>
  )
}
