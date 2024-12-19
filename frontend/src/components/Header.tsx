import { History, LogOut, MapPin, Menu } from 'lucide-react';
import { Button } from './ui/button';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const Header = () => {
  const location = useLocation();
  const { user, signInWithGoogle, signOutUser } = useAuth();
  const isActive = (path: string) => {
    return location.pathname === path ? "text-primary" : "text-foreground";
  };

  return (
    <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-2">
          <MapPin className="h-6 w-6 text-primary" />
          <span className="text-xl font-bold">GrabWise</span>
        </Link>

        <nav className="hidden md:flex items-center space-x-6">
        <Link to="/predict" className={`text-sm font-medium hover:text-primary transition-colors ${isActive('/predict')}`}>
            Predict
          </Link>
          <Link to="/how-it-works" className={`text-sm font-medium hover:text-primary transition-colors ${isActive('/how-it-works')}`}>
            How it works
          </Link>
          <Link to="/safety" className={`text-sm font-medium hover:text-primary transition-colors ${isActive('/safety')}`}>
            Safety
          </Link>
          <Link to="/help" className={`text-sm font-medium hover:text-primary transition-colors ${isActive('/help')}`}>
            Help
          </Link>
          <Link to="/about" className={`text-sm font-medium hover:text-primary transition-colors ${isActive('/about')}`}>
            About Us
          </Link>
          <Link to="/analytics" className={`text-sm font-medium hover:text-primary transition-colors ${isActive('/analytics')}`}>
            Analytics
          </Link>
          
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-9 w-9 rounded-full">
                  <Avatar className="h-9 w-9">
                    <AvatarImage src={user.photoURL || undefined} alt={user.displayName || 'User'} />
                    <AvatarFallback>{user.displayName?.charAt(0) || 'U'}</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem className="font-medium">
                  {user.displayName}
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/booking-history" className="flex items-center">
                    <History className="mr-2 h-4 w-4" />
                    Booking History
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={signOutUser}>
                  <LogOut className="mr-2 h-4 w-4" />
                  Sign Out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button 
              variant="default" 
              size="sm"
              onClick={signInWithGoogle}
              className="flex items-center gap-2"
            >
              <img src="https://www.google.com/favicon.ico" alt="Google" className="w-4 h-4" />
              Sign In with Google
            </Button>
          )}
        </nav>

        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="h-5 w-5" />
        </Button>
      </div>
    </header>
  );
};

export default Header;