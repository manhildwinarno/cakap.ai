"use client";

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
} from "@/components/ui/sheet";

export function PrivateNavbar({ activeTab = 'home' }: { activeTab?: 'home' | 'history' | 'results' }) {
  const { data: session } = useSession();

  const userInitial = session?.user?.name ? session.user.name.charAt(0).toUpperCase() : "U";

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-white border-b border-[#E2E8F0] h-16 flex items-center">
      <div className="max-w-[1280px] mx-auto w-full flex justify-between items-center px-6 lg:px-8">
        <div className="flex items-center gap-10">
          <Link 
            href="/home" 
            className="text-2xl font-bold text-[#0F766E] tracking-tight"
          >
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
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="text-[#3E4947] ml-2">
                  <Menu size={24} />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[250px] sm:w-[300px]">
                <div className="flex flex-col gap-6 mt-8">
                  <Link href="/home" className={`text-lg font-medium ${activeTab === 'home' ? 'text-[#0F766E]' : 'text-[#3E4947]'}`}>Home</Link>
                  <Link href="/history" className={`text-lg font-medium ${activeTab === 'history' ? 'text-[#0F766E]' : 'text-[#3E4947]'}`}>My History</Link>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
}
