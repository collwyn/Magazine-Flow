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
  { id: 2, title: "National Geographic", publisher: "Disney", category: "Science", price: 9.99, stock: 120, sku: "NG-2024-05", status: "active", coverUrl: "https://images.unsplash.com/photo-1544967082-d9d25d867d66?auto=format&fit=crop&q=80&w=600", description: "Exploring the world, science, and nature." },
  { id: 3, title: "Time", publisher: "Time USA", category: "News", price: 7.99, stock: 800, sku: "TIME-2024-05", status: "active", coverUrl: "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&q=80&w=600", description: "Breaking news, analysis, and opinion." },
  { id: 4, title: "Architectural Digest", publisher: "Condé Nast", category: "Design", price: 14.99, stock: 30, sku: "AD-2024-05", status: "active", coverUrl: "https://images.unsplash.com/photo-1503602642458-232111445657?auto=format&fit=crop&q=80&w=600", description: "The international design authority." },
  { id: 5, title: "The New Yorker", publisher: "Condé Nast", category: "Culture", price: 8.99, stock: 200, sku: "NY-2024-05", status: "active", coverUrl: "https://images.unsplash.com/photo-1557264337-e8a93017fe92?auto=format&fit=crop&q=80&w=600", description: "Commentary on politics and culture." },
  { id: 6, title: "Wired", publisher: "Condé Nast", category: "Technology", price: 6.99, stock: 150, sku: "WRD-2024-05", status: "active", coverUrl: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&q=80&w=600", description: "Emerging technologies and their impact." },
  { id: 7, title: "Kinfolk", publisher: "Kinfolk", category: "Lifestyle", price: 18.00, stock: 40, sku: "KNF-2024-05", status: "active", coverUrl: "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?auto=format&fit=crop&q=80&w=600", description: "Slow living, design, and culture." },
  { id: 8, title: "Cereal", publisher: "Cereal", category: "Travel", price: 20.00, stock: 25, sku: "CRL-2024-05", status: "active", coverUrl: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&q=80&w=600", description: "Travel and style magazine." },
  { id: 9, title: "Monocle", publisher: "Monocle", category: "Business", price: 15.00, stock: 60, sku: "MNC-2024-05", status: "active", coverUrl: "https://images.unsplash.com/photo-1554415707-6e8cfc938549?auto=format&fit=crop&q=80&w=600", description: "Global affairs, business, culture, and design." },
  { id: 10, title: "Drift", publisher: "Drift", category: "Food", price: 24.00, stock: 15, sku: "DRF-2024-05", status: "active", coverUrl: "https://images.unsplash.com/photo-1512413316925-fd543016a275?auto=format&fit=crop&q=80&w=600", description: "Coffee culture around the world." },
  { id: 11, title: "Hypebeast", publisher: "Hypebeast", category: "Fashion", price: 12.00, stock: 100, sku: "HYP-2024-05", status: "active", coverUrl: "https://images.unsplash.com/photo-1529139574466-a302d2052574?auto=format&fit=crop&q=80&w=600", description: "Streetwear and contemporary fashion." },
  { id: 12, title: "GQ", publisher: "Condé Nast", category: "Men's Lifestyle", price: 8.99, stock: 300, sku: "GQ-2024-05", status: "active", coverUrl: "https://images.unsplash.com/photo-1617195920950-1145bf9a9c72?auto=format&fit=crop&q=80&w=600", description: "Men's style and culture." },
  { id: 13, title: "Vanity Fair", publisher: "Condé Nast", category: "Culture", price: 9.99, stock: 250, sku: "VF-2024-05", status: "active", coverUrl: "https://images.unsplash.com/photo-1532453288672-3a27e9be9efd?auto=format&fit=crop&q=80&w=600", description: "Pop culture, fashion, and politics." },
  { id: 14, title: "Esquire", publisher: "Hearst", category: "Men's Lifestyle", price: 7.99, stock: 220, sku: "ESQ-2024-05", status: "active", coverUrl: "https://images.unsplash.com/photo-1594270410221-e6a33cbc6fb9?auto=format&fit=crop&q=80&w=600", description: "Style, politics, and culture for men." },
  { id: 15, title: "Elle", publisher: "Hearst", category: "Fashion", price: 8.99, stock: 350, sku: "ELLE-2024-05", status: "active", coverUrl: "https://images.unsplash.com/photo-1566206091558-7f218b696731?auto=format&fit=crop&q=80&w=600", description: "Fashion, beauty, and lifestyle." },
  { id: 16, title: "Harper's Bazaar", publisher: "Hearst", category: "Fashion", price: 9.99, stock: 180, sku: "HB-2024-05", status: "active", coverUrl: "https://images.unsplash.com/photo-1550950796-030588647008?auto=format&fit=crop&q=80&w=600", description: "Sophisticated fashion and style." },
  { id: 17, title: "Rolling Stone", publisher: "Penske", category: "Music", price: 9.99, stock: 400, sku: "RS-2024-05", status: "active", coverUrl: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&q=80&w=600", description: "Music, pop culture, and politics." },
  { id: 18, title: "Billboard", publisher: "Penske", category: "Music", price: 10.99, stock: 150, sku: "BB-2024-05", status: "active", coverUrl: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&q=80&w=600", description: "Music industry news and charts." },
  { id: 19, title: "Forbes", publisher: "Whale Media", category: "Business", price: 12.99, stock: 200, sku: "FBS-2024-05", status: "active", coverUrl: "https://images.unsplash.com/photo-1616077167599-77a83d33261c?auto=format&fit=crop&q=80&w=600", description: "Business, investing, and wealth." },
  { id: 20, title: "Bloomberg Businessweek", publisher: "Bloomberg", category: "Business", price: 9.99, stock: 180, sku: "BBW-2024-05", status: "active", coverUrl: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=600", description: "Global business and market news." },
  { id: 21, title: "The Economist", publisher: "The Economist Group", category: "Business", price: 14.99, stock: 300, sku: "ECO-2024-05", status: "active", coverUrl: "https://images.unsplash.com/photo-1526304640152-d4619684e484?auto=format&fit=crop&q=80&w=600", description: "International news and business analysis." },
  { id: 22, title: "Scientific American", publisher: "Springer Nature", category: "Science", price: 10.99, stock: 100, sku: "SA-2024-05", status: "active", coverUrl: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&q=80&w=600", description: "Science news and research." },
  { id: 23, title: "Popular Science", publisher: "Recurrent", category: "Science", price: 8.99, stock: 120, sku: "PS-2024-05", status: "active", coverUrl: "https://images.unsplash.com/photo-1507668077129-56e324165b09?auto=format&fit=crop&q=80&w=600", description: "Science and technology news." },
  { id: 24, title: "Dwell", publisher: "Dwell Life", category: "Design", price: 14.99, stock: 80, sku: "DWL-2024-05", status: "active", coverUrl: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&q=80&w=600", description: "Modern architecture and design." },
  { id: 25, title: "Wallpaper*", publisher: "Future", category: "Design", price: 16.99, stock: 60, sku: "WPR-2024-05", status: "active", coverUrl: "https://images.unsplash.com/photo-1501183638710-841dd1904471?auto=format&fit=crop&q=80&w=600", description: "Design, architecture, and lifestyle." },
  { id: 26, title: "Bon Appétit", publisher: "Condé Nast", category: "Food", price: 8.99, stock: 250, sku: "BA-2024-05", status: "active", coverUrl: "https://images.unsplash.com/photo-1493770348161-369560ae357d?auto=format&fit=crop&q=80&w=600", description: "Food, recipes, and restaurant reviews." },
  { id: 27, title: "Food & Wine", publisher: "Dotdash Meredith", category: "Food", price: 9.99, stock: 220, sku: "FW-2024-05", status: "active", coverUrl: "https://images.unsplash.com/photo-1498837167922-ddd27525d352?auto=format&fit=crop&q=80&w=600", description: "Recipes, wine, and travel." },
  { id: 28, title: "Travel + Leisure", publisher: "Dotdash Meredith", category: "Travel", price: 9.99, stock: 180, sku: "TL-2024-05", status: "active", coverUrl: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&q=80&w=600", description: "Travel guides and tips." },
  { id: 29, title: "Condé Nast Traveler", publisher: "Condé Nast", category: "Travel", price: 10.99, stock: 150, sku: "CNT-2024-05", status: "active", coverUrl: "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&q=80&w=600", description: "Luxury travel and lifestyle." },
  { id: 30, title: "Sports Illustrated", publisher: "Minute Media", category: "Sports", price: 8.99, stock: 300, sku: "SI-2024-05", status: "active", coverUrl: "https://images.unsplash.com/photo-1579952363873-27f3bade9f55?auto=format&fit=crop&q=80&w=600", description: "Sports news and analysis." },
  { id: 31, title: "ESPN The Magazine", publisher: "Hearst", category: "Sports", price: 7.99, stock: 200, sku: "ESPN-2024-05", status: "active", coverUrl: "https://images.unsplash.com/photo-1518611507436-e922f08bc29d?auto=format&fit=crop&q=80&w=600", description: "Sports coverage and commentary." },
  { id: 32, title: "Runners World", publisher: "Hearst", category: "Sports", price: 8.99, stock: 150, sku: "RW-2024-05", status: "active", coverUrl: "https://images.unsplash.com/photo-1452626038306-9aae5e071dd3?auto=format&fit=crop&q=80&w=600", description: "Running tips and gear reviews." },
  { id: 33, title: "Golf Digest", publisher: "Warner Bros. Discovery", category: "Sports", price: 9.99, stock: 120, sku: "GD-2024-05", status: "active", coverUrl: "https://images.unsplash.com/photo-1535131749006-b7f58c99034b?auto=format&fit=crop&q=80&w=600", description: "Golf instruction and news." },
  { id: 34, title: "Car and Driver", publisher: "Hearst", category: "Automotive", price: 7.99, stock: 180, sku: "CD-2024-05", status: "active", coverUrl: "https://images.unsplash.com/photo-1503376763036-066120622c74?auto=format&fit=crop&q=80&w=600", description: "Automotive reviews and news." },
  { id: 35, title: "MotorTrend", publisher: "Warner Bros. Discovery", category: "Automotive", price: 8.99, stock: 150, sku: "MT-2024-05", status: "active", coverUrl: "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&q=80&w=600", description: "Car news and road tests." },
  { id: 36, title: "PC Gamer", publisher: "Future", category: "Gaming", price: 11.99, stock: 200, sku: "PCG-2024-05", status: "active", coverUrl: "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80&w=600", description: "PC gaming news and reviews." },
  { id: 37, title: "Game Informer", publisher: "GameStop", category: "Gaming", price: 8.99, stock: 250, sku: "GI-2024-05", status: "active", coverUrl: "https://images.unsplash.com/photo-1552820728-8b83bb6b773f?auto=format&fit=crop&q=80&w=600", description: "Video game news and reviews." },
  { id: 38, title: "Edge", publisher: "Future", category: "Gaming", price: 14.99, stock: 80, sku: "EDG-2024-05", status: "active", coverUrl: "https://images.unsplash.com/photo-1538481199705-c710c4e965fc?auto=format&fit=crop&q=80&w=600", description: "Video game culture and industry." },
  { id: 39, title: "Variety", publisher: "Penske", category: "Entertainment", price: 12.99, stock: 100, sku: "VAR-2024-05", status: "active", coverUrl: "https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&q=80&w=600", description: "Entertainment industry news." },
  { id: 40, title: "The Hollywood Reporter", publisher: "Penske", category: "Entertainment", price: 12.99, stock: 90, sku: "THR-2024-05", status: "active", coverUrl: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?auto=format&fit=crop&q=80&w=600", description: "Film and TV industry news." },
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
