import { Outlet } from "react-router-dom";
import { PublicNav } from "./PublicNav";
import { AIChatBubble } from "./AIChatBubble";

export function PublicLayout() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <PublicNav />
      <main className="flex-1">
        <Outlet />
      </main>
      {/* Footer */}
      <footer className="border-t border-border bg-card">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-9 h-9 rounded-xl bg-primary flex items-center justify-center">
                  <span className="text-primary-foreground font-bold text-sm">B</span>
                </div>
                <span className="font-bold text-foreground">BOCRA</span>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Botswana Communications Regulatory Authority. Regulating for a connected Botswana.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-foreground text-sm mb-3">Services</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>Licensing</li>
                <li>Spectrum Management</li>
                <li>Domain Registration</li>
                <li>Quality of Service</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-foreground text-sm mb-3">Resources</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>News & Announcements</li>
                <li>Open Tenders</li>
                <li>Publications</li>
                <li>FAQs</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-foreground text-sm mb-3">Contact</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>Plot 206/207 Independence Ave</li>
                <li>Gaborone, Botswana</li>
                <li>+267 395 7755</li>
                <li>info@bocra.org.bw</li>
              </ul>
            </div>
          </div>
          <div className="mt-8 pt-6 border-t border-border text-center text-xs text-muted-foreground">
            © {new Date().getFullYear()} BOCRA. All rights reserved.
          </div>
        </div>
      </footer>
      <AIChatBubble />
    </div>
  );
}
