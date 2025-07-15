import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Sun, Moon, Menu, User, Car, FileText, DollarSign } from "lucide-react";
import { motion } from "framer-motion";
import { useAuth } from "@/context/AuthContext";
import { Link, Outlet } from "react-router-dom";

const DashboardLayout = () => {
  const { user, logout } = useAuth();
  const [darkMode, setDarkMode] = useState(false);
  const [menuOpen, setMenuOpen] = useState(true);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  const toggleTheme = () => setDarkMode(!darkMode);
  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <div className={darkMode ? "dark" : ""}>
      <div className="min-h-screen flex bg-gray-50 dark:bg-gray-950">
        {/* Menu lateral */}
        <motion.div
          animate={{ width: menuOpen ? 220 : 60 }}
          className="bg-white dark:bg-gray-800 shadow-md h-screen p-4 flex flex-col transition-all duration-300"
        >
          <Button variant="ghost" onClick={toggleMenu} className="mb-6">
            <Menu />
          </Button>
          <nav className="space-y-2 flex-1">
            <Link to="/dashboard">
              <Button variant="ghost" className="justify-start w-full">
                <Car className="mr-2" /> {menuOpen && "Dashboard"}
              </Button>
            </Link>
            <Link to="/motoristas">
              <Button variant="ghost" className="justify-start w-full">
                <User className="mr-2" /> {menuOpen && "Motoristas"}
              </Button>
            </Link>
            <Link to="/relatorios">
              <Button variant="ghost" className="justify-start w-full">
                <FileText className="mr-2" /> {menuOpen && "Relatórios"}
              </Button>
            </Link>
          </nav>
          <div className="mt-auto">
            <Button variant="ghost" onClick={logout} className="justify-start w-full">
              <User className="mr-2" /> {menuOpen && "Sair"}
            </Button>
          </div>
        </motion.div>

        {/* Conteúdo principal */}
        <div className="flex-1 p-6">
          {/* Header */}
          <div className="flex justify-between items-center mb-6">
            <div className="text-xl font-semibold text-gray-800 dark:text-gray-100">Dashboard</div>
            <div className="flex items-center gap-4">
              <Button variant="ghost" onClick={toggleTheme} aria-label="Alternar tema claro/escuro">
                {darkMode ? <Sun className="text-yellow-500" /> : <Moon className="text-blue-500" />}
              </Button>
              <div className="flex items-center gap-2">
                <User className="text-gray-600 dark:text-gray-300" />
                <span className="text-gray-700 dark:text-gray-200">{user?.nome || "Admin"}</span>
              </div>
            </div>
          </div>

          {/* Onde o conteúdo das rotas filhas será renderizado */}
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
