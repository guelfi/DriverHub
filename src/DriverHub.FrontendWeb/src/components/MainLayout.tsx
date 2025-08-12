import React from 'react';
// Removed Link, useNavigate, useLocation, Home, User imports
// Removed DropdownMenu imports
import Header from './Header'; // Import the Header component

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  // Removed navigate, location, handleLogout, showAuthIcons

  return (
    <div className="min-h-screen flex flex-col">
      <Header /> {/* Render the main Header */}

      {/* Removed conditional rendering of Home and User icons */}

      <main className="flex-grow">
        {children} {/* Render the actual page content */}
      </main>
    </div>
  );
};

export default MainLayout;
