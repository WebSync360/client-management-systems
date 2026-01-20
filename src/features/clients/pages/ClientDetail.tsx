import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Mail, Phone, Globe, Calendar, Edit3, MoreVertical, CreditCard } from "lucide-react";
import { useClient } from "../hooks/useClients";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import PageLoader from "@/components/shared/PageLoader";

export default function ClientDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data: client, isLoading, error } = useClient(id);

  if (isLoading) return <PageLoader />;
  if (error || !client) return <div className="p-8 text-center">Client not found.</div>;

  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      
      {/* 1. THE NAVIGATION ANCHOR */}
      <button 
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-sm font-medium text-text-muted hover:text-brand-600 transition-colors group"
      >
        <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
        Back to Directory
      </button>

      {/* 2. PROFILE HERO HEADER */}
      <div className="flex flex-col md:flex-row justify-between items-start gap-6 border-b border-brand-100 pb-8">
        <div className="flex gap-6 items-center">
          <div className="h-20 w-20 rounded-2xl bg-gradient-to-br from-brand-600 to-brand-400 flex items-center justify-center text-3xl font-bold text-white shadow-lg">
            {client.name.charAt(0)}
          </div>
          <div>
            <div className="flex items-center gap-3 mb-1">
              <h1 className="text-4xl font-bold text-text-primary tracking-tight">{client.name}</h1>
              <Badge className="bg-green-100 text-green-700 hover:bg-green-100 border-none px-3">
                {client.status}
              </Badge>
            </div>
            <p className="text-lg text-text-secondary font-medium">{client.company}</p>
          </div>
        </div>

        <div className="flex gap-3 w-full md:w-auto">
          <Button variant="outline" size="icon">
            <MoreVertical className="h-4 w-4" />
          </Button>
          <Button className="flex-1 md:flex-none bg-brand-600 hover:bg-brand-700 text-white gap-2">
            <Edit3 className="h-4 w-4" />
            Edit Profile
          </Button>
        </div>
      </div>

      {/* 3. THE TRI-GRID LAYOUT */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* COL 1: IDENTITY & CONTACT */}
        <div className="space-y-6">
          <section className="bg-white p-6 rounded-2xl border border-brand-100 shadow-sm space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-widest text-text-muted">Contact Matrix</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-text-secondary">
                <Mail className="h-4 w-4 text-brand-500" />
                <span className="text-sm">{client.email}</span>
              </div>
              <div className="flex items-center gap-3 text-text-secondary">
                <Phone className="h-4 w-4 text-brand-500" />
                <span className="text-sm">+1 (555) 0123 4567</span>
              </div>
              <div className="flex items-center gap-3 text-text-secondary">
                <Globe className="h-4 w-4 text-brand-500" />
                <span className="text-sm">www.{client.company.toLowerCase().replace(/\s/g, '')}.com</span>
              </div>
            </div>
          </section>

          <section className="bg-brand-900 p-6 rounded-2xl text-white space-y-4 shadow-xl">
             <div className="flex justify-between items-center">
               <h3 className="text-xs font-bold uppercase tracking-widest opacity-60">LTV Forecast</h3>
               <CreditCard className="h-4 w-4 opacity-60" />
             </div>
             <div className="text-3xl font-bold">$42,500.00</div>
             <p className="text-[10px] opacity-50 leading-tight italic">Estimated lifetime value based on current trajectory and historical renewals.</p>
          </section>
        </div>

        {/* COL 2: ACTIVITY FEED */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white p-8 rounded-2xl border border-brand-100 shadow-sm min-h-[400px]">
            <div className="flex items-center justify-between mb-8">
              <h3 className="font-bold text-text-primary">Relationship Activity</h3>
              <Button variant="ghost" className="text-brand-600 text-xs font-bold">View History</Button>
            </div>
            
            {/* TIMELINE PATTERN */}
            <div className="space-y-8 relative before:absolute before:inset-0 before:ml-5 before:w-0.5 before:bg-brand-50">
              <div className="relative flex gap-6 group">
                <div className="mt-1.5 h-10 w-10 rounded-full border-4 border-white bg-brand-500 z-10 flex items-center justify-center">
                  <Calendar className="h-4 w-4 text-white" />
                </div>
                <div>
                  <h4 className="font-bold text-text-primary">Initial Consultation Complete</h4>
                  <p className="text-sm text-text-muted">Requirements gathered for Q1 implementation.</p>
                  <span className="text-[10px] font-bold text-brand-600 uppercase mt-1 block">2 hours ago</span>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}