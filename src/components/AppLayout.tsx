import { AppSidebar } from "./AppSidebar";
import { TopNav } from "./TopNav";
import { AIChatBubble } from "./AIChatBubble";

export function AppLayout({ children }: { children: React.ReactNode }) {
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
