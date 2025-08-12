import React from 'react';
import { Seo } from "@/components/Seo";
// import Header from "@/components/Header"; // Header is now in MainLayout

interface PlaceholderScreenProps {
  title: string;
  message: string;
  path: string;
}

const PlaceholderScreen: React.FC<PlaceholderScreenProps> = ({ title, message, path }) => {
  return (
    <>
      <Seo
        title={title}
        description={message}
        canonical={window.location.origin + path}
      />
      {/* MainLayout will handle Header and overall layout */}
      <div className="flex-grow flex items-center justify-center p-8 bg-background"> {/* Removed min-h-screen flex flex-col and Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-foreground">{title}</h1>
          <p className="text-lg text-muted-foreground">{message}</p>
          <p className="text-sm text-muted-foreground">
            Esta funcionalidade será implementada em breve.
          </p>
        </div>
      </div>
    </>
  );
};

export default PlaceholderScreen;
