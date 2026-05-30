"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "./ui/button";
import { signIn } from "next-auth/react";
import { Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger, SheetTitle, SheetHeader, SheetDescription } from "@/components/ui/sheet";

export function PublicNavbar() {
  const [isOpen, setIsOpen] = useState(false);

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
    <nav className="fixed top-0 w-full z-50 bg-white/90 backdrop-blur-md border-b border-outline-variant/20 transition-all">
      <div className="flex justify-between items-center h-16 px-lg max-w-container-max mx-auto px-6 lg:px-8">
        {/* Brand */}
        <Link 
          href="/" 
          className="text-2xl font-bold text-[#0F766E] tracking-tight flex items-center gap-2"
        >
          <Image
            src="/assets/cakap.ai-logo.webp"
            alt="Cakap.AI logo"
            width={50}
            height={50}
            className="object-contain"
            priority
          />
          Cakap.AI
        </Link>

        {/* Navigation Links */}
        <div className="hidden md:flex items-center gap-8">
          <Link 
            href="#features" 
            className="text-[#3E4947] font-medium hover:text-[#0F766E] transition-colors duration-200"
          >
            Features
          </Link>
          <Link 
            href="#methodology" 
            className="text-[#3E4947] font-medium hover:text-[#0F766E] transition-colors duration-200"
          >
            Methodology
          </Link>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-4">
          <Button 
            variant="ghost" 
            className="text-[#3E4947] hover:text-[#0F766E] hover:bg-transparent hidden sm:flex"
            onClick={() => signIn("google", { callbackUrl: "/home" })}
          >
            Login
          </Button>
          <Button 
            className="bg-[#0F766E] text-white hover:bg-[#005C55] shadow-sm transition-all duration-200 hidden sm:flex"
            onClick={() => signIn("google", { callbackUrl: "/home" })}
          >
            Sign Up
          </Button>

          <div className="flex md:hidden">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="text-[#3E4947]">
                  <Menu size={24} />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[350px] p-6">
                <SheetHeader className="p-0">
                  <SheetTitle className="text-left">
                    <div className="flex items-center gap-2">
                      <Image
                        src="/assets/cakap.ai-logo.webp"
                        alt="Cakap.AI logo"
                        width={32}
                        height={32}
                        className="object-contain"
                      />
                      <span className="text-xl font-bold text-[#0F766E] tracking-tight">Cakap.AI</span>
                    </div>
                  </SheetTitle>
                  <SheetDescription className="sr-only">Public Navigation Menu</SheetDescription>
                </SheetHeader>
                <div className="flex flex-col space-y-4 mt-8">
                  <Link href="#features" className="text-lg font-medium text-muted-foreground hover:text-primary transition-colors">Features</Link>
                  <Link href="#methodology" className="text-lg font-medium text-muted-foreground hover:text-primary transition-colors">Methodology</Link>
                </div>
                <hr className="my-6 border-border" />
                <div className="flex flex-col gap-3">
                  <Button variant="outline" className="w-full text-[#3E4947]" onClick={() => signIn("google", { callbackUrl: "/home" })}>Login</Button>
                  <Button className="w-full bg-[#0F766E] text-white hover:bg-[#005C55]" onClick={() => signIn("google", { callbackUrl: "/home" })}>Sign Up</Button>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
}
