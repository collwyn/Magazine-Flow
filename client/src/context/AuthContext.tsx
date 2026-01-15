import React, { createContext, useContext, useState, ReactNode } from 'react';
import { User, mockUsers } from '@/lib/mockData';

interface AuthContextType {
  user: User;
  login: (userId: number) => void;
  logout: () => void;
  switchRole: (role: 'admin' | 'retailer') => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  // Default to the first admin user
  const [user, setUser] = useState<User>(mockUsers[0]);

  const login = (userId: number) => {
    const foundUser = mockUsers.find(u => u.id === userId);
    if (foundUser) {
      setUser(foundUser);
    }
  };

  const logout = () => {
    // In a real app, this would clear session
    console.log("Logged out");
  };

  const switchRole = (role: 'admin' | 'retailer') => {
    // Find the first user with the requested role
    const foundUser = mockUsers.find(u => u.role === role);
    if (foundUser) {
      setUser(foundUser);
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, switchRole }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
