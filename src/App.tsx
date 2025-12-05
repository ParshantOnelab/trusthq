
import React from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import Landing from "@/pages/Landing";
import NotFound from "@/pages/NotFound";

// Create a new QueryClient instance
const queryClient = new QueryClient();

const App: React.FC = () => {
  return (
    <React.StrictMode>
      {/* <QueryClientProvider client={queryClient}> */}
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <AuthProvider>
              <Routes>
                <Route path="/" element={<Landing />} />
                {/* <Route path="/auth" element={<Auth />} /> */}
                
                {/* Protected Routes */}
                {/* <Route element={<MainLayout />}>
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/lookup" element={<CompanyLookup />} />
                  <Route path="/company/:id" element={<CompanyProfile />} />
                  <Route path="/apis" element={<ApiPage />} />
                  <Route path="/alerts" element={<AlertsPage />} />
                </Route> */}
                
                {/* 404 Route */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </AuthProvider>
          </BrowserRouter>
        </TooltipProvider>
      {/* </QueryClientProvider> */}
    </React.StrictMode>
  );
};

export default App;
