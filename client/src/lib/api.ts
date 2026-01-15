import type { 
  Magazine, Display, Retailer, Order,
  InsertMagazine, InsertDisplay, InsertRetailer
} from "@shared/schema";

const API_BASE = "/api";

async function fetchJSON<T>(url: string, options?: RequestInit): Promise<T> {
  const response = await fetch(url, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...options?.headers,
    },
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ error: "Request failed" }));
    throw new Error(error.error || `HTTP ${response.status}`);
  }

  return response.json();
}

// Magazines
export const magazinesApi = {
  getAll: () => fetchJSON<Magazine[]>(`${API_BASE}/magazines`),
  getOne: (id: number) => fetchJSON<Magazine>(`${API_BASE}/magazines/${id}`),
  create: (data: InsertMagazine) => 
    fetchJSON<Magazine>(`${API_BASE}/magazines`, {
      method: "POST",
      body: JSON.stringify(data),
    }),
  update: (id: number, data: Partial<InsertMagazine>) =>
    fetchJSON<Magazine>(`${API_BASE}/magazines/${id}`, {
      method: "PATCH",
      body: JSON.stringify(data),
    }),
};

// Displays
export const displaysApi = {
  getAll: () => fetchJSON<Display[]>(`${API_BASE}/displays`),
  getOne: (id: number) => fetchJSON<Display>(`${API_BASE}/displays/${id}`),
  create: (data: InsertDisplay) =>
    fetchJSON<Display>(`${API_BASE}/displays`, {
      method: "POST",
      body: JSON.stringify(data),
    }),
  update: (id: number, data: Partial<InsertDisplay>) =>
    fetchJSON<Display>(`${API_BASE}/displays/${id}`, {
      method: "PATCH",
      body: JSON.stringify(data),
    }),
};

// Retailers
export const retailersApi = {
  getAll: () => fetchJSON<Retailer[]>(`${API_BASE}/retailers`),
  getOne: (id: number) => fetchJSON<Retailer>(`${API_BASE}/retailers/${id}`),
  create: (data: InsertRetailer) =>
    fetchJSON<Retailer>(`${API_BASE}/retailers`, {
      method: "POST",
      body: JSON.stringify(data),
    }),
  update: (id: number, data: Partial<InsertRetailer>) =>
    fetchJSON<Retailer>(`${API_BASE}/retailers/${id}`, {
      method: "PATCH",
      body: JSON.stringify(data),
    }),
};

// Orders
export const ordersApi = {
  getAll: (retailerId?: number) => {
    const params = retailerId ? `?retailerId=${retailerId}` : "";
    return fetchJSON<Order[]>(`${API_BASE}/orders${params}`);
  },
  getOne: (id: number) => fetchJSON<Order & { items: any[] }>(`${API_BASE}/orders/${id}`),
};
