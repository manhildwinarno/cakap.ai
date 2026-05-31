"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Bell, LogOut, Menu, PartyPopper, Briefcase } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSession, signOut } from "next-auth/react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
  SheetHeader,
  SheetDescription
} from "@/components/ui/sheet";
import { ThemeToggle } from "@/components/theme-toggle";
import { LanguageToggle } from "@/components/language-toggle";
import { useLanguage } from "@/components/language-provider";

export function PrivateNavbar({ activeTab = 'home' }: { activeTab?: 'home' | 'history' | 'results' }) {
  const [isOpen, setIsOpen] = useState(false);
  const [hasUnread, setHasUnread] = useState(true);
  const { data: session } = useSession();
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

  const userInitial = session?.user?.name ? session.user.name.charAt(0).toUpperCase() : "U";

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-white/90 dark:bg-[#020617]/90 backdrop-blur-md border-b border-[#E2E8F0] dark:border-[#1E293B] h-16 flex items-center">
      <div className="max-w-[1280px] mx-auto w-full flex justify-between items-center px-3 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2 md:gap-8">
          <Link 
            href="/home" 
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
          
          <div className="hidden md:flex gap-6 items-center h-16">
            <Link 
              href="/home" 
              className={`font-medium relative h-full flex items-center transition-colors duration-200 ${
                activeTab === 'home' ? 'text-[#0F172A] dark:text-white' : 'text-[#3E4947] dark:text-[#CBD5E1] hover:text-[#0F766E] dark:hover:text-[#14B8A6]'
              }`}
            >
              {t("navHome")}
              {activeTab === 'home' && <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#0F766E]"></span>}
            </Link>
            <Link 
              href="/history" 
              className={`font-medium relative h-full flex items-center transition-colors duration-200 ${
                activeTab === 'history' ? 'text-[#0F172A] dark:text-white' : 'text-[#3E4947] dark:text-[#CBD5E1] hover:text-[#0F766E] dark:hover:text-[#14B8A6]'
              }`}
            >
              {t("navHistory")}
              {activeTab === 'history' && <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#0F766E]"></span>}
            </Link>
          </div>
        </div>

        <div className="flex items-center gap-0 sm:gap-2">
          <LanguageToggle />
          <ThemeToggle />
          <Popover>
            <PopoverTrigger asChild>
              <Button 
                variant="ghost"
                size="icon"
                onClick={() => setHasUnread(false)}
                aria-label="Notifications"
                className="text-[#3E4947] dark:text-[#CBD5E1] hover:text-[#0F766E] dark:hover:text-[#14B8A6] transition-colors rounded-full hover:bg-[#F1F5F9] dark:hover:bg-[#1E293B] cursor-pointer relative"
              >
                <Bell size={20} />
                {hasUnread && (
                  <span className="absolute top-1.5 right-2 w-2 h-2 bg-[#0F766E] dark:bg-[#14B8A6] rounded-full border border-white dark:border-[#020617]" />
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent align="end" className="w-80 p-0 mt-1 dark:bg-[#0F172A] dark:border-[#1E293B] overflow-hidden">
              <div className="px-4 py-3 border-b border-[#E2E8F0] dark:border-[#1E293B]">
                <p className="font-semibold text-sm text-[#0F172A] dark:text-white">Notifikasi</p>
              </div>
              <div className="flex flex-col">
                <div className="flex items-start gap-3 p-4 hover:bg-muted/50 border-b border-[#E2E8F0] dark:border-[#1E293B] transition-colors cursor-pointer">
                  <div className="mt-0.5 p-2 bg-[#0F766E]/10 dark:bg-[#14B8A6]/10 rounded-full">
                    <PartyPopper size={16} className="text-[#0F766E] dark:text-[#14B8A6]" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-[#0F172A] dark:text-white">Selamat datang di Cakap.AI!</p>
                    <p className="text-xs text-[#64748B] dark:text-[#94A3B8] mt-1 leading-relaxed">Platform siap digunakan. Latih wawancara pertamamu hari ini.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-4 hover:bg-muted/50 transition-colors cursor-pointer">
                  <div className="mt-0.5 p-2 bg-[#0F766E]/10 dark:bg-[#14B8A6]/10 rounded-full">
                    <Briefcase size={16} className="text-[#0F766E] dark:text-[#14B8A6]" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-[#0F172A] dark:text-white">Coba Fitur Job Board</p>
                    <p className="text-xs text-[#64748B] dark:text-[#94A3B8] mt-1 leading-relaxed">Latih wawancara langsung dari lowongan pekerjaan nyata di menu Loker.</p>
                  </div>
                </div>
              </div>
            </PopoverContent>
          </Popover>
          
          <div className="pl-0 sm:pl-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Avatar className="cursor-pointer border border-[#E2E8F0] dark:border-[#1E293B] hover:ring-2 hover:ring-[#0F766E]/20 dark:hover:ring-[#14B8A6]/20 transition-all">
                  <AvatarImage src={session?.user?.image || ""} alt={session?.user?.name || "User Profile"} />
                  <AvatarFallback className="bg-[#F0FDFA] dark:bg-[#020617] text-[#0F766E] dark:text-[#14B8A6] font-bold">
                    {userInitial}
                  </AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56 mt-1 dark:bg-[#0F172A] dark:border-[#1E293B]">
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none text-[#0F172A] dark:text-white">{session?.user?.name || "User"}</p>
                    <p className="text-xs leading-none text-[#64748B] dark:text-[#94A3B8] line-clamp-1">{session?.user?.email || ""}</p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem 
                  className="text-red-600 focus:text-red-600 focus:bg-red-50 dark:focus:bg-[#020617] cursor-pointer flex items-center gap-2"
                  onClick={() => signOut({ callbackUrl: "/" })}
                >
                  <LogOut size={16} />
                  {t("navLogout")}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <div className="flex md:hidden">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" aria-label="Open mobile menu" className="text-[#3E4947] dark:text-[#CBD5E1] ml-0 sm:ml-2">
                  <Menu size={24} />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[350px] flex flex-col p-6 dark:bg-[#0F172A] dark:border-[#1E293B]">
                <SheetHeader className="text-left p-0">
                  <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
                  <SheetDescription className="sr-only">Private Navigation Menu</SheetDescription>
                  <div className="flex items-center gap-3 mt-4">
                    <Avatar className="h-12 w-12 border border-[#E2E8F0] dark:border-[#1E293B]">
                      <AvatarImage src={session?.user?.image || ""} alt={session?.user?.name || "User"} />
                      <AvatarFallback className="bg-[#0F766E]/10 dark:bg-[#14B8A6]/10 text-[#0F766E] dark:text-[#14B8A6]">
                        {session?.user?.name?.charAt(0) || "U"}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col">
                      <span className="font-bold text-[#0F172A] dark:text-white">{session?.user?.name || "User"}</span>
                      <span className="text-xs text-muted-foreground dark:text-[#94A3B8]">{session?.user?.email || ""}</span>
                    </div>
                  </div>
                </SheetHeader>
                
                <hr className="my-4 border-border dark:border-[#1E293B]" />
                
                <div className="flex flex-col space-y-2 flex-grow">
                  <Link href="/home" className={`block py-2 text-base font-medium transition-colors hover:text-[#0F766E] dark:hover:text-[#14B8A6] ${activeTab === 'home' ? 'text-[#0F766E] dark:text-[#14B8A6]' : 'text-muted-foreground dark:text-[#94A3B8]'}`}>{t("navHome")}</Link>
                  <Link href="/history" className={`block py-2 text-base font-medium transition-colors hover:text-[#0F766E] dark:hover:text-[#14B8A6] ${activeTab === 'history' ? 'text-[#0F766E] dark:text-[#14B8A6]' : 'text-muted-foreground dark:text-[#94A3B8]'}`}>{t("navHistory")}</Link>
                </div>

                <div className="mt-auto pb-6">
                  <Button variant="destructive" className="w-full justify-start gap-2" onClick={() => signOut({ callbackUrl: "/" })}>
                    <LogOut size={16} />
                    {t("navLogout")}
                  </Button>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
}
