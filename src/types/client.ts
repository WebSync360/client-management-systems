export type ClientStatus = 'lead' | 'active' | 'inactive' | 'onboarding';

export interface Client {
  id: string;
  name: string;
  company: string;
  email: string;
  status: ClientStatus;
  value: number;        // Monthly revenue
  assignedTo: string;   // Employee Name
  lastContact: string;  // ISO Date string
  avatar?: string;
}

export interface ClientStats {
  totalClients: number;
  activeDeals: number;
  monthlyRevenue: number;
  conversionRate: number;
}