import React from 'react';
import { Seo } from "@/components/Seo";
import Header from "@/components/Header"; // Importar o componente Header

const HomeScreen = () => {
  return (
    <>
      <Seo
        title="Home | DriverHub"
        description="Tela inicial do DriverHub após o login."
        canonical={window.location.origin + "/home"}
      />
      <div className="min-h-screen flex flex-col"> {/* Container principal para ocupar a tela toda */}
        <Header /> {/* Incluir o componente Header */}
        <main className="flex flex-col items-center justify-center flex-grow bg-background"> {/* Ocupa o restante do espaço */}
          <h1 className="text-4xl font-bold">Bem-vindo à HomeScreen!</h1>
        </main>
      </div>
    </>
  );
};

export default HomeScreen;