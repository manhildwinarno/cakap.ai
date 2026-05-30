"use client";

import Link from "next/link";
import { Button } from "./ui/button";
import { signIn } from "next-auth/react";
import { Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

export function PublicNavbar() {
  return (
    <nav className="fixed top-0 w-full z-50 bg-white/90 backdrop-blur-md border-b border-outline-variant/20 transition-all">
      <div className="flex justify-between items-center h-16 px-lg max-w-container-max mx-auto px-6 lg:px-8">
        {/* Brand */}
        <Link 
          href="/" 
          className="text-2xl font-bold text-[#0F766E] tracking-tight flex items-center gap-2"
        >
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
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="text-[#3E4947]">
                  <Menu size={24} />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[250px] sm:w-[300px]">
                <div className="flex flex-col gap-6 mt-8">
                  <Link href="#features" className="text-lg font-medium text-[#3E4947]">Features</Link>
                  <Link href="#methodology" className="text-lg font-medium text-[#3E4947]">Methodology</Link>
                  <div className="flex flex-col gap-3 mt-4">
                    <Button variant="outline" className="w-full text-[#3E4947]" onClick={() => signIn("google", { callbackUrl: "/home" })}>Login</Button>
                    <Button className="w-full bg-[#0F766E] text-white hover:bg-[#005C55]" onClick={() => signIn("google", { callbackUrl: "/home" })}>Sign Up</Button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
}
