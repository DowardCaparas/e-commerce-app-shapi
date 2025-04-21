// context/AuthContext.tsx
"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { User } from "../lib/definitions";

interface AuthContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  fetchUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {  
  const [user, setUser] = useState<User | null>(null);

  const fetchUser = async () => {
    const token = localStorage.getItem("token");
    if (!token) return;
  
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/me`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      if (res.status === 401) {
        // Token expired or invalid
        console.warn("Token expired or invalid");
        localStorage.removeItem("token");
        localStorage.removeItem("accountID");
        setUser(null);
        return;
      }
  
      if (!res.ok) {
        throw new Error("Failed to fetch user");
      }
  
      const data: User = await res.json();
      setUser(data);
    } catch (err) {
      console.error("Fetch user error:", err);
      setUser(null);
    }
  };
  

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser, fetchUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
