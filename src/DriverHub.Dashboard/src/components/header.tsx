import { User, ChevronDown, LogOut, Settings as SettingsIcon } from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { SidebarTrigger, useSidebar } from "@/components/ui/sidebar"
import { useAuth } from "../context/AuthContext";
import { useNavigate, NavLink } from "react-router-dom";
import { useIsMobile } from "@/hooks/use-mobile";

interface HeaderProps {
  userName?: string
}

export function Header({ userName = "Administrador" }: HeaderProps) {
  const { logout, user } = useAuth();
  const navigate = useNavigate();
  const { isMobile, openMobile } = useSidebar();
  const isMobileDevice = useIsMobile();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <header className="h-16 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
      <div className="flex h-full items-center justify-between px-6">
        <div className="flex items-center gap-4">
          <SidebarTrigger className="h-8 w-8" />
          {isMobileDevice && !openMobile && (
            <span className="font-semibold text-foreground text-lg">DriverHub</span>
          )}
          {!isMobileDevice && (
            <div className="hidden md:block">
              <h2 className="text-lg font-semibold text-foreground">
                Sistema Gestão de Ganhos
              </h2>
            </div>
          )}
        </div>

        <div className="flex items-center gap-4">
          <ThemeToggle />
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="flex items-center gap-2 h-10">
                <div className="w-8 h-8 bg-gradient-primary rounded-full flex items-center justify-center">
                  <User className="w-4 h-4 text-primary-foreground" />
                </div>
                <span className="hidden md:inline text-sm font-medium">{user?.name || userName}</span>
                <ChevronDown className="w-4 h-4 text-muted-foreground" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56 bg-card border-border shadow-elevation-md">
              <DropdownMenuLabel>{user?.email || "Minha Conta"}</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <NavLink to="/settings/profile" className="flex items-center">
                  <User className="mr-2 h-4 w-4" />
                  Perfil: {user?.name} {user?.lastName}
                </NavLink>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-destructive" onClick={handleLogout}>
                <LogOut className="mr-2 h-4 w-4" />
                Sair
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  )
}