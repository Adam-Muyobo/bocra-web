import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";

// Layouts
import { PublicLayout } from "@/components/PublicLayout";
import { AppLayout } from "@/components/AppLayout";
import { AdminLayout } from "@/components/AdminLayout";

// Public pages
import Landing from "@/pages/Landing";
import About from "@/pages/About";
import News from "@/pages/News";
import PublicTenders from "@/pages/PublicTenders";
import Login from "@/pages/Login";
import Register from "@/pages/Register";

// User portal pages
import Dashboard from "@/pages/Dashboard";
import Licensing from "@/pages/Licensing";
import Spectrum from "@/pages/Spectrum";
import Domains from "@/pages/Domains";
import QoS from "@/pages/QoS";
import Complaints from "@/pages/Complaints";
import Tenders from "@/pages/Tenders";
import Documents from "@/pages/Documents";

// Admin pages
import AdminDashboard from "@/pages/admin/AdminDashboard";
import AdminLicenses from "@/pages/admin/AdminLicenses";
import AdminTenders from "@/pages/admin/AdminTenders";
import AdminComplaints from "@/pages/admin/AdminComplaints";
import AdminUsers from "@/pages/admin/AdminUsers";

import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* Public pages */}
          <Route element={<PublicLayout />}>
            <Route path="/" element={<Landing />} />
            <Route path="/about" element={<About />} />
            <Route path="/news" element={<News />} />
            <Route path="/tenders" element={<PublicTenders />} />
          </Route>

          {/* Auth pages */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Authenticated user portal */}
          <Route path="/portal" element={<AppLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="licensing" element={<Licensing />} />
            <Route path="spectrum" element={<Spectrum />} />
            <Route path="domains" element={<Domains />} />
            <Route path="qos" element={<QoS />} />
            <Route path="complaints" element={<Complaints />} />
            <Route path="tenders" element={<Tenders />} />
            <Route path="documents" element={<Documents />} />
          </Route>

          {/* Admin portal */}
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<AdminDashboard />} />
            <Route path="licenses" element={<AdminLicenses />} />
            <Route path="tenders" element={<AdminTenders />} />
            <Route path="complaints" element={<AdminComplaints />} />
            <Route path="users" element={<AdminUsers />} />
          </Route>

          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
