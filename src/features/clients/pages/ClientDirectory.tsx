import { Plus, Filter, Download, MoreHorizontal, UserPlus } from "lucide-react";
import { useClients } from "../hooks/useClients";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import PageLoader from "@/components/shared/PageLoader";

export default function ClientDirectory() {
  const { data: clients, isLoading, error } = useClients();

  if (isLoading) return <PageLoader />;

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] text-center">
        <div className="bg-red-50 text-red-600 p-4 rounded-full mb-4">
          <Filter className="h-6 w-6" />
        </div>
        <h3 className="text-lg font-semibold text-text-primary">Failed to sync directory</h3>
        <p className="text-text-muted max-w-xs mx-auto">Please check your connection or contact the system administrator.</p>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      
      {/* 1. HEADER & ACTION STRIP */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-text-primary">Clients</h1>
          <p className="text-text-muted mt-1">Manage your active accounts and pipeline relationships.</p>
        </div>
        
        <div className="flex items-center gap-3">
          <Button variant="outline" className="hidden sm:flex gap-2">
            <Download className="h-4 w-4" />
            Export
          </Button>
          <Button className="bg-brand-600 hover:bg-brand-700 text-white shadow-soft gap-2">
            <Plus className="h-4 w-4" />
            New Client
          </Button>
        </div>
      </div>

      {/* 2. DIRECTORY TABLE */}
      <div className="rounded-2xl border border-brand-100 bg-white shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-brand-50px bg-app/50 uppercase text-[10px] font-bold tracking-widest text-text-muted">
                <th className="px-6 py-4">Client / Company</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Engagement</th>
                <th className="px-6 py-4">Assigned To</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-brand-50">
              {clients?.length ? (
                clients.map((client) => (
                  <tr key={client.id} className="group hover:bg-brand-50/30 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex flex-col">
                        <span className="font-semibold text-text-primary">{client.name}</span>
                        <span className="text-xs text-text-muted">{client.company}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <Badge variant="outline" className={`
                        capitalize border-none px-2 py-0.5 text-[11px] font-bold
                        ${client.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-brand-100 text-brand-700'}
                      `}>
                        {client.status}
                      </Badge>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <div className="w-16 h-1.5 rounded-full bg-brand-50 overflow-hidden">
                          <div className="h-full bg-brand-500 rounded-full" style={{ width: '65%' }} />
                        </div>
                        <span className="text-xs font-medium text-text-secondary">High</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <div className="h-6 w-6 rounded-full bg-brand-200 flex items-center justify-center text-[10px] font-bold text-brand-700">
                          {client.name.charAt(0)}
                        </div>
                        <span className="text-sm text-text-secondary">Standard Account</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8 text-text-muted hover:text-brand-600">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-40">
                          <DropdownMenuItem>View Detail</DropdownMenuItem>
                          <DropdownMenuItem>Edit Profile</DropdownMenuItem>
                          <DropdownMenuItem className="text-red-600">Archive</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="py-20 text-center">
                    <div className="flex flex-col items-center gap-2">
                      <UserPlus className="h-10 w-10 text-brand-200" />
                      <p className="text-text-muted font-medium">No clients found in your directory.</p>
                      <Button variant="link" className="text-brand-600 font-bold p-0">Start by adding one</Button>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}