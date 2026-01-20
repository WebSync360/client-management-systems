import { useClients, useUpdateClientStatus } from "../../clients/hooks/useClients";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MoreHorizontal, Plus, DollarSign, Clock, ArrowRightLeft } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import PageLoader from "@/components/shared/PageLoader";

const STAGES = [
  { id: 'lead', name: 'Leads', color: 'bg-slate-500' },
  { id: 'negotiation', name: 'Negotiation', color: 'bg-brand-500' },
  { id: 'active', name: 'Closed-Won', color: 'bg-green-500' },
  { id: 'archived', name: 'Archive', color: 'bg-orange-500' }
];

export default function KanbanBoard() {
  const { data: clients, isLoading } = useClients();
  const { mutate: updateStatus } = useUpdateClientStatus();

  const handleMove = (id: string, newStatus: string) => {
    updateStatus({ id, status: newStatus });
  };

  if (isLoading) return <PageLoader />;

  return (
  <div className="h-full space-y-6 animate-in fade-in duration-700">
    {/* HEADER SECTION */}
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-text-primary">Deal Pipeline</h1>
        <p className="text-text-muted text-sm mt-1">Manage stage transitions and velocity.</p>
      </div>
      <Button className="bg-brand-900 text-white hover:bg-black gap-2 w-full sm:w-auto shadow-lg shadow-brand-900/10">
        <Plus className="h-4 w-4" />
        Add Prospect
      </Button>
    </div>

    {/* BOARD GRID
        STRATEGY: Use a responsive grid that adapts to screen size 
    */}
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 pb-6">
      {STAGES.map((stage) => {
        const stageClients = clients?.filter(c => c.status === stage.id) || [];
        
        return (
          <div key={stage.id} className="flex flex-col gap-4 min-w-0">
            {/* STAGE HEADER */}
            <div className="flex items-center justify-between px-2">
              <div className="flex items-center gap-2">
                <div className={`h-2.5 w-2.5 rounded-full ${stage.color} shadow-sm`} />
                <h3 className="font-bold text-xs text-text-primary uppercase tracking-widest">
                  {stage.name}
                </h3>
                <span className="text-[10px] font-bold text-text-muted bg-app px-2 py-0.5 rounded-full border border-brand-100">
                  {stageClients.length}
                </span>
              </div>
            </div>

            {/* COLUMN CONTAINER */}
            <div className="flex-1 space-y-4 p-3 rounded-3xl bg-slate-50/50 border border-brand-100/50 min-h-[500px] transition-colors duration-300">
              {stageClients.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-32 border-2 border-dashed border-brand-100 rounded-2xl opacity-40">
                  <p className="text-[10px] font-bold uppercase tracking-tighter text-text-muted">Empty Stage</p>
                </div>
              ) : (
                stageClients.map((client) => (
                  <div 
                    key={client.id}
                    className="p-4 bg-white rounded-2xl border border-brand-100 shadow-sm hover:shadow-xl hover:-translate-y-1 hover:border-brand-300 transition-all duration-300 group cursor-grab active:cursor-grabbing"
                  >
                    {/* CARD CONTENT */}
                    <div className="flex justify-between items-start mb-3">
                      <Badge variant="outline" className="text-[9px] border-brand-100 text-brand-600 bg-brand-50/30">
                        {client.company}
                      </Badge>
                      
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-7 w-7 rounded-full text-text-muted hover:bg-brand-50">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-52 rounded-xl">
                          <DropdownMenuLabel className="text-xs">Move to Stage</DropdownMenuLabel>
                          <DropdownMenuSeparator />
                          {STAGES.filter(s => s.id !== client.status).map(s => (
                            <DropdownMenuItem key={s.id} onClick={() => handleMove(client.id, s.id)} className="text-xs">
                              <ArrowRightLeft className="mr-2 h-3.5 w-3.5 opacity-50 text-brand-600" />
                              {s.name}
                            </DropdownMenuItem>
                          ))}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                    
                    <h4 className="font-bold text-text-primary text-[15px] mb-4 group-hover:text-brand-700 transition-colors">
                      {client.name}
                    </h4>

                    <div className="flex items-center justify-between pt-4 border-t border-slate-50">
                      <div className="flex items-center gap-1.5">
                        <div className="p-1 rounded-md bg-green-50">
                          <DollarSign className="h-3 w-3 text-green-600" />
                        </div>
                        <span className="text-xs font-bold text-text-secondary tracking-tight">12,500</span>
                      </div>
                      
                      <div className="flex items-center gap-1 text-[10px] font-bold text-orange-600 px-2 py-1 bg-orange-50 rounded-lg">
                        <Clock className="h-3 w-3" />
                        HOT
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        );
      })}
    </div>
  </div>
);}