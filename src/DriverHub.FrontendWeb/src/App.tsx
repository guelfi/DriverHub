import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import HomeScreen from "./pages/HomeScreen";
import NewMotora from "./pages/NewMotora";
import ProfileScreen from "./pages/ProfileScreen";
import SettingsScreen from "./pages/SettingsScreen";
import PlaceholderScreen from "./pages/PlaceholderScreen";
import NotFound from "./pages/NotFound";
import ProtectedRoute from "./components/ProtectedRoute";
import MainLayout from "./components/MainLayout"; // Import MainLayout
import { ThemeProvider } from "@/components/ThemeProvider";

const queryClient = new QueryClient();

const App = () => (
  <ThemeProvider defaultTheme="light">
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Index />} />
            <Route path="/new-motora" element={<NewMotora />} />

            {/* Protected Routes wrapped by MainLayout */}
            <Route
              path="/home"
              element={
                <ProtectedRoute>
                  <MainLayout>
                    <HomeScreen />
                  </MainLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <MainLayout>
                    <ProfileScreen />
                  </MainLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/settings"
              element={
                <ProtectedRoute>
                  <MainLayout>
                    <SettingsScreen />
                  </MainLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/vehicles"
              element={
                <ProtectedRoute>
                  <MainLayout>
                    <PlaceholderScreen
                      title="Meu Veículo"
                      message="Gerencie seu veículo aqui."
                      path="/vehicles"
                    />
                  </MainLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/my-km"
              element={
                <ProtectedRoute>
                  <MainLayout>
                    <PlaceholderScreen
                      title="Meu KM"
                      message="Calcule seu KM ideal para a semana."
                      path="/my-km"
                    />
                  </MainLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/analysis"
              element={
                <ProtectedRoute>
                  <MainLayout>
                    <PlaceholderScreen
                      title="Análise de Resultado"
                      message="Analise seus resultados diários ou por período."
                      path="/analysis"
                    />
                  </MainLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/statistics"
              element={
                <ProtectedRoute>
                  <MainLayout>
                    <PlaceholderScreen
                      title="Estatísticas"
                      message="Veja suas estatísticas de desempenho."
                      path="/statistics"
                    />
                  </MainLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/logout"
              element={
                <ProtectedRoute>
                  <MainLayout>
                    <PlaceholderScreen
                      title="Sair"
                      message="Você foi desconectado."
                      path="/logout"
                    />
                  </MainLayout>
                </ProtectedRoute>
              }
            />

            {/* Catch-all Route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </ThemeProvider>
);

export default App;