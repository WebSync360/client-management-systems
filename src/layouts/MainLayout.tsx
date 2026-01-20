import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import TopBar from "./TopBar";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function MainLayout() {
  return (
    <div className="flex h-screen w-full overflow-hidden bg-app">
      {/* 1. PRIMARY NAVIGATION (SKELETON) */}
      <Sidebar />

      {/* 2. COMMAND SHELL (CONTENT AREA) */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* CONTEXTUAL ANCHOR */}
        <TopBar />

        {/* 3. DYNAMIC WORKSPACE */}
        <main className="flex-1 overflow-hidden">
          <ScrollArea className="h-full w-full">
            <div className="mx-auto max-w-[1600px] p-8 animate-in fade-in slide-in-from-bottom-2 duration-500">
              {/* STRATEGIC INSIGHT: 
                  We limit the max-width to 1600px. 
                  On ultra-wide monitors, full-width data tables 
                  are ergonomically difficult to read. 
              */}
              <Outlet />
            </div>
          </ScrollArea>
        </main>
      </div>
    </div>
  );
}