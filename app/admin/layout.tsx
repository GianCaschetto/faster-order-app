"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { AdminSidebar } from "./components/admin-sidebar";
import { Button } from "@/components/ui/button";
import { HomeIcon, LogOut } from "lucide-react";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const isLoginPage = pathname === "/admin/login";

  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    const user = localStorage.getItem("adminUser");

    if (!token || !user) {
      if (!isLoginPage) {
        router.push("/admin/login");
      }
    } else {
      setIsAuthenticated(true);
    }
    setIsLoading(false);
  }, [router, isLoginPage]);

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    localStorage.removeItem("adminUser");
    router.push("/admin/login");
  };

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }

  if (isLoginPage) {
    return <div className="min-h-screen">{children}</div>;
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="grid min-h-screen w-full lg:grid-cols-[280px_1fr]">
      <AdminSidebar />
      <div className="flex flex-col">
        <header className="flex h-14 lg:h-[60px] items-center gap-4 border-b bg-muted/40 px-6">
          <div className="w-full flex-1">
            <h1 className="text-lg font-semibold">Admin Dashboard</h1>
          </div>
          <Button variant="outline" size="sm" className="lg:hidden">
            Menu
          </Button>
          {/* Go to home page */}
          <Button variant="outline" size="sm" onClick={() => router.push("/")}>
            <HomeIcon className="mr-2 h-4 w-4" />
            Catalog
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={handleLogout}
            className="hidden lg:flex"
          >
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </Button>
        </header>
        {children}
      </div>
    </div>
  );
}
