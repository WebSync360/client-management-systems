export type ClientStatus = 'active' | 'lead' | 'inactive' | 'onboarding' | 'churned';

export interface Client {
  id: string;
  name: string;
  company: string;
  email: string;
  phone: string;
  status: ClientStatus;
  value: number;            // Annual/Monthly Contract Value
  assignedTo: string;       // Internal account manager name
  lastContacted: string;    // ISO Date
  createdAt: string;        // ISO Date
  tags: string[];           // e.g., ["Enterprise", "High-Value"]
  avatar?: string;
}

export interface ClientStats {
  totalClients: number;
  activeRevenue: number;
  pendingDeals: number;
  churnRate: string;
}