import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Search, Bell, Menu, X, LayoutDashboard, FileText, Radio, Globe, BarChart3, AlertTriangle, Briefcase, FolderOpen } from "lucide-react";

const navItems = [
  { title: "Dashboard", path: "/portal", icon: LayoutDashboard },
  { title: "Licensing", path: "/portal/licensing", icon: FileText },
  { title: "Spectrum", path: "/portal/spectrum", icon: Radio },
  { title: "Domains", path: "/portal/domains", icon: Globe },
  { title: "QoS", path: "/portal/qos", icon: BarChart3 },
  { title: "Complaints", path: "/portal/complaints", icon: AlertTriangle },
  { title: "Tenders", path: "/portal/tenders", icon: Briefcase },
  { title: "Documents", path: "/portal/documents", icon: FolderOpen },
];

export function TopNav() {
  const [searchOpen, setSearchOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  return (
    <>
      <header className="h-16 bg-card border-b border-border flex items-center px-4 md:px-6 gap-4 sticky top-0 z-40">
        {/* Mobile menu */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 rounded-xl text-muted-foreground hover:bg-muted"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>

        {/* Mobile logo */}
        <div className="md:hidden flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
            <span className="text-primary-foreground font-bold text-xs">B</span>
          </div>
          <span className="font-bold text-foreground">BOCRA</span>
        </div>

        {/* Search */}
        <div className="flex-1 max-w-xl mx-auto hidden md:block">
          <div className="neu-inset flex items-center px-4 py-2.5 gap-3">
            <Search className="w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search services, documents, licenses..."
              className="bg-transparent text-sm flex-1 outline-none text-foreground placeholder:text-muted-foreground"
            />
          </div>
        </div>

        {/* Right side */}
        <div className="flex items-center gap-2 ml-auto">
          <button
            onClick={() => setSearchOpen(!searchOpen)}
            className="md:hidden p-2 rounded-xl text-muted-foreground hover:bg-muted"
          >
            <Search className="w-5 h-5" />
          </button>
          <button className="relative p-2 rounded-xl text-muted-foreground hover:bg-muted transition-colors">
            <Bell className="w-5 h-5" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-accent rounded-full" />
          </button>
          <div className="w-9 h-9 rounded-xl bg-secondary flex items-center justify-center">
            <span className="text-secondary-foreground font-semibold text-sm">MK</span>
          </div>
        </div>
      </header>

      {/* Mobile search */}
      {searchOpen && (
        <div className="md:hidden px-4 py-3 bg-card border-b border-border">
          <div className="neu-inset flex items-center px-4 py-2.5 gap-3">
            <Search className="w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search..."
              className="bg-transparent text-sm flex-1 outline-none text-foreground placeholder:text-muted-foreground"
              autoFocus
            />
          </div>
        </div>
      )}

      {/* Mobile nav drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-0 z-50 flex">
          <div className="absolute inset-0 bg-foreground/20 backdrop-blur-sm" onClick={() => setMobileMenuOpen(false)} />
          <div className="relative w-72 bg-card h-full shadow-2xl p-4 space-y-1 animate-slide-in-left">
            <div className="flex items-center gap-3 mb-6 px-3">
              <div className="w-9 h-9 rounded-xl bg-primary flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-sm">B</span>
              </div>
              <span className="font-bold text-foreground text-lg">BOCRA</span>
            </div>
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                    isActive
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  }`}
                >
                  <item.icon className="w-5 h-5" />
                  <span>{item.title}</span>
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </>
  );
}
