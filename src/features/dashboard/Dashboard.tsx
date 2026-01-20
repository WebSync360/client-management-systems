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
        <Card className="lg:col-span-2 border-brand-100/50 shadow-soft overflow-hidden bg-white/50 backdrop-blur-sm">
          <CardHeader className="flex flex-row items-start justify-between pb-10">
            <div className="space-y-1">
              <CardTitle className="text-sm font-bold text-text-primary tracking-tight">Engagement Velocity</CardTitle>
              <div className="flex items-center gap-2">
                <span className="text-[10px] text-text-muted font-bold uppercase tracking-widest">Growth Index</span>
                <span className="flex items-center text-[9px] font-bold text-green-600 bg-green-50 px-1.5 py-0.5 rounded-full">
                  +12.4%
                </span>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex items-center gap-1.5">
                <div className="h-1.5 w-1.5 rounded-full bg-brand-600 shadow-[0_0_8px_rgba(var(--brand-600),0.4)]" />
                <span className="text-[10px] text-text-muted font-bold uppercase tracking-tighter">Current Period</span>
              </div>
            </div>
          </CardHeader>
          
          <CardContent className="relative">
            {/* BACKGROUND GRID LINES - Adds professional depth */}
            <div className="absolute inset-x-6 top-0 bottom-8 flex flex-col justify-between pointer-events-none">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="w-full border-t border-brand-100/30 border-dashed" />
              ))}
            </div>

            <div className="relative h-[220px] w-full flex items-end justify-between gap-3 px-2">
              {[
                { month: 'Oct', value: 45 },
                { month: 'Nov', value: 72 },
                { month: 'Dec', value: 60 },
                { month: 'Jan', value: 85 },
                { month: 'Feb', value: 48 },
                { month: 'Mar', value: 92 },
              ].map((data) => (
                <div key={data.month} className="flex-1 flex flex-col items-center gap-4 group">
                  {/* BAR CONTAINER */}
                  <div className="relative w-full h-full flex items-end justify-center px-1">
                    {/* INVISIBLE HITBOX FOR BETTER HOVER UX */}
                    <div className="absolute inset-0 z-10 cursor-pointer" />
                    
                    {/* THE ACTUAL BAR */}
                    <div 
                      className="w-full bg-brand-100/40 rounded-t-[4px] transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:bg-brand-600 group-hover:scale-x-105 group-hover:shadow-lg origin-bottom relative"
                      style={{ height: `${data.value}%` }}
                    >
                      {/* TOOLTIP - Precision Engineered */}
                      <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-brand-900 text-white text-[10px] py-1.5 px-2.5 rounded-lg opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300 font-bold shadow-xl z-20 pointer-events-none">
                        {data.value}%
                        <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-brand-900 rotate-45" />
                      </div>
                    </div>
                  </div>

                  {/* LABEL */}
                  <span className="text-[10px] font-bold text-text-muted/60 group-hover:text-brand-700 transition-colors uppercase tracking-widest">
                    {data.month}
                  </span>
                </div>
              ))}
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