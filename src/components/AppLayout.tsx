"use client";

/*
 * Wraps authenticated portal pages and guards them behind a valid BOCRA user session.
 */
import { AppSidebar } from "./AppSidebar";
import { TopNav } from "./TopNav";
import { AIChatBubble } from "./AIChatBubble";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "@/components/AuthProvider";

export function AppLayout({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (loading) return;
    if (!user) {
      navigate("/login", { replace: true });
      return;
    }
    if (!user.user.profileCompleted && location.pathname !== "/portal/onboarding") {
      navigate("/portal/onboarding", { replace: true });
    }
  }, [loading, location.pathname, navigate, user]);

  if (loading || !user) {
    return <div className="min-h-screen bg-background flex items-center justify-center text-sm text-muted-foreground">Loading workspace...</div>;
  }

  return (
    <div className="flex min-h-screen w-full bg-background">
      <AppSidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <TopNav />
        <main className="flex-1 p-4 md:p-6 lg:p-8">
          {children}
        </main>
      </div>
      <AIChatBubble />
    </div>
  );
}
