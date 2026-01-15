import { z } from "zod";

export const UserRole = {
  ADMIN: "admin",
  RETAILER: "retailer",
} as const;

export interface User {
  id: number;
  username: string;
  role: typeof UserRole[keyof typeof UserRole];
  email: string;
  retailerId?: number;
}

export interface Retailer {
  id: number;
  name: string;
  address: string;
  contactPerson: string;
  email: string;
  phone: string;
  creditLimit: number;
  currentBalance: number;
  status: "active" | "inactive" | "suspended";
}

export interface Magazine {
  id: number;
  title: string;
  publisher: string;
  category: string;
  price: number;
  stock: number;
  sku: string;
  status: "active" | "discontinued";
  coverUrl?: string;
}

export interface Order {
  id: number;
  orderNumber: string;
  retailerId: number;
  orderDate: string;
  status: "pending" | "confirmed" | "processing" | "in-transit" | "delivered" | "cancelled";
  totalAmount: number;
  paymentStatus: "unpaid" | "paid" | "partial";
  items: OrderItem[];
}

export interface OrderItem {
  id: number;
  magazineId: number;
  quantity: number;
  unitPrice: number;
}

// Mock Data
export const mockUsers: User[] = [
  { id: 1, username: "admin", role: "admin", email: "admin@iconic.com" },
  { id: 2, username: "retailer1", role: "retailer", email: "store@nycnews.com", retailerId: 1 },
  { id: 3, username: "retailer2", role: "retailer", email: "manager@booknook.com", retailerId: 2 },
];

export const mockRetailers: Retailer[] = [
  { 
    id: 1, 
    name: "NYC Newsstand #42", 
    address: "123 Broadway, New York, NY", 
    contactPerson: "John Smith", 
    email: "store@nycnews.com", 
    phone: "212-555-0123", 
    creditLimit: 5000, 
    currentBalance: 1250.50, 
    status: "active" 
  },
  { 
    id: 2, 
    name: "The Book Nook", 
    address: "456 5th Ave, Brooklyn, NY", 
    contactPerson: "Jane Doe", 
    email: "manager@booknook.com", 
    phone: "718-555-0456", 
    creditLimit: 3000, 
    currentBalance: 0, 
    status: "active" 
  },
  { 
    id: 3, 
    name: "Airport Relay", 
    address: "Terminal 4, JFK Airport", 
    contactPerson: "Mike Ross", 
    email: "orders@relay.com", 
    phone: "718-555-0789", 
    creditLimit: 10000, 
    currentBalance: 4500.00, 
    status: "active" 
  }
];

export const mockMagazines: Magazine[] = [
  { id: 1, title: "Vogue", publisher: "Condé Nast", category: "Fashion", price: 12.99, stock: 450, sku: "VOG-2024-05", status: "active", coverUrl: "https://images.unsplash.com/photo-1596464716127-f2a82984de75?auto=format&fit=crop&q=80&w=600" },
  { id: 2, title: "National Geographic", publisher: "Disney", category: "Science", price: 9.99, stock: 120, sku: "NG-2024-05", status: "active", coverUrl: "https://images.unsplash.com/photo-1544967082-d9d25d867d66?auto=format&fit=crop&q=80&w=600" },
  { id: 3, title: "Time", publisher: "Time USA", category: "News", price: 7.99, stock: 800, sku: "TIME-2024-05", status: "active", coverUrl: "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&q=80&w=600" },
  { id: 4, title: "Architectural Digest", publisher: "Condé Nast", category: "Design", price: 14.99, stock: 30, sku: "AD-2024-05", status: "active", coverUrl: "https://images.unsplash.com/photo-1503602642458-232111445657?auto=format&fit=crop&q=80&w=600" },
  { id: 5, title: "The New Yorker", publisher: "Condé Nast", category: "Culture", price: 8.99, stock: 200, sku: "NY-2024-05", status: "active", coverUrl: "https://images.unsplash.com/photo-1557264337-e8a93017fe92?auto=format&fit=crop&q=80&w=600" },
  { id: 6, title: "Wired", publisher: "Condé Nast", category: "Technology", price: 6.99, stock: 150, sku: "WRD-2024-05", status: "active", coverUrl: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&q=80&w=600" },
];

export const mockOrders: Order[] = [
  {
    id: 101,
    orderNumber: "ORD-2024-1001",
    retailerId: 1,
    orderDate: "2024-05-10",
    status: "delivered",
    totalAmount: 450.50,
    paymentStatus: "paid",
    items: [
      { id: 1, magazineId: 1, quantity: 20, unitPrice: 12.99 },
      { id: 2, magazineId: 3, quantity: 15, unitPrice: 7.99 },
    ]
  },
  {
    id: 102,
    orderNumber: "ORD-2024-1002",
    retailerId: 2,
    orderDate: "2024-05-11",
    status: "processing",
    totalAmount: 120.00,
    paymentStatus: "paid",
    items: [
      { id: 3, magazineId: 2, quantity: 12, unitPrice: 9.99 },
    ]
  },
  {
    id: 103,
    orderNumber: "ORD-2024-1003",
    retailerId: 1,
    orderDate: "2024-05-12",
    status: "pending",
    totalAmount: 800.00,
    paymentStatus: "unpaid",
    items: [
      { id: 4, magazineId: 4, quantity: 10, unitPrice: 14.99 },
      { id: 5, magazineId: 1, quantity: 50, unitPrice: 12.99 },
    ]
  },
    {
    id: 104,
    orderNumber: "ORD-2024-1004",
    retailerId: 3,
    orderDate: "2024-05-12",
    status: "in-transit",
    totalAmount: 2500.00,
    paymentStatus: "partial",
    items: [
      { id: 6, magazineId: 1, quantity: 100, unitPrice: 12.99 },
      { id: 7, magazineId: 3, quantity: 100, unitPrice: 7.99 },
    ]
  }
];

// Helper to simulate authentication
export const getCurrentUser = () => {
  // Simulating logged in Admin by default for dev
  return mockUsers[0]; 
};
