import React from 'react';
import { Seo } from "@/components/Seo";
// import Header from "@/components/Header"; // Header is now in MainLayout
import { ThemeToggle } from '@/components/ThemeToggle'; // Import ThemeToggle

const SettingsScreen = () => {
  return (
    <>
      <Seo
        title="Configurações | DriverHub"
        description="Página de configurações do aplicativo."
        canonical={window.location.origin + "/settings"}
      />
      {/* MainLayout will handle Header and overall layout */}
      <div className="space-y-8 p-8 bg-background"> {/* Removed min-h-screen flex flex-col and added p-8 bg-background */}
        {/* Removed Header */}
        <div>
          <h1 className="text-3xl font-bold text-foreground">Configurações</h1>
          <p className="text-muted-foreground text-sm mt-2">
            Ajuste as preferências do aplicativo.
          </p>
        </div>
        <div className="flex items-center justify-between p-4 border rounded-lg">
          <span className="text-lg font-medium">Tema</span>
          <ThemeToggle />
        </div>
      </div>
    </>
  );
};

export default SettingsScreen;
