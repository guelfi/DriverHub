import { useState } from "react"
import Login from "./Login"
import Dashboard from "./Dashboard"
import Drivers from "./Drivers"
import Vehicles from "./Vehicles"
import Reports from "./Reports"
import Settings from "./Settings"
import { Header } from "@/components/header"
import { AppSidebar } from "@/components/app-sidebar"
import { SidebarProvider } from "@/components/ui/sidebar"
import { ThemeProvider } from "@/providers/theme-provider"
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"

const Index = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [userName, setUserName] = useState("")

  const handleLogin = (email: string, password: string) => {
    // Simulação de login
    setIsAuthenticated(true)
    setUserName("Administrador")
  }

  if (!isAuthenticated) {
    return (
      <ThemeProvider>
        <Login onLogin={handleLogin} />
      </ThemeProvider>
    )
  }

  return (
    <ThemeProvider>
      <BrowserRouter>
        <SidebarProvider>
          <div className="min-h-screen flex w-full bg-gradient-background">
            <AppSidebar />
            <div className="flex-1 flex flex-col">
              <Header userName={userName} />
              <main className="flex-1 p-6">
                <Routes>
                  <Route path="/" element={<Navigate to="/dashboard" replace />} />
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/drivers" element={<Drivers />} />
                  <Route path="/vehicles" element={<Vehicles />} />
                  <Route path="/reports" element={<Reports />} />
                  <Route path="/settings" element={<Settings />} />
                </Routes>
              </main>
            </div>
          </div>
        </SidebarProvider>
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default Index;
