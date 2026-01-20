import { Search, Bell, HelpCircle, ChevronRight } from "lucide-react";
import { useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export default function TopBar() {
  const { pathname } = useLocation();
  
  const pathSegments = pathname.split('/').filter(Boolean);
  const currentView = pathSegments.length > 0 
    ? pathSegments[pathSegments.length - 1].replace(/-/g, ' ') 
    : 'Overview';

  return (
    <header className="sticky top-0 z-30 flex h-16 w-full items-center justify-between border-b border-brand-100 bg-white/80 px-8 backdrop-blur-md">
      
      {/* 1. CONTEXTUAL NAVIGATION */}
      <div className="flex items-center gap-4">
        <nav className="flex items-center gap-2 text-sm font-medium">
          <span className="text-text-muted cursor-default hover:text-brand-600 transition-colors">CMS</span>
          <ChevronRight className="h-4 w-4 text-text-muted/30" />
          <span className="capitalize text-text-primary font-semibold tracking-tight">
            {currentView}
          </span>
        </nav>
      </div>

      {/* 2. UNIVERSAL COMMAND */}
      <div className="hidden md:flex flex-1 max-w-md px-8">
        <div className="relative w-full group">
          <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
            <Search className="h-4 w-4 text-text-muted group-focus-within:text-brand-500 transition-colors" />
          </div>
          <input
            type="text"
            placeholder="Search clients, deals, or commands..."
            className="w-full h-10 pl-10 pr-12 rounded-xl bg-app border-none text-sm placeholder:text-text-muted focus:ring-2 focus:ring-brand-500/20 transition-all outline-none"
          />
          <div className="absolute inset-y-0 right-3 flex items-center gap-1 pointer-events-none">
            <kbd className="hidden sm:inline-flex h-5 select-none items-center gap-1 rounded border border-brand-200 bg-white px-1.5 font-mono text-[10px] font-medium text-text-muted">
              <span className="text-xs">⌘</span>K
            </kbd>
          </div>
        </div>
      </div>

      {/* 3. UTILITY ACTIONS */}
      <div className="flex items-center gap-2">
        <TooltipProvider>
          <div className="flex items-center gap-1 pr-4 border-r border-brand-100">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" className="text-text-secondary hover:text-brand-600 hover:bg-brand-50">
                  <HelpCircle className="h-5 w-5" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Documentation</TooltipContent>
            </Tooltip>

            <div className="relative">
              <Button variant="ghost" size="icon" className="text-text-secondary hover:text-brand-600 hover:bg-brand-50">
                <Bell className="h-5 w-5" />
              </Button>
              <span className="absolute top-2 right-2.5 flex h-2 w-2 rounded-full bg-brand-500 ring-2 ring-white" />
            </div>
          </div>

          <div className="flex items-center gap-3 pl-2">
            <div className="flex flex-col items-end leading-none">
              <span className="text-sm font-semibold text-text-primary">Dev Blaze</span>
              <span className="text-[10px] text-brand-600 font-medium uppercase tracking-tighter">Product Lead</span>
            </div>
            <div className="h-9 w-9 rounded-full bg-gradient-to-tr from-brand-700 to-brand-500 border-2 border-white shadow-soft flex items-center justify-center text-white font-bold text-xs">
              DB
            </div>
          </div>
        </TooltipProvider>
      </div>
    </header>
  );
}