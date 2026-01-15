import React, { createContext, useContext, useState, ReactNode } from "react";
import { 
  mockMagazines, 
  mockDisplays, 
  mockOrders, 
  mockRetailers, 
  mockUsers,
  Magazine,
  DisplayProduct,
  Order,
  Retailer,
  User
} from "@/lib/mockData";

interface DataContextType {
  magazines: Magazine[];
  displays: DisplayProduct[];
  orders: Order[];
  retailers: Retailer[];
  users: User[];
  updateMagazine: (id: number, data: Partial<Magazine>) => void;
  updateDisplay: (id: number, data: Partial<DisplayProduct>) => void;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export function DataProvider({ children }: { children: ReactNode }) {
  const [magazines, setMagazines] = useState<Magazine[]>(mockMagazines);
  const [displays, setDisplays] = useState<DisplayProduct[]>(mockDisplays);
  const [orders, setOrders] = useState<Order[]>(mockOrders);
  const [retailers, setRetailers] = useState<Retailer[]>(mockRetailers);
  const [users, setUsers] = useState<User[]>(mockUsers);

  const updateMagazine = (id: number, data: Partial<Magazine>) => {
    setMagazines(prev => prev.map(m => m.id === id ? { ...m, ...data } : m));
  };

  const updateDisplay = (id: number, data: Partial<DisplayProduct>) => {
    setDisplays(prev => prev.map(d => d.id === id ? { ...d, ...data } : d));
  };

  return (
    <DataContext.Provider value={{ 
      magazines, 
      displays, 
      orders, 
      retailers, 
      users,
      updateMagazine,
      updateDisplay
    }}>
      {children}
    </DataContext.Provider>
  );
}

export function useData() {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error("useData must be used within a DataProvider");
  }
  return context;
}
