import React, { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Sun, Moon, Menu, User, Car, FileText, DollarSign } from "lucide-react";
import { motion } from "framer-motion";
import { useAuth } from "@/context/AuthContext";
import { Link } from "react-router-dom";

export default function Dashboard() {
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

          {/* Cards de informações */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <Card className="rounded-2xl shadow p-4 bg-white dark:bg-gray-800">
              <CardContent>
                <h3 className="text-sm text-gray-500 dark:text-gray-400">Motoristas Cadastrados</h3>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">42</p>
              </CardContent>
            </Card>
            <Card className="rounded-2xl shadow p-4 bg-white dark:bg-gray-800">
              <CardContent>
                <h3 className="text-sm text-gray-500 dark:text-gray-400">Viagens Realizadas (Mês)</h3>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">150</p>
              </CardContent>
            </Card>
            <Card className="rounded-2xl shadow p-4 bg-white dark:bg-gray-800">
              <CardContent>
                <h3 className="text-sm text-gray-500 dark:text-gray-400">Receita Total (Mês)</h3>
                <p className="text-2xl font-bold text-gray-900 dark:text-white"><DollarSign className="inline-block h-5 w-5 mr-1" />5.200,00</p>
              </CardContent>
            </Card>
            <Card className="rounded-2xl shadow p-4 bg-white dark:bg-gray-800">
              <CardContent>
                <h3 className="text-sm text-gray-500 dark:text-gray-400">Despesas (Mês)</h3>
                <p className="text-2xl font-bold text-gray-900 dark:text-white"><DollarSign className="inline-block h-5 w-5 mr-1" />1.800,00</p>
              </CardContent>
            </Card>
            <Card className="rounded-2xl shadow p-4 bg-white dark:bg-gray-800">
              <CardContent>
                <h3 className="text-sm text-gray-500 dark:text-gray-400">Motoristas Ativos Hoje</h3>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">35</p>
              </CardContent>
            </Card>
            <Card className="rounded-2xl shadow p-4 bg-white dark:bg-gray-800">
              <CardContent>
                <h3 className="text-sm text-gray-500 dark:text-gray-400">Média KM/Litro</h3>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">12.5</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}