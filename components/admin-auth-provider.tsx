"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { useRouter, usePathname } from "next/navigation";

interface AdminUser {
  email: string;
  role: string;
}

interface AdminAuthContextType {
  user: AdminUser | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
}

const AdminAuthContext = createContext<AdminAuthContextType | undefined>(
  undefined
);

export function AdminAuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AdminUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // Check if user is already logged in
    const storedUser = localStorage.getItem("adminUser");
    const token = localStorage.getItem("adminToken");

    if (storedUser && token) {
      setUser(JSON.parse(storedUser));
    }

    setIsLoading(false);
  }, []);

  useEffect(() => {
    // Protect admin routes
    if (!isLoading) {
      const isAdminRoute = pathname?.startsWith("/admin");
      const isLoginPage = pathname === "/admin/login";

      if (isAdminRoute && !isLoginPage && !user) {
        router.push("/admin/login");
      }
    }
  }, [isLoading, user, pathname, router]);

  const login = async (email: string, password: string): Promise<boolean> => {
    // Mock authentication
    if (email === "admin@restaurant.com" && password === "admin123") {
      const userData = { email, role: "admin" };
      localStorage.setItem("adminToken", "mock-jwt-token");
      localStorage.setItem("adminUser", JSON.stringify(userData));
      setUser(userData);
      return true;
    }
    return false;
  };

  const logout = () => {
    localStorage.removeItem("adminToken");
    localStorage.removeItem("adminUser");
    setUser(null);
    router.push("/admin/login");
  };

  if (!user || !user.email) {
    throw new Error("No estás autorizado para acceder a esta página");
  }

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p>Cargando...</p>
      </div>
    );
  }

  return (
    <AdminAuthContext.Provider value={{ user, isLoading, login, logout }}>
      {children}
    </AdminAuthContext.Provider>
  );
}

export function useAdminAuth() {
  const context = useContext(AdminAuthContext);
  if (context === undefined) {
    throw new Error("useAdminAuth must be used within an AdminAuthProvider");
  }
  return context;
}
