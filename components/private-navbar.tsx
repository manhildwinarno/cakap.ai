"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Bell, LogOut, Menu } from "lucide-react";
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

export function PrivateNavbar({ activeTab = 'home' }: { activeTab?: 'home' | 'history' | 'results' }) {
  const [isOpen, setIsOpen] = useState(false);
  const { data: session } = useSession();

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
    <nav className="fixed top-0 left-0 w-full z-50 bg-white border-b border-[#E2E8F0] h-16 flex items-center">
      <div className="max-w-[1280px] mx-auto w-full flex justify-between items-center px-6 lg:px-0">
        <div className="flex justify-center items-center gap-25">
          <Link 
            href="/home" 
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
          
          <div className="hidden md:flex gap-6 items-center h-16">
            <Link 
              href="/home" 
              className={`font-medium relative h-full flex items-center transition-colors duration-200 ${
                activeTab === 'home' ? 'text-[#0F172A]' : 'text-[#3E4947] hover:text-[#0F766E]'
              }`}
            >
              Home
              {activeTab === 'home' && <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#0F766E]"></span>}
            </Link>
            <Link 
              href="/history" 
              className={`font-medium relative h-full flex items-center transition-colors duration-200 ${
                activeTab === 'history' ? 'text-[#0F172A]' : 'text-[#3E4947] hover:text-[#0F766E]'
              }`}
            >
              My History
              {activeTab === 'history' && <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#0F766E]"></span>}
            </Link>
          </div>
        </div>

        <div className="flex items-center gap-4">

          <Popover>
            <PopoverTrigger asChild>
              <button className="text-[#3E4947] hover:text-[#0F766E] transition-colors p-2 rounded-full hover:bg-[#F1F5F9]">
                <Bell size={20} />
              </button>
            </PopoverTrigger>
            <PopoverContent className="w-64 p-4 text-center mr-6 mt-1">
              <p className="text-sm text-[#0F172A] font-medium">You're all caught up!</p>
              <p className="text-xs text-[#64748B] mt-1">No new notifications.</p>
            </PopoverContent>
          </Popover>
          
          <div className="pl-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Avatar className="cursor-pointer border border-[#E2E8F0] hover:ring-2 hover:ring-[#0F766E]/20 transition-all">
                  <AvatarImage src={session?.user?.image || ""} alt={session?.user?.name || "User Profile"} />
                  <AvatarFallback className="bg-[#F0FDFA] text-[#0F766E] font-bold">
                    {userInitial}
                  </AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56 mt-1">
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none text-[#0F172A]">{session?.user?.name || "User"}</p>
                    <p className="text-xs leading-none text-[#64748B] line-clamp-1">{session?.user?.email || ""}</p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem 
                  className="text-red-600 focus:text-red-600 focus:bg-red-50 cursor-pointer flex items-center gap-2"
                  onClick={() => signOut({ callbackUrl: "/" })}
                >
                  <LogOut size={16} />
                  Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <div className="flex md:hidden">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="text-[#3E4947] ml-2">
                  <Menu size={24} />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[350px] flex flex-col p-6">
                <SheetHeader className="text-left p-0">
                  <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
                  <SheetDescription className="sr-only">Private Navigation Menu</SheetDescription>
                  <div className="flex items-center gap-3 mt-4">
                    <Avatar className="h-12 w-12 border border-[#E2E8F0]">
                      <AvatarImage src={session?.user?.image || ""} alt={session?.user?.name || "User"} />
                      <AvatarFallback className="bg-[#0F766E]/10 text-[#0F766E]">
                        {session?.user?.name?.charAt(0) || "U"}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col">
                      <span className="font-bold text-[#0F172A]">{session?.user?.name || "User"}</span>
                      <span className="text-xs text-muted-foreground">{session?.user?.email || ""}</span>
                    </div>
                  </div>
                </SheetHeader>
                
                <hr className="my-4 border-border" />
                
                <div className="flex flex-col space-y-2 flex-grow">
                  <Link href="/home" className={`block py-2 text-base font-medium transition-colors hover:text-primary ${activeTab === 'home' ? 'text-[#0F766E]' : 'text-muted-foreground'}`}>Home</Link>
                  <Link href="/history" className={`block py-2 text-base font-medium transition-colors hover:text-primary ${activeTab === 'history' ? 'text-[#0F766E]' : 'text-muted-foreground'}`}>My History</Link>
                </div>

                <div className="mt-auto pb-6">
                  <Button variant="destructive" className="w-full justify-start gap-2" onClick={() => signOut({ callbackUrl: "/" })}>
                    <LogOut size={16} />
                    Log Out
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
