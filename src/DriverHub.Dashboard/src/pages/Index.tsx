import { Header } from "@/components/header"
import { AppSidebar } from "@/components/app-sidebar"
import { SidebarProvider } from "@/components/ui/sidebar"
import { ThemeProvider } from "@/providers/theme-provider"
import { Outlet } from "react-router-dom"

const Index = () => {
  return (
    <ThemeProvider>
      <SidebarProvider>
        <div className="min-h-screen flex w-full bg-gradient-background">
          <AppSidebar />
          <div className="flex-1 flex flex-col">
            <Header userName="Admin" /> {/* userName pode ser obtido do AuthContext se necessário */}
            <main className="flex-1 p-6">
              <Outlet /> {/* Renderiza as rotas filhas aqui */}
            </main>
          </div>
        </div>
      </SidebarProvider>
    </ThemeProvider>
  );
};

export default Index;