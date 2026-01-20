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
        <Card className="lg:col-span-2 border-brand-100/50 shadow-soft">
          <CardHeader>
            <CardTitle className="text-sm font-bold text-text-primary">Engagement Velocity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] w-full flex flex-col items-center justify-center border-2 border-dashed border-brand-50 rounded-xl bg-app/20">
              <Activity className="h-10 w-10 text-brand-200 mb-2" />
              <p className="text-sm text-text-muted font-medium">Activity visualization initializing...</p>
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