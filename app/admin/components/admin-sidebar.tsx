"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  BarChart3,
  Clock,
  Home,
  LogOut,
  Package,
  Settings,
  ShoppingBag,
  Users,
  Database,
} from "lucide-react";
import { Button } from "@/components/ui/button";

export function AdminSidebar() {
  const router = useRouter();
  const pathname = usePathname();

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    localStorage.removeItem("adminUser");
    router.push("/admin/login");
  };

  return (
    <div className="hidden border-r bg-muted/40 lg:block">
      <div className="flex h-full max-h-screen flex-col gap-2">
        <div className="flex h-[60px] items-center border-b px-6">
          <Link
            href="/admin/dashboard"
            className="flex items-center gap-2 font-semibold"
          >
            <Package className="h-6 w-6" />
            <span>Restaurant Admin</span>
          </Link>
        </div>
        <div className="flex-1 overflow-auto py-2">
          <nav className="grid items-start px-4 text-sm font-medium">
            <Link
              href="/admin/dashboard"
              className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all ${
                pathname === "/admin/dashboard"
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:text-primary"
              }`}
            >
              <Home className="h-4 w-4" />
              Dashboard
            </Link>
            <Link
              href="/admin/orders"
              className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all ${
                pathname === "/admin/orders"
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:text-primary"
              }`}
            >
              <ShoppingBag className="h-4 w-4" />
              Orders
            </Link>
            <Link
              href="/admin/stock"
              className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all ${
                pathname === "/admin/stock"
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:text-primary"
              }`}
            >
              <Database className="h-4 w-4" />
              Inventory
            </Link>
            <Link
              href="/admin/schedule"
              className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all ${
                pathname === "/admin/schedule"
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:text-primary"
              }`}
            >
              <Clock className="h-4 w-4" />
              Schedule
            </Link>
            <Link
              href="/admin/customers"
              className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all ${
                pathname === "/admin/customers"
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:text-primary"
              }`}
            >
              <Users className="h-4 w-4" />
              Customers
            </Link>
            <Link
              href="/admin/analytics"
              className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all ${
                pathname === "/admin/analytics"
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:text-primary"
              }`}
            >
              <BarChart3 className="h-4 w-4" />
              Analytics
            </Link>
            <Link
              href="/admin/settings"
              className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all ${
                pathname === "/admin/settings"
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:text-primary"
              }`}
            >
              <Settings className="h-4 w-4" />
              Settings
            </Link>
          </nav>
        </div>
        <div className="mt-auto p-4">
          <Button
            variant="outline"
            className="w-full justify-start gap-2"
            onClick={handleLogout}
          >
            <LogOut className="h-4 w-4" />
            Logout
          </Button>
        </div>
      </div>
    </div>
  );
}
