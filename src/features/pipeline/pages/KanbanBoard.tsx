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
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-text-primary">Deal Pipeline</h1>
          <p className="text-text-muted text-sm mt-1">Manage stage transitions and velocity.</p>
        </div>
        <Button className="bg-brand-900 text-white hover:bg-black gap-2">
          <Plus className="h-4 w-4" />
          Add Prospect
        </Button>
      </div>

      <div className="flex gap-6 overflow-x-auto pb-6 scrollbar-hide">
        {STAGES.map((stage) => {
          const stageClients = clients?.filter(c => c.status === stage.id) || [];
          
          return (
            <div key={stage.id} className="flex-shrink-0 w-80 flex flex-col gap-4">
              <div className="flex items-center justify-between px-2">
                <div className="flex items-center gap-2">
                  <div className={`h-2 w-2 rounded-full ${stage.color}`} />
                  <h3 className="font-bold text-xs text-text-primary uppercase tracking-widest">
                    {stage.name}
                  </h3>
                  <Badge variant="secondary" className="ml-2 bg-brand-50 text-brand-700 hover:bg-brand-50 border-none">
                    {stageClients.length}
                  </Badge>
                </div>
              </div>

              <div className="flex-1 space-y-3 p-2 rounded-2xl bg-app/40 border border-brand-50/50 min-h-[500px]">
                {stageClients.map((client) => (
                  <div 
                    key={client.id}
                    className="p-4 bg-white rounded-xl border border-brand-100 shadow-sm hover:shadow-md hover:border-brand-300 transition-all group"
                  >
                    <div className="flex justify-between items-start mb-3">
                      <span className="text-[10px] font-bold text-brand-600 uppercase tracking-tighter">
                        {client.company}
                      </span>
                      
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-6 w-6 text-text-muted">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-48">
                          <DropdownMenuLabel>Move Stage</DropdownMenuLabel>
                          <DropdownMenuSeparator />
                          {STAGES.filter(s => s.id !== client.status).map(s => (
                            <DropdownMenuItem key={s.id} onClick={() => handleMove(client.id, s.id)}>
                              <ArrowRightLeft className="mr-2 h-4 w-4 opacity-50" />
                              {s.name}
                            </DropdownMenuItem>
                          ))}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                    
                    <h4 className="font-bold text-text-primary text-sm mb-4">
                      {client.name}
                    </h4>

                    <div className="flex items-center justify-between pt-3 border-t border-brand-50">
                      <div className="flex items-center gap-1.5 text-text-muted">
                        <DollarSign className="h-3.5 w-3.5 text-green-600" />
                        <span className="text-xs font-semibold text-text-secondary">12.5k</span>
                      </div>
                      {/* USING BADGE FOR URGENCY SIGNAL */}
                      <Badge variant="outline" className="text-[9px] font-medium border-orange-100 bg-orange-50 text-orange-700">
                        <Clock className="h-2.5 w-2.5 mr-1" />
                        Hot Lead
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}