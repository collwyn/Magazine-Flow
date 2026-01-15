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
  description?: string;
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
  { id: 1, title: "Vogue", publisher: "Condé Nast", category: "Fashion", price: 12.99, stock: 450, sku: "VOG-2024-05", status: "active", coverUrl: "https://images.unsplash.com/photo-1596464716127-f2a82984de75?auto=format&fit=crop&q=80&w=600", description: "The leading fashion magazine covering style, beauty, and culture." },
  { id: 2, title: "National Geographic", publisher: "Disney", category: "Science", price: 9.99, stock: 120, sku: "NG-2024-05", status: "active", coverUrl: "https://images.unsplash.com/photo-1534135544487-1906a2372c3d?auto=format&fit=crop&q=80&w=600", description: "Exploring the world, science, and nature." },
  { id: 3, title: "Time", publisher: "Time USA", category: "News", price: 7.99, stock: 800, sku: "TIME-2024-05", status: "active", coverUrl: "https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&q=80&w=600", description: "Breaking news, analysis, and opinion." },
  { id: 4, title: "Architectural Digest", publisher: "Condé Nast", category: "Design", price: 14.99, stock: 30, sku: "AD-2024-05", status: "active", coverUrl: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=600", description: "The international design authority." },
  { id: 5, title: "The New Yorker", publisher: "Condé Nast", category: "Culture", price: 8.99, stock: 200, sku: "NY-2024-05", status: "active", coverUrl: "https://images.unsplash.com/photo-1588514128527-2c13d7537b08?auto=format&fit=crop&q=80&w=600", description: "Commentary on politics and culture." },
  { id: 6, title: "Wired", publisher: "Condé Nast", category: "Technology", price: 6.99, stock: 150, sku: "WRD-2024-05", status: "active", coverUrl: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&q=80&w=600", description: "Emerging technologies and their impact." },
  { id: 7, title: "Kinfolk", publisher: "Kinfolk", category: "Lifestyle", price: 18.00, stock: 40, sku: "KNF-2024-05", status: "active", coverUrl: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&q=80&w=600", description: "Slow living, design, and culture." },
  { id: 8, title: "Cereal", publisher: "Cereal", category: "Travel", price: 20.00, stock: 25, sku: "CRL-2024-05", status: "active", coverUrl: "https://images.unsplash.com/photo-1522850959516-58f958dfe2ad?auto=format&fit=crop&q=80&w=600", description: "Travel and style magazine." },
  { id: 9, title: "Monocle", publisher: "Monocle", category: "Business", price: 15.00, stock: 60, sku: "MNC-2024-05", status: "active", coverUrl: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80&w=600", description: "Global affairs, business, culture, and design." },
  { id: 10, title: "Drift", publisher: "Drift", category: "Food", price: 24.00, stock: 15, sku: "DRF-2024-05", status: "active", coverUrl: "https://images.unsplash.com/photo-1497935586351-b67a49e012bf?auto=format&fit=crop&q=80&w=600", description: "Coffee culture around the world." },
  { id: 11, title: "Hypebeast", publisher: "Hypebeast", category: "Fashion", price: 12.00, stock: 100, sku: "HYP-2024-05", status: "active", coverUrl: "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&q=80&w=600", description: "Streetwear and contemporary fashion." },
  { id: 12, title: "GQ", publisher: "Condé Nast", category: "Men's Lifestyle", price: 8.99, stock: 300, sku: "GQ-2024-05", status: "active", coverUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=600", description: "Men's style and culture." },
  { id: 13, title: "Vanity Fair", publisher: "Condé Nast", category: "Culture", price: 9.99, stock: 250, sku: "VF-2024-05", status: "active", coverUrl: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&q=80&w=600", description: "Pop culture, fashion, and politics." },
  { id: 14, title: "Esquire", publisher: "Hearst", category: "Men's Lifestyle", price: 7.99, stock: 220, sku: "ESQ-2024-05", status: "active", coverUrl: "https://images.unsplash.com/photo-1487222477894-8943e31ef7b2?auto=format&fit=crop&q=80&w=600", description: "Style, politics, and culture for men." },
  { id: 15, title: "Elle", publisher: "Hearst", category: "Fashion", price: 8.99, stock: 350, sku: "ELLE-2024-05", status: "active", coverUrl: "https://images.unsplash.com/photo-1485230946086-1d99d50b286c?auto=format&fit=crop&q=80&w=600", description: "Fashion, beauty, and lifestyle." },
  { id: 16, title: "Harper's Bazaar", publisher: "Hearst", category: "Fashion", price: 9.99, stock: 180, sku: "HB-2024-05", status: "active", coverUrl: "https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&q=80&w=600", description: "Sophisticated fashion and style." },
  { id: 17, title: "Rolling Stone", publisher: "Penske", category: "Music", price: 9.99, stock: 400, sku: "RS-2024-05", status: "active", coverUrl: "https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?auto=format&fit=crop&q=80&w=600", description: "Music, pop culture, and politics." },
  { id: 18, title: "Billboard", publisher: "Penske", category: "Music", price: 10.99, stock: 150, sku: "BB-2024-05", status: "active", coverUrl: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?auto=format&fit=crop&q=80&w=600", description: "Music industry news and charts." },
  { id: 19, title: "Forbes", publisher: "Whale Media", category: "Business", price: 12.99, stock: 200, sku: "FBS-2024-05", status: "active", coverUrl: "https://images.unsplash.com/photo-1579532537598-459ecdaf39cc?auto=format&fit=crop&q=80&w=600", description: "Business, investing, and wealth." },
  { id: 20, title: "Bloomberg Businessweek", publisher: "Bloomberg", category: "Business", price: 9.99, stock: 180, sku: "BBW-2024-05", status: "active", coverUrl: "https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?auto=format&fit=crop&q=80&w=600", description: "Global business and market news." },
  { id: 21, title: "The Economist", publisher: "The Economist Group", category: "Business", price: 14.99, stock: 300, sku: "ECO-2024-05", status: "active", coverUrl: "https://images.unsplash.com/photo-1585829365295-ab7cd400c167?auto=format&fit=crop&q=80&w=600", description: "International news and business analysis." },
  { id: 22, title: "Scientific American", publisher: "Springer Nature", category: "Science", price: 10.99, stock: 100, sku: "SA-2024-05", status: "active", coverUrl: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&q=80&w=600", description: "Science news and research." },
  { id: 23, title: "Popular Science", publisher: "Recurrent", category: "Science", price: 8.99, stock: 120, sku: "PS-2024-05", status: "active", coverUrl: "https://images.unsplash.com/photo-1581093458891-2f30890918b6?auto=format&fit=crop&q=80&w=600", description: "Science and technology news." },
  { id: 24, title: "Dwell", publisher: "Dwell Life", category: "Design", price: 14.99, stock: 80, sku: "DWL-2024-05", status: "active", coverUrl: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&q=80&w=600", description: "Modern architecture and design." },
  { id: 25, title: "Wallpaper*", publisher: "Future", category: "Design", price: 16.99, stock: 60, sku: "WPR-2024-05", status: "active", coverUrl: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&q=80&w=600", description: "Design, architecture, and lifestyle." },
  { id: 26, title: "Bon Appétit", publisher: "Condé Nast", category: "Food", price: 8.99, stock: 250, sku: "BA-2024-05", status: "active", coverUrl: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&q=80&w=600", description: "Food, recipes, and restaurant reviews." },
  { id: 27, title: "Food & Wine", publisher: "Dotdash Meredith", category: "Food", price: 9.99, stock: 220, sku: "FW-2024-05", status: "active", coverUrl: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&q=80&w=600", description: "Recipes, wine, and travel." },
  { id: 28, title: "Travel + Leisure", publisher: "Dotdash Meredith", category: "Travel", price: 9.99, stock: 180, sku: "TL-2024-05", status: "active", coverUrl: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80&w=600", description: "Travel guides and tips." },
  { id: 29, title: "Condé Nast Traveler", publisher: "Condé Nast", category: "Travel", price: 10.99, stock: 150, sku: "CNT-2024-05", status: "active", coverUrl: "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&q=80&w=600", description: "Luxury travel and lifestyle." },
  { id: 30, title: "Sports Illustrated", publisher: "Minute Media", category: "Sports", price: 8.99, stock: 300, sku: "SI-2024-05", status: "active", coverUrl: "https://images.unsplash.com/photo-1517466787929-bc90951d0974?auto=format&fit=crop&q=80&w=600", description: "Sports news and analysis." },
  { id: 31, title: "ESPN The Magazine", publisher: "Hearst", category: "Sports", price: 7.99, stock: 200, sku: "ESPN-2024-05", status: "active", coverUrl: "https://images.unsplash.com/photo-1587329310686-94757394aa60?auto=format&fit=crop&q=80&w=600", description: "Sports coverage and commentary." },
  { id: 32, title: "Runners World", publisher: "Hearst", category: "Sports", price: 8.99, stock: 150, sku: "RW-2024-05", status: "active", coverUrl: "https://images.unsplash.com/photo-1452626038306-9aae5e071dd3?auto=format&fit=crop&q=80&w=600", description: "Running tips and gear reviews." },
  { id: 33, title: "Golf Digest", publisher: "Warner Bros. Discovery", category: "Sports", price: 9.99, stock: 120, sku: "GD-2024-05", status: "active", coverUrl: "https://images.unsplash.com/photo-1535131749006-b7f58c99034b?auto=format&fit=crop&q=80&w=600", description: "Golf instruction and news." },
  { id: 34, title: "Car and Driver", publisher: "Hearst", category: "Automotive", price: 7.99, stock: 180, sku: "CD-2024-05", status: "active", coverUrl: "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?auto=format&fit=crop&q=80&w=600", description: "Automotive reviews and news." },
  { id: 35, title: "MotorTrend", publisher: "Warner Bros. Discovery", category: "Automotive", price: 8.99, stock: 150, sku: "MT-2024-05", status: "active", coverUrl: "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&q=80&w=600", description: "Car news and road tests." },
  { id: 36, title: "PC Gamer", publisher: "Future", category: "Gaming", price: 11.99, stock: 200, sku: "PCG-2024-05", status: "active", coverUrl: "https://images.unsplash.com/photo-1587202372775-e229f172b9d7?auto=format&fit=crop&q=80&w=600", description: "PC gaming news and reviews." },
  { id: 37, title: "Game Informer", publisher: "GameStop", category: "Gaming", price: 8.99, stock: 250, sku: "GI-2024-05", status: "active", coverUrl: "https://images.unsplash.com/photo-1551103782-8ab07afd45c1?auto=format&fit=crop&q=80&w=600", description: "Video game news and reviews." },
  { id: 38, title: "Edge", publisher: "Future", category: "Gaming", price: 14.99, stock: 80, sku: "EDG-2024-05", status: "active", coverUrl: "https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&q=80&w=600", description: "Video game culture and industry." },
  { id: 39, title: "Variety", publisher: "Penske", category: "Entertainment", price: 12.99, stock: 100, sku: "VAR-2024-05", status: "active", coverUrl: "https://images.unsplash.com/photo-1478720568477-152d9b164e63?auto=format&fit=crop&q=80&w=600", description: "Entertainment industry news." },
  { id: 40, title: "The Hollywood Reporter", publisher: "Penske", category: "Entertainment", price: 12.99, stock: 90, sku: "THR-2024-05", status: "active", coverUrl: "https://images.unsplash.com/photo-1594909122845-11baa439b7bf?auto=format&fit=crop&q=80&w=600", description: "Film and TV industry news." },
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
