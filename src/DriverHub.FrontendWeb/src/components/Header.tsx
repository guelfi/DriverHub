import React from 'react';
import { Car } from 'lucide-react'; // Ícone de carro
import { Link } from 'react-router-dom'; // Para o link do logo

const Header = () => {
  return (
    <header className="flex items-center justify-center p-4 bg-background border-b border-border">
      <Link to="/" className="flex items-center space-x-2">
        <Car className="h-6 w-6 text-primary" />
        <span className="text-xl font-semibold text-foreground">DriverHub</span>
      </Link>
    </header>
  );
};

export default Header;