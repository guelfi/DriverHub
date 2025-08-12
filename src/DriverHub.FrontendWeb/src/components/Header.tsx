import React from 'react';
import { Car, User, Home } from 'lucide-react'; // Re-import User and Home icons
import { Link, useNavigate, useLocation } from 'react-router-dom'; // Re-import Link, useNavigate, useLocation
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    navigate('/');
  };

  // Conditional rendering: icons visible only if not on the login page
  const showAuthIcons = location.pathname !== '/';

  return (
    <header className="flex items-center justify-between p-4 bg-background border-b border-border w-full h-[50px]"> {/* Set height to 50px */}
      {/* Left-aligned Home icon - Conditionally rendered */}
      {showAuthIcons && (
        <Link to="/home" className="flex items-center justify-center w-10 h-10 rounded-full hover:bg-muted/80">
          <Home className="w-5 h-5 text-muted-foreground" />
        </Link>
      )}
      {!showAuthIcons && ( // Add an empty div for spacing when Home icon is not rendered
        <div className="w-10"></div>
      )}

      {/* Centered Logo and Title - Not clickable */}
      <div className="flex items-center space-x-2 absolute left-1/2 -translate-x-1/2">
        <Car className="h-6 w-6 text-primary" />
        <span className="text-xl font-semibold text-foreground">DriverHub</span>
      </div>

      {/* Right-aligned Dropdown Menu - Conditionally rendered */}
      {showAuthIcons && (
        <div className="flex items-center gap-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="flex items-center justify-center w-10 h-10 rounded-full bg-muted hover:bg-muted/80">
                <User className="w-5 h-5 text-muted-foreground" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>Minha Conta</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link to="/profile">Meus Dados</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/vehicles">Meu Veículo</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/settings">Configuração</Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleLogout}>
                Sair
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      )}
      {!showAuthIcons && ( // Add an empty div for spacing when Dropdown Menu is not rendered
        <div className="w-10"></div>
      )}
    </header>
  );
};

export default Header;