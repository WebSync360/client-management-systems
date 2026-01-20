import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import api from "@/api/axiosInstance";
import type { Client } from "@/types/client";
import { toast } from "sonner";
import { type AxiosError } from "axios";

interface ApiErrorData {
  message?: string;
  code?: string;
}

export function useClients() {
  return useQuery<Client[]>({
    queryKey: ["clients", "list"],
    queryFn: async () => {
      const data = await api.get("/clients");
      return data as unknown as Client[];
    },
  });
}

export function useClient(id: string | undefined) {
  return useQuery<Client>({
    queryKey: ["clients", "detail", id],
    queryFn: async () => {
      const data = await api.get(`/clients/${id}`);
      return data as unknown as Client;
    },
    enabled: !!id,
    staleTime: 1000 * 60 * 10,
  });
}

export function useUpdateClientStatus() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, status }: { id: string; status: string }) => {
      const data = await api.patch(`/clients/${id}`, { status });
      return data as unknown as Client;
    },
    onSuccess: (updatedClient) => {
      queryClient.setQueryData(["clients", "list"], (old: Client[] | undefined) => 
        old ? old.map(c => c.id === updatedClient.id ? updatedClient : c) : []
      );
      queryClient.setQueryData(["clients", "detail", updatedClient.id], updatedClient);
      toast.success("Client status synchronized");
    },
    // STRATEGY: Typed Error Handling
    // Replacing 'any' with AxiosError<ApiErrorData>
    onError: (error: AxiosError<ApiErrorData>) => {
      const message = error.response?.data?.message || "Update failed";
      toast.error(message);
    }
  });
}