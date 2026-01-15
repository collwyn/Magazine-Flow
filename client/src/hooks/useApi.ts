import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { magazinesApi, displaysApi, retailersApi, ordersApi } from "@/lib/api";
import type { InsertMagazine, InsertDisplay, InsertRetailer } from "@shared/schema";

// Magazines
export function useMagazines() {
  return useQuery({
    queryKey: ["magazines"],
    queryFn: magazinesApi.getAll,
  });
}

export function useMagazine(id: number) {
  return useQuery({
    queryKey: ["magazines", id],
    queryFn: () => magazinesApi.getOne(id),
    enabled: !!id,
  });
}

export function useUpdateMagazine() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: Partial<InsertMagazine> }) =>
      magazinesApi.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["magazines"] });
    },
  });
}

export function useCreateMagazine() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: InsertMagazine) => magazinesApi.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["magazines"] });
    },
  });
}

// Displays
export function useDisplays() {
  return useQuery({
    queryKey: ["displays"],
    queryFn: displaysApi.getAll,
  });
}

export function useDisplay(id: number) {
  return useQuery({
    queryKey: ["displays", id],
    queryFn: () => displaysApi.getOne(id),
    enabled: !!id,
  });
}

export function useUpdateDisplay() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: Partial<InsertDisplay> }) =>
      displaysApi.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["displays"] });
    },
  });
}

export function useCreateDisplay() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: InsertDisplay) => displaysApi.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["displays"] });
    },
  });
}

// Retailers
export function useRetailers() {
  return useQuery({
    queryKey: ["retailers"],
    queryFn: retailersApi.getAll,
  });
}

export function useRetailer(id: number) {
  return useQuery({
    queryKey: ["retailers", id],
    queryFn: () => retailersApi.getOne(id),
    enabled: !!id,
  });
}

export function useUpdateRetailer() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: Partial<InsertRetailer> }) =>
      retailersApi.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["retailers"] });
    },
  });
}

export function useCreateRetailer() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: InsertRetailer) => retailersApi.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["retailers"] });
    },
  });
}

// Orders
export function useOrders(retailerId?: number) {
  return useQuery({
    queryKey: ["orders", retailerId],
    queryFn: () => ordersApi.getAll(retailerId),
  });
}

export function useOrder(id: number) {
  return useQuery({
    queryKey: ["orders", id],
    queryFn: () => ordersApi.getOne(id),
    enabled: !!id,
  });
}
