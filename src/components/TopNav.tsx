"use client";

/*
 * Renders the shared top navigation with session-aware profile details and logout handling.
 */
import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Bell, Building2, LayoutDashboard, LogOut, Menu, Search, Settings2, Shield, UserCircle2, UsersRound, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/components/AuthProvider";

export function TopNav() {
  const [searchOpen, setSearchOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, signOut } = useAuth();

  const navItems = user?.user.role === "ADMIN" || user?.user.role === "SUPER_ADMIN"
    ? [
        { title: "Overview", path: "/admin", icon: LayoutDashboard },
        { title: "Users", path: "/admin/users", icon: Shield },
      ]
    : [
        { title: "Dashboard", path: "/portal", icon: LayoutDashboard },
        ...(user?.user.userType === "ORGANIZATION"
          ? [
              { title: "Organization", path: "/portal/organization", icon: Building2 },
              { title: "Contacts", path: "/portal/organization/contacts", icon: UsersRound },
            ]
          : [{ title: "My Profile", path: "/portal/profile", icon: UserCircle2 }]),
        { title: "Settings", path: user?.user.userType === "ORGANIZATION" ? "/portal/organization" : "/portal/profile", icon: Settings2 },
      ];

  return (
    <>
      <header className="h-16 bg-card/80 backdrop-blur-xl border-b border-border flex items-center px-4 md:px-6 gap-4 sticky top-0 z-40">
        <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="md:hidden p-2 rounded-xl text-muted-foreground hover:bg-muted">
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>

        <div className="md:hidden flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center"><span className="text-primary-foreground font-bold text-xs">B</span></div>
          <span className="font-bold text-foreground">BOCRA</span>
        </div>

        <div className="flex-1 max-w-xl mx-auto hidden md:block">
          <div className="neu-inset flex items-center px-4 py-2.5 gap-3"><Search className="w-4 h-4 text-muted-foreground" /><input type="text" placeholder="Search services, profiles, contacts..." className="bg-transparent text-sm flex-1 outline-none text-foreground placeholder:text-muted-foreground" /></div>
        </div>

        <div className="flex items-center gap-2 ml-auto">
          <button onClick={() => setSearchOpen(!searchOpen)} className="md:hidden p-2 rounded-xl text-muted-foreground hover:bg-muted"><Search className="w-5 h-5" /></button>
          <button className="relative p-2 rounded-xl text-muted-foreground hover:bg-muted transition-colors"><Bell className="w-5 h-5" /><span className="absolute top-1.5 right-1.5 w-2 h-2 bg-accent rounded-full" /></button>
          <div className="hidden sm:flex items-center gap-3 pl-2 ml-2 border-l border-border">
            <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center">
              {user?.user.userType === "ORGANIZATION" ? <Building2 className="w-4 h-4 text-primary" /> : <UserCircle2 className="w-4 h-4 text-primary" />}
            </div>
            <div className="hidden lg:block">
              <div className="text-sm font-medium text-foreground">{displayName(user)}</div>
              <div className="text-xs text-muted-foreground">{user?.user.username}</div>
            </div>
          </div>
          <button onClick={() => { signOut(); navigate("/"); }} className="p-2 rounded-xl text-muted-foreground hover:bg-destructive/10 hover:text-destructive transition-colors" title="Sign out">
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </header>

      {searchOpen && (
        <div className="md:hidden px-4 py-3 bg-card border-b border-border">
          <div className="neu-inset flex items-center px-4 py-2.5 gap-3"><Search className="w-4 h-4 text-muted-foreground" /><input type="text" placeholder="Search..." className="bg-transparent text-sm flex-1 outline-none text-foreground placeholder:text-muted-foreground" autoFocus /></div>
        </div>
      )}

      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-0 z-50 flex">
          <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" onClick={() => setMobileMenuOpen(false)} />
          <div className="relative w-72 bg-card h-full shadow-2xl p-4 space-y-1">
            <div className="flex items-center gap-3 mb-6 px-3">
              <div className="w-9 h-9 rounded-xl bg-primary flex items-center justify-center"><span className="text-primary-foreground font-bold text-sm">B</span></div>
              <span className="font-bold text-foreground text-lg">BOCRA</span>
            </div>
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Link key={item.path} to={item.path} onClick={() => setMobileMenuOpen(false)} className={cn("flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors", isActive ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-muted hover:text-foreground")}>
                  <item.icon className="w-5 h-5" />
                  <span>{item.title}</span>
                </Link>
              );
            })}
            <div className="pt-4 mt-4 border-t border-border">
              <button onClick={() => { setMobileMenuOpen(false); signOut(); navigate("/"); }} className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-destructive hover:bg-destructive/10 transition-colors">
                <LogOut className="w-5 h-5" /> Sign Out
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

function displayName(user: ReturnType<typeof useAuth>["user"]) {
  if (!user) return "BOCRA User";
  if (user.user.userType === "ORGANIZATION") return user.organization?.displayName ?? user.user.username;
  return user.person ? `${user.person.forenames} ${user.person.surname}` : user.user.username;
}
