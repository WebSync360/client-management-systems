import { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import TopBar from "./TopBar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function MainLayout() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Function to close drawer when a link is clicked
  const closeDrawer = () => setIsMobileMenuOpen(false);

  return (
    <div className="flex h-screen w-full overflow-hidden bg-app">
      
      {/* 1. DESKTOP SIDEBAR (Visible only on Large screens) */}
      <div className="hidden lg:flex h-full">
        <Sidebar />
      </div>

      {/* 2. MOBILE DRAWER (Controlled by Sheet) */}
      <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
        <SheetContent side="left" className="p-0 w-64 bg-brand-900 border-none">
          {/* SR-only titles for accessibility compliance */}
          <SheetHeader className="sr-only">
            <SheetTitle>Navigation Menu</SheetTitle>
            <SheetDescription>Access core platform features</SheetDescription>
          </SheetHeader>
          <Sidebar onItemClick={closeDrawer} />
        </SheetContent>
      </Sheet>

      {/* 3. COMMAND SHELL */}
      <div className="flex flex-1 flex-col overflow-hidden">
        
        {/* MOBILE HEADER OVERLAY 
            We inject the hamburger button here only for mobile
        */}
        <div className="lg:hidden flex items-center p-4 border-b bg-white">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => setIsMobileMenuOpen(true)}
            className="text-brand-900"
          >
            <Menu className="h-6 w-6" />
          </Button>
          <span className="ml-4 font-bold text-brand-900 uppercase tracking-tighter">OpsOS</span>
        </div>

        <TopBar />

        {/* 4. DYNAMIC WORKSPACE */}
        <main className="flex-1 overflow-hidden">
          <ScrollArea className="h-full w-full">
            <div className="mx-auto max-w-[1600px] p-4 lg:p-8 animate-in fade-in slide-in-from-bottom-2 duration-500">
              <Outlet />
            </div>
          </ScrollArea>
        </main>
      </div>
    </div>
  );
}