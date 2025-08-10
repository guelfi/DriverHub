import { useState } from "react"
import { 
  LayoutDashboard, 
  Users, 
  Car, 
  Settings, 
  BarChart3, 
  FileText, 
  Bell,
  LogOut 
} from "lucide-react"
import { NavLink, useLocation } from "react-router-dom"
import { useAuth } from "../context/AuthContext";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"

const items = [
  { title: "Dashboard", url: "/dashboard", icon: LayoutDashboard },
  { title: "Motoristas", url: "/drivers", icon: Users },
  { title: "Veículos", url: "/vehicles", icon: Car },
  { title: "Relatórios", url: "/reports", icon: BarChart3 },
  { title: "Notificações", url: "/notifications", icon: Bell },
]

export function AppSidebar() {
  const { state } = useSidebar()
  const location = useLocation()
  const currentPath = location.pathname
  const collapsed = state === "collapsed"
  const { logout } = useAuth(); // Movido para o nível superior do componente

  const isActive = (path: string) => currentPath === path
  const isExpanded = items.some((i) => isActive(i.url))
  
  const getNavCls = ({ isActive }: { isActive: boolean }) =>
    isActive 
      ? "bg-sidebar-accent text-sidebar-primary font-medium shadow-elevation-sm" 
      : "hover:bg-sidebar-accent/50 text-sidebar-foreground"

    const handleLogout = () => {
    console.log("Botão Sair do Sidebar clicado!");
    logout(); // Agora chama a função logout diretamente
    window.location.href = "/login"; // Redireciona para a página de login após o logout
  }

  return (
    <Sidebar
      className={`${collapsed ? "w-[90px]" : "w-60"} bg-sidebar border-sidebar-border shadow-elevation-md transition-all duration-300`}
      collapsible="icon"
    >
      <SidebarContent className="p-4">
        {/* Logo/Header */}
        <div className="mb-8 flex items-center gap-3">
          <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center shadow-glow">
            <Car className="w-5 h-5 text-primary-foreground" />
          </div>
          {!collapsed && (
            <span className="font-semibold text-sidebar-foreground text-lg">DriverHub</span>
          )}
        </div>

        <SidebarGroup>
          {/* Removido o "Menu Principal" conforme solicitado */}

          <SidebarGroupContent>
            <SidebarMenu className="space-y-2">
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink 
                      to={item.url} 
                      end 
                      className={({ isActive }) => 
                        `flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 ${getNavCls({ isActive })} ${collapsed ? 'ml-[-3px]' : ''}`
                      }
                    >
                      <item.icon className="h-5 w-5 flex-shrink-0" />
                      {!collapsed && <span className="font-medium">{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Settings and Logout */}
        <div className="mt-auto pt-4 border-t border-sidebar-border">
          <SidebarMenu className="space-y-2">
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <NavLink 
                  to="/settings" 
                  className={({ isActive }) => 
                    `flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 ${getNavCls({ isActive })}`
                  }
                >
                  <Settings className="h-5 w-5 flex-shrink-0" />
                  {!collapsed && <span className="font-medium">Configurações</span>}
                </NavLink>
              </SidebarMenuButton>
            </SidebarMenuItem>
            
            <SidebarMenuItem>
              <Button
                variant="ghost"
                onClick={handleLogout}
                className="w-full justify-start gap-3 px-3 py-2.5 h-auto text-sidebar-foreground hover:bg-destructive/10 hover:text-destructive transition-all duration-200"
              >
                <LogOut className="h-5 w-5 flex-shrink-0" />
                {!collapsed && <span className="font-medium">Sair</span>}
              </Button>
            </SidebarMenuItem>
          </SidebarMenu>
        </div>
      </SidebarContent>
    </Sidebar>
  )
}