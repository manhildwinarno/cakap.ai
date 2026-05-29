import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Bell } from "lucide-react";
import { Button } from "@/components/ui/button";

export function PrivateNavbar({ activeTab = 'home' }: { activeTab?: 'home' | 'history' | 'results' }) {
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
          <Button className="bg-[#0F766E] text-white hover:bg-[#005C55] shadow-sm rounded-lg px-5 hidden sm:flex">
            Start Practice
          </Button>
          
          <button className="text-[#3E4947] hover:text-[#0F766E] transition-colors p-2 rounded-full hover:bg-[#F1F5F9]">
            <Bell size={20} />
          </button>
          
          <div className="pl-2">
            <Avatar className="cursor-pointer border border-[#E2E8F0]">
              <AvatarImage src="https://i.pravatar.cc/150?u=a042581f4e29026704d" alt="User Profile" />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
          </div>
        </div>
      </div>
    </nav>
  );
}
