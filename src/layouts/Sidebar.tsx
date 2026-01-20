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
interface SidebarProps {
  onItemClick?: () => void;
}

const NAVIGATION_GROUPS = [
  {
    label: "Core Operations",
    items: [
      { id: "dashboard", label: "Executive Overview", icon: LayoutDashboard, path: "/" },
      { id: "clients", label: "Client Directory", icon: Users, path: "/clients" },
      { id: "pipeline", label: "Deal Pipeline", icon: ArrowLeftRight, path: "/pipeline" },
    ]
  },
  {
    label: "Intelligence",
    items: [
      { id: "reporting", label: "Performance Hub", icon: BarChart3, path: "/reporting" },
    ]
  }
];

export default function Sidebar({ onItemClick }: SidebarProps) {
  const { pathname } = useLocation();

  return (
    <aside className="flex h-screen w-64 flex-col bg-brand-900 text-brand-50/90 border-r border-brand-800/40">
      
      {/* 1. BRAND IDENTITY SECTION */}
      <div className="flex h-20 items-center px-6 mb-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-600 shadow-lg shadow-brand-600/20 ring-1 ring-white/10">
            <Boxes className="h-6 w-6 text-white" />
          </div>
          <div className="flex flex-col leading-none">
            <span className="font-bold text-white tracking-tight text-lg">OpsOS</span>
            <span className="text-[9px] uppercase tracking-[0.2em] text-brand-400 font-black mt-1">Enterprise</span>
          </div>
        </div>
      </div>

      {/* 2. DYNAMIC NAVIGATION ENGINE */}
      <nav className="flex-1 space-y-8 px-4 overflow-y-auto scrollbar-hide">
        {NAVIGATION_GROUPS.map((group) => (
          <div key={group.label} className="space-y-2">
            <h3 className="px-4 text-[10px] font-black uppercase tracking-[0.25em] text-brand-500/50">
              {group.label}
            </h3>
            <div className="space-y-1">
              {group.items.map((item) => {
                const isActive = pathname === item.path;
                return (
                  <Link
                    key={item.id}
                    to={item.path}
                    onClick={onItemClick} // CLOSES DRAWER ON MOBILE
                    className={cn(
                      "group relative flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold transition-all duration-300",
                      isActive 
                        ? "bg-brand-800/60 text-white shadow-inner ring-1 ring-white/5" 
                        : "text-brand-400/80 hover:bg-brand-800/30 hover:text-white"
                    )}
                  >
                    {/* Active Visual Indicator */}
                    {isActive && (
                      <div className="absolute left-0 h-6 w-1 rounded-r-full bg-brand-500 shadow-[0_0_12px_rgba(var(--brand-500),0.5)]" />
                    )}
                    
                    <item.icon className={cn(
                      "h-4 w-4 transition-transform duration-300 group-hover:scale-110",
                      isActive ? "text-brand-400" : "text-brand-500/40 group-hover:text-brand-300"
                    )} />
                    <span className="tracking-wide">{item.label}</span>
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </nav>

      {/* 3. SYSTEM UTILITIES FOOTER */}
      <div className="p-4 bg-brand-950/50 backdrop-blur-md border-t border-brand-800/30">
        <div className="space-y-1">
          <Link 
            to="/settings"
            onClick={onItemClick}
            className={cn(
              "flex items-center gap-3 rounded-lg px-4 py-2.5 text-sm font-bold transition-all",
              pathname === "/settings" 
                ? "text-white bg-brand-800/40" 
                : "text-brand-400/60 hover:text-white hover:bg-brand-800/20"
            )}
          >
            <Settings className="h-4 w-4" />
            System Settings
          </Link>
          
          <button className="flex w-full items-center gap-3 rounded-lg px-4 py-2.5 text-sm font-bold text-red-400/60 hover:bg-red-500/10 hover:text-red-400 transition-all group">
            <LogOut className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
            Terminate Session
          </button>
        </div>

        {/* User Context Preview */}
        <div className="mt-4 flex items-center gap-3 px-2 py-3 rounded-xl bg-white/[0.03] border border-white/5">
          <div className="h-8 w-8 rounded-full bg-brand-500 flex items-center justify-center font-bold text-xs text-white">
            DB
          </div>
          <div className="flex flex-col min-w-0">
            <span className="text-xs font-bold text-white truncate">Dev Blaze</span>
            <span className="text-[10px] text-brand-500 font-medium uppercase tracking-tighter">Admin Level</span>
          </div>
        </div>
      </div>
    </aside>
  );
}