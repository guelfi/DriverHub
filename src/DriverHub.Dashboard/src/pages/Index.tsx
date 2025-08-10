import { Header } from "@/components/header"
import { AppSidebar } from "@/components/app-sidebar"
import { SidebarProvider } from "@/components/ui/sidebar"
import { Outlet } from "react-router-dom"

const Index = () => {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-gradient-background">
        <AppSidebar />
        <div className="flex-1 flex flex-col">
          <Header userName="Admin" /> {/* userName pode ser obtido do AuthContext se necessário */}
          <main className="flex-1 px-3 py-6">
            <Outlet /> {/* Renderiza as rotas filhas aqui */}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default Index;