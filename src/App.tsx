
import React from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import Landing from "@/pages/Landing";
import NotFound from "@/pages/NotFound";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ScheduleMeeting from "@/pages/ScheduleMeeting";
import ScrollToTop from "@/components/ScrollToTop";
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
              <ScrollToTop />
          <Header />
              <Routes>
                <Route path="/" element={<Landing />} />
                <Route path="/schedule-meeting" element={<ScheduleMeeting />} />
                
                {/* 404 Route */}
                <Route path="*" element={<NotFound />} />
              </Routes>
          <Footer />
            </AuthProvider>
          </BrowserRouter>
        </TooltipProvider>
      {/* </QueryClientProvider> */}
    </React.StrictMode>
  );
};

export default App;
