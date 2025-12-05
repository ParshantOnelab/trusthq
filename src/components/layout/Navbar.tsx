
import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Search, User, LogOut, Bell } from 'lucide-react';

const Navbar: React.FC = () => {
  const { user, logout } = useAuth();

  return (
    <nav className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-6 py-3">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <Link to="/" className="flex items-center space-x-2">
              <span className="text-2xl font-bold text-trustiq-blue">
                Trust<span className="text-trustiq-teal">HQ</span>
              </span>
            </Link>
            <div className="hidden md:flex space-x-4">
              <Link 
                to="/dashboard" 
                className="text-trustiq-neutral-600 hover:text-trustiq-blue transition-colors px-3 py-2 rounded-md text-sm font-medium"
              >
                Dashboard
              </Link>
              <Link 
                to="/lookup" 
                className="text-trustiq-neutral-600 hover:text-trustiq-blue transition-colors px-3 py-2 rounded-md text-sm font-medium"
              >
                Company Lookup
              </Link>
              <Link 
                to="/apis" 
                className="text-trustiq-neutral-600 hover:text-trustiq-blue transition-colors px-3 py-2 rounded-md text-sm font-medium"
              >
                APIs
              </Link>
              <Link 
                to="/alerts" 
                className="text-trustiq-neutral-600 hover:text-trustiq-blue transition-colors px-3 py-2 rounded-md text-sm font-medium"
              >
                Alerts
              </Link>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <Link to="/lookup">
              <Button variant="outline" size="icon">
                <Search className="h-4 w-4" />
              </Button>
            </Link>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="relative">
                  <User className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <DropdownMenuItem disabled>
                    <User className="mr-2 h-4 w-4" />
                    <span>{user?.name || 'User'}</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem disabled>
                    <span className="text-sm text-muted-foreground">{user?.email}</span>
                  </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={logout}>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
