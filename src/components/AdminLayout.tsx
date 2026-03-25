"use client";

/*
 * Wraps admin pages and keeps non-admin sessions out of the BOCRA admin workspace.
 */
import { AdminSidebar } from "./AdminSidebar";
import { TopNav } from "./TopNav";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/components/AuthProvider";

export function AdminLayout({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (loading) return;
    if (!user) {
      navigate("/login", { replace: true });
      return;
    }
    if (!["ADMIN", "SUPER_ADMIN"].includes(user.user.role)) {
      navigate("/portal", { replace: true });
    }
  }, [loading, navigate, user]);

  if (loading || !user) {
    return <div className="min-h-screen bg-background flex items-center justify-center text-sm text-muted-foreground">Loading admin workspace...</div>;
  }

  return (
    <div className="flex min-h-screen w-full bg-background">
      <AdminSidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <TopNav />
        <main className="flex-1 p-4 md:p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
