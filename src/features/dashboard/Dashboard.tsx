import { useClients } from "../clients/hooks/useClients";
import { 
  Users, 
  Target, 
  TrendingUp, 
  Activity, 
  ArrowUpRight 
} from "lucide-react"; 
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge"; 
import PageLoader from "@/components/shared/PageLoader";


export default function Dashboard() {
  const { data: clients, isLoading } = useClients();

  if (isLoading) return <PageLoader />;

  // DERIVED ANALYTICS: Ensuring comparison matches our ClientStatus union
  const totalClients = clients?.length || 0;
  
  // Adjusted 'negotiation' to 'lead' or whichever key matches your backend enum
  const activeDeals = clients?.filter(c => (c.status as string) === 'lead').length || 0;
  const closedWon = clients?.filter(c => (c.status as string) === 'active').length || 0;
  
  const retentionRate = totalClients > 0 ? ((closedWon / totalClients) * 100).toFixed(0) : 0;

  const stats = [
    { label: "Total Managed", value: totalClients, icon: Users, color: "text-blue-600", bg: "bg-blue-50" },
    { label: "Active Pipeline", value: activeDeals, icon: Target, color: "text-brand-600", bg: "bg-brand-50" },
    { label: "Closed Revenue", value: closedWon, icon: TrendingUp, color: "text-green-600", bg: "bg-green-50" },
    { label: "Retention", value: `${retentionRate}%`, icon: Activity, color: "text-orange-600", bg: "bg-orange-50" },
  ];

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-top-4 duration-700">
      <header>
        <h1 className="text-3xl font-bold tracking-tight text-text-primary">Intelligence Overview</h1>
        <p className="text-text-muted mt-1">Operational health and relationship velocity.</p>
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <Card key={stat.label} className="border-brand-100/50 shadow-soft">
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-[10px] font-bold uppercase tracking-widest text-text-muted">
                {stat.label}
              </CardTitle>
              <div className={`${stat.bg} ${stat.color} p-2 rounded-lg`}>
                <stat.icon className="h-4 w-4" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-text-primary">{stat.value}</div>
              <div className="flex items-center mt-1 text-[10px] font-bold text-green-600">
                <ArrowUpRight className="h-3 w-3 mr-1" />
                +12% vs last month
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <Card className="lg:col-span-2 border-brand-100/50 shadow-soft overflow-hidden bg-white">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <div className="space-y-1">
            <CardTitle className="text-sm font-bold text-text-primary uppercase tracking-tight">Engagement Velocity</CardTitle>
            <p className="text-[10px] text-text-muted font-medium">Network activity & lead momentum</p>
          </div>
          <div className="flex items-center gap-2 px-2 py-1 bg-brand-50 rounded-lg">
            <TrendingUp className="h-3 w-3 text-brand-600" />
            <span className="text-[10px] font-bold text-brand-700">+14.2%</span>
          </div>
        </CardHeader>

        <CardContent className="pt-4">
          <div className="relative h-[240px] w-full">
            {}
            <svg 
              className="w-full h-full overflow-visible" 
              viewBox="0 0 600 240" 
              preserveAspectRatio="none"
            >
              <defs>
                <linearGradient id="velocityGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="rgb(var(--brand-600))" stopOpacity="0.2" />
                  <stop offset="100%" stopColor="rgb(var(--brand-600))" stopOpacity="0" />
                </linearGradient>
              </defs>
              
              {/* AREA FILL - Smoothed Path */}
              <path
                d="M0,180 C100,180 100,60 200,100 C300,140 300,20 400,60 C500,100 500,140 600,100 L600,200 L0,200 Z"
                fill="url(#velocityGradient)"
                className="animate-in fade-in duration-1000"
              />
              
              {/* MOMENTUM LINE */}
              <path
                d="M0,180 C100,180 100,60 200,100 C300,140 300,20 400,60 C500,100 500,140 600,100"
                fill="none"
                stroke="rgb(var(--brand-600))"
                strokeWidth="3"
                strokeLinecap="round"
              />

              {/* X-AXIS LABELS (Now inside the SVG for perfect alignment) */}
              {[
                { x: 20, m: 'OCT' },
                { x: 140, m: 'NOV' },
                { x: 260, m: 'DEC' },
                { x: 380, m: 'JAN' },
                { x: 500, m: 'FEB' },
                { x: 580, m: 'MAR' }
              ].map((label, i) => (
                <text
                  key={i}
                  x={label.x}
                  y="230"
                  textAnchor="middle"
                  className="fill-text-muted text-[12px] font-bold tracking-tighter"
                  style={{ fontFamily: 'inherit' }}
                >
                  {label.m}
                </text>
              ))}

              {/* INTERACTIVE NODES */}
              {[
                { x: 200, y: 100, val: "72" },
                { x: 400, y: 60, val: "85" },
                { x: 600, y: 100, val: "92" }
              ].map((node, i) => (
                <g key={i} className="cursor-pointer group/node">
                  <circle 
                    cx={node.x} cy={node.y} r="5" 
                    className="fill-white stroke-brand-600 stroke-2 transition-all group-hover/node:r-7" 
                  />
                </g>
              ))}
            </svg>
          </div>
        </CardContent>
      </Card>

      <Card className="border-none shadow-2xl bg-brand-700 text-white overflow-hidden">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="relative">
                <Activity className="h-4 w-4 text-brand-400" />
                <span className="absolute -top-1 -right-1 h-2 w-2 bg-red-500 rounded-full animate-pulse" />
              </div>
              <CardTitle className="text-sm font-bold tracking-tight uppercase">Operational Priority</CardTitle>
            </div>
            <Badge className="bg-brand-800 text-brand-200 border-none text-[9px] font-black">
              3 TASKS
            </Badge>
          </div>
        </CardHeader>

        <CardContent className="px-3 pb-6 space-y-3">
          {/* TASK 1: CRITICAL */}
          <div className="group relative p-4 rounded-2xl bg-gradient-to-br from-white/10 to-transparent border border-white/5 hover:border-brand-500/50 transition-all cursor-pointer">
            <div className="flex justify-between items-start mb-1">
              <span className="text-[10px] font-black text-red-400 uppercase tracking-widest">Immediate</span>
              <ArrowUpRight className="h-3 w-3 text-white/20 group-hover:text-white transition-colors" />
            </div>
            <p className="text-sm font-semibold leading-tight">Review 4 high-value leads from 'Stellar Dynamics'</p>
            <div className="mt-3 h-1 w-full bg-white/5 rounded-full overflow-hidden">
              <div className="h-full bg-red-500 w-3/4 rounded-full" />
            </div>
          </div>

          {/* TASK 2: SYSTEM */}
          <div className="group p-4 rounded-2xl bg-white/[0.03] border border-white/5 hover:bg-white/[0.06] transition-all cursor-pointer">
            <div className="flex items-center gap-2 mb-1">
              <div className="h-1.5 w-1.5 rounded-full bg-brand-400" />
              <span className="text-[10px] font-black text-brand-300 uppercase tracking-widest">Pipeline</span>
            </div>
            <p className="text-sm font-medium text-white/80">3 contracts awaiting digital signature</p>
          </div>

          {/* TASK 3: FOLLOW UP */}
          <div className="group p-4 rounded-2xl bg-white/[0.03] border border-white/5 hover:bg-white/[0.06] transition-all cursor-pointer">
            <div className="flex items-center gap-2 mb-1">
              <div className="h-1.5 w-1.5 rounded-full bg-amber-400" />
              <span className="text-[10px] font-black text-amber-300 uppercase tracking-widest">Scheduled</span>
            </div>
            <p className="text-sm font-medium text-white/80">Follow-up call with Marcus Wright (10:30 AM)</p>
          </div>

          <button className="w-full py-3 text-[10px] font-black uppercase tracking-[0.2em] text-brand-400 hover:text-white transition-colors border-t border-white/5 mt-2">
            View All Intelligence
          </button>
        </CardContent>
      </Card>
      </div>
    </div>
  );
}