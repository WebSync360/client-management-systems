import { 
  TrendingUp, 
  Users, 
  Zap, 
  Target, 
  ArrowUpRight, 
  Layers,
  Activity
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function PerformanceHub() {
  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-3 duration-700">
      
      {/* 1. STRATEGIC HEADER: Context over Content */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-brand-100 pb-8">
        <div>
          <Badge variant="outline" className="mb-3 border-brand-200 text-brand-700 uppercase tracking-widest text-[9px] font-black">
            Intelligence Report
          </Badge>
          <h1 className="text-4xl font-bold tracking-tight text-text-primary">Performance Hub</h1>
          <p className="text-text-muted mt-2 max-w-xl">
            Synthesized operational data across the fiscal quarter. Focus is currently on 
            <span className="text-brand-600 font-semibold"> conversion acceleration</span>.
          </p>
        </div>
        <div className="flex gap-3">
          <div className="text-right hidden md:block">
            <p className="text-[10px] font-bold text-text-muted uppercase">Data Refresh Rate</p>
            <p className="text-xs font-medium text-text-primary">Real-time / 300ms latency</p>
          </div>
        </div>
      </div>

      {/* 2. CORE PERFORMANCE QUARTET */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Win Rate", value: "64.2%", trend: "+5.1%", icon: Target },
          { label: "Avg. Deal Size", value: "$12,400", trend: "+$1.2k", icon: Zap },
          { label: "Sales Velocity", value: "18 Days", trend: "-2 Days", icon: Activity },
          { label: "Customer LTV", value: "$48.5k", trend: "+8%", icon: TrendingUp },
        ].map((kpi) => (
          <Card key={kpi.label} className="border-none bg-white shadow-soft group hover:ring-1 ring-brand-200 transition-all">
            <CardContent className="pt-6">
              <div className="flex justify-between items-start">
                <div className="p-2 rounded-lg bg-brand-50 text-brand-600">
                  <kpi.icon className="h-4 w-4" />
                </div>
                <span className="text-[10px] font-black text-green-600 bg-green-50 px-2 py-0.5 rounded-full">
                  {kpi.trend}
                </span>
              </div>
              <div className="mt-4">
                <h3 className="text-2xl font-bold tracking-tight text-text-primary">{kpi.value}</h3>
                <p className="text-[10px] font-bold text-text-muted uppercase tracking-[0.15em] mt-1">{kpi.label}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* 3. THE "CONVERSION FUNNEL" VISUALIZATION (Structural Originality) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2 border-none shadow-soft overflow-hidden bg-white">
          <CardHeader className="flex flex-row items-center justify-between bg-slate-50/50 border-b border-slate-100">
            <CardTitle className="text-xs font-black uppercase tracking-widest text-text-primary">Pipeline Distribution</CardTitle>
            <Layers className="h-4 w-4 text-brand-400" />
          </CardHeader>
          <CardContent className="pt-10">
            <div className="relative h-[280px] w-full flex flex-col justify-between">
              {[
                { stage: "Leads Generated", count: 480, width: "100%", color: "bg-brand-100" },
                { stage: "Qualified Prospects", count: 212, width: "65%", color: "bg-brand-300" },
                { stage: "Proposal Sent", count: 94, width: "35%", color: "bg-brand-500" },
                { stage: "Closed-Won", count: 58, width: "20%", color: "bg-brand-700" },
              ].map((step, i) => (
                <div key={step.stage} className="flex items-center gap-6 group">
                  <div className="w-32 text-[10px] font-bold text-text-muted uppercase truncate">{step.stage}</div>
                  <div className="flex-1 h-10 relative">
                    <div 
                      className={`absolute inset-0 ${step.color} rounded-r-md transition-all duration-1000 group-hover:opacity-80`} 
                      style={{ width: step.width }} 
                    />
                    <div className="absolute left-4 inset-y-0 flex items-center text-[11px] font-bold text-brand-900">
                      {step.count} Units
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* 4. ANOMALY DETECTION / INSIGHTS (The "Senior" Touch) */}
        <Card className="border-none bg-brand-900 text-white shadow-2xl">
          <CardHeader>
            <CardTitle className="text-xs font-black uppercase tracking-widest text-brand-400">Heuristic Analysis</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="p-4 rounded-xl bg-white/5 border border-white/10">
              <div className="flex items-center gap-2 mb-2 text-brand-300">
                <Users className="h-4 w-4" />
                <span className="text-[10px] font-bold uppercase tracking-widest">Growth Driver</span>
              </div>
              <p className="text-sm font-medium leading-relaxed">
                Referral-based leads are converting <span className="text-brand-400 font-bold">2.4x faster</span> than outbound sequences this month.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-white/5 border border-white/10">
              <div className="flex items-center gap-2 mb-2 text-amber-400">
                <ArrowUpRight className="h-4 w-4" />
                <span className="text-[10px] font-bold uppercase tracking-widest">Efficiency Alert</span>
              </div>
              <p className="text-