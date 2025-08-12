import React from 'react';
import { Seo } from "@/components/Seo";
// import Header from "@/components/Header"; // Header is now in MainLayout

const ProfileScreen = () => {
  return (
    <>
      <Seo
        title="Meus Dados | DriverHub"
        description="Página para visualização e edição dos dados do motorista."
        canonical={window.location.origin + "/profile"}
      />
      {/* MainLayout will handle Header and overall layout */}
      <div className="space-y-8 p-8 bg-background"> {/* Removed min-h-screen flex flex-col and added p-8 bg-background */}
        {/* Removed Header */}
        <div className="flex items-baseline gap-2">
          <h1 className="text-3xl font-bold text-foreground">Meus Dados</h1>
          <p className="text-muted-foreground text-sm">
            Visualize e edite suas informações.
          </p>
        </div>
        {/* Add content here in the future */}
      </div>
    </>
  );
};

export default ProfileScreen;
