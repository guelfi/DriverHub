import React from 'react';
import { Seo } from "@/components/Seo";
import HomeScreenCards from "@/components/HomeScreenCards";

const HomeScreen = () => {
  return (
    <>
      <Seo
        title="Home | DriverHub"
        description="Tela inicial do DriverHub após o login."
        canonical={window.location.origin + "/home"}
      />
      {/* MainLayout will handle Header and overall layout */}
      <div className="flex flex-col items-center flex-grow pt-[70px]"> {/* Changed pt-[50px] to pt-[70px] */}
        {/* Removed Header */}
        {/* Removed "Início bem-vindo de volta, motorista" text */}
        <HomeScreenCards />
      </div>
    </>
  );
};

export default HomeScreen;