import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AppLayout } from "@/components/AppLayout";
import Dashboard from "@/pages/Dashboard";
import Licensing from "@/pages/Licensing";
import Spectrum from "@/pages/Spectrum";
import Domains from "@/pages/Domains";
import QoS from "@/pages/QoS";
import Complaints from "@/pages/Complaints";
import Tenders from "@/pages/Tenders";
import Documents from "@/pages/Documents";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route element={<AppLayout />}>
            <Route path="/" element={<Dashboard />} />
            <Route path="/licensing" element={<Licensing />} />
            <Route path="/spectrum" element={<Spectrum />} />
            <Route path="/domains" element={<Domains />} />
            <Route path="/qos" element={<QoS />} />
            <Route path="/complaints" element={<Complaints />} />
            <Route path="/tenders" element={<Tenders />} />
            <Route path="/documents" element={<Documents />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
