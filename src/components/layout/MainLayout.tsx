
import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import Navbar from './Navbar';
import { Loader2 } from 'lucide-react';

const MainLayout: React.FC = () => {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-trustiq-blue" />
      </div>
    );
  }

  // Redirect to login if not authenticated
  if (!user) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      <main className="flex-1 container max-w-7xl py-8 px-4 sm:px-6">
        <Outlet />
      </main>
      <footer className="bg-trustiq-blue-900 text-white py-6">
        <div className="container max-w-7xl mx-auto px-4 sm:px-6 text-sm flex flex-wrap gap-4 justify-between items-center">
          <div className="text-trustiq-neutral-300">
            © 2025 TrustHQ Technologies
          </div>
          <div className="flex gap-6">
            <a href="#" className="text-trustiq-neutral-300 hover:text-white transition-colors">About</a>
            <a href="#" className="text-trustiq-neutral-300 hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="text-trustiq-neutral-300 hover:text-white transition-colors">Terms</a>
            <a href="#" className="text-trustiq-neutral-300 hover:text-white transition-colors">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default MainLayout;
