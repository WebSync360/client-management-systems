import { useClients } from "../clients/hooks/useClients";
import { 
  Users, 
  Target, 
  TrendingUp, 
  AlertCircle, 
  ArrowUpRight,
  Activity
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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

          <CardContent className="pt-6">
            <div className="relative h-[200px] w-full group">
              {/* THE CURVE (SVG) */}
              <svg className="w-full h-full" viewBox="0 0 600 200" preserveAspectRatio="none">
                <defs>
                  <linearGradient id="gradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="rgb(var(--brand-600))" stopOpacity="0.3" />
                    <stop offset="100%" stopColor="rgb(var(--brand-600))" stopOpacity="0" />
                  </linearGradient>
                </defs>
                
                {/* AREA FILL */}
                <path
                  d="M0,160 C50,160 100,80 150,100 C200,120 250,40 300,60 C350,80 400,20 450,40 C500,60 550,140 600,120 L600,200 L0,200 Z"
                  fill="url(#gradient)"
                  className="animate-in fade-in slide-in-from-bottom-4 duration-1000"
                />
                
                {/* THE LINE */}
                <path
                  d="M0,160 C50,160 100,80 150,100 C200,120 250,40 300,60 C350,80 400,20 450,40 C500,60 550,140 600,120"
                  fill="none"
                  stroke="rgb(var(--brand-600))"
                  strokeWidth="3"
                  strokeLinecap="round"
                  className="drop-shadow-md"
                />

                {/* INTERACTIVE NODES */}
                {[
                  { x: 150, y: 100, val: "72" },
                  { x: 300, y: 60, val: "85" },
                  { x: 450, y: 40, val: "92" }
                ].map((node, i) => (
                  <g key={i} className="cursor-pointer group/node">
                    <circle 
                      cx={node.x} cy={node.y} r="6" 
                      className="fill-white stroke-brand-600 stroke-2 transition-all group-hover/node:r-8" 
                    />
                    <foreignObject x={node.x - 20} y={node.y - 35} width="40" height="25">
                      <div className="bg-brand-900 text-white text-[9px] font-bold rounded px-1 py-0.5 text-center opacity-0 group-hover/node:opacity-100 transition-opacity">
                        {node.val}%
                      </div>
                    </foreignObject>
                  </g>
                ))}
              </svg>

              {/* X-AXIS LABELS */}
              <div className="flex justify-between mt-4 px-1">
                {['Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar'].map((m) => (
                  <span key={m} className="text-[10px] font-bold text-text-muted uppercase tracking-widest">{m}</span>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-brand-100/50 shadow-soft bg-brand-900 text-white">
          <CardHeader>
            <div className="flex items-center gap-2">
              <AlertCircle className="h-4 w-4 text-brand-300" />
              <CardTitle className="text-sm font-bold">Action Required</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-4 rounded-xl bg-white/10 border border-white/10 hover:bg-white/15 transition-colors cursor-pointer group">
              <p className="text-xs font-bold text-brand-300 uppercase tracking-tighter">Priority</p>
              <p className="text-sm font-medium mt-1">Check recent leads for follow-up.</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}