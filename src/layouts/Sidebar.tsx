import { useLocation, Link } from "react-router-dom";
import { 
  LayoutDashboard, 
  Users, 
  BarChart3, 
  Settings, 
  LogOut, 
  ArrowLeftRight,
  Boxes
} from "lucide-react";
import { cn } from "@/lib/utils";

const NAVIGATION_GROUPS = [
  {
    label: "Core",
    items: [
      { id: "dashboard", label: "Overview", icon: LayoutDashboard, path: "/" },
      { id: "clients", label: "Client Directory", icon: Users, path: "/clients" },
      { id: "pipeline", label: "Deal Pipeline", icon: ArrowLeftRight, path: "/pipeline" },
    ]
  },
  {
    label: "Analysis",
    items: [
      { id: "reporting", label: "Performance", icon: BarChart3, path: "/reporting" },
    ]
  }
];

export default function Sidebar() {
  const { pathname } = useLocation();

  return (
    <aside className="group flex h-screen w-64 flex-col bg-brand-900 text-brand-50/90 transition-all duration-300 ease-in-out border-r border-brand-800/50">
      
      {/* 1. BRAND & CONTEXT SWITCHER */}
      <div className="flex h-16 items-center px-6 mb-6">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand-500 shadow-lg shadow-brand-500/20">
            <Boxes className="h-5 w-5 text-white" />
          </div>
          <div className="flex flex-col leading-tight">
            <span className="font-semibold text-white tracking-tight">OpsOS</span>
            <span className="text-[10px] uppercase tracking-widest text-brand-400 font-bold">Project 40</span>
          </div>
        </div>
      </div>

      {/* 2. NAVIGATION GROUPS */}
      <nav className="flex-1 space-y-8 px-4">
        {NAVIGATION_GROUPS.map((group) => (
          <div key={group.label} className="space-y-2">
            <h3 className="px-4 text-[10px] font-bold uppercase tracking-[0.2em] text-brand-500/70">
              {group.label}
            </h3>
            <div className="space-y-1">
              {group.items.map((item) => {
                const isActive = pathname === item.path;
                return (
                  <Link
                    key={item.id}
                    to={item.path}
                    className={cn(
                      "group relative flex items-center gap-3 rounded-lg px-4 py-2.5 text-sm font-medium transition-all duration-200",
                      isActive 
                        ? "bg-brand-800/80 text-white shadow-sm" 
                        : "hover:bg-brand-800/40 hover:text-white"
                    )}
                  >
                    {/* Active Indicator Pillar */}
                    {isActive && (
                      <div className="absolute left-[-4px] h-5 w-1 rounded-full bg-brand-500" />
                    )}
                    
                    <item.icon className={cn(
                      "h-4 w-4 transition-colors",
                      isActive ? "text-brand-400" : "text-brand-500/60 group-hover:text-brand-300"
                    )} />
                    {item.label}
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </nav>

      {/* 3. SYSTEM FOOTER */}
      <div className="mt-auto space-y-1 p-4 border-t border-brand-800/30">
        <Link 
          to="/settings"
          className="flex items-center gap-3 rounded-lg px-4 py-2.5 text-sm font-medium text-brand-400 hover:bg-brand-800/40 hover:text-white transition-all"
        >
          <Settings className="h-4 w-4" />
          System Settings
        </Link>
        <button className="flex w-full items-center gap-3 rounded-lg px-4 py-2.5 text-sm font-medium text-brand-400 hover:bg-red-500/10 hover:text-red-400 transition-all">
          <LogOut className="h-4 w-4" />
          Terminate Session
        </button>
      </div>
    </aside>
  );
}