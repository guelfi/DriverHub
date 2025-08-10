import { Users, Car, TrendingUp, Activity } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

interface DashboardCard {
  title: string
  value: string | number
  description: string
  icon: React.ElementType
  change?: string
  changeType?: "positive" | "negative" | "neutral"
}

export function DashboardCards() {
  const { token } = useAuth();
  const [motoristCount, setMotoristCount] = useState<number | string>("...");
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    console.log("DashboardCards: Token atual:", token ? "Presente" : "Ausente");
    const fetchMotoristCount = async () => {
      setIsLoading(true);
      setHasError(false);
      if (!token) {
        setMotoristCount("N/A");
        setIsLoading(false);
        return;
      }
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/Admin/motorist-count`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setMotoristCount(response.data.count);
      } catch (error) {
        console.error("Erro ao buscar contagem de motoristas:", error);
        setMotoristCount("Erro");
        setHasError(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMotoristCount();
  }, [token]);

  const dashboardData: DashboardCard[] = [
    {
      title: "Motoristas Cadastrados",
      value: isLoading ? "Carregando..." : (hasError ? "Erro" : motoristCount),
      description: "Total de motoristas ativos",
      icon: Users,
      change: "+12%",
      changeType: "positive"
    },
    {
      title: "Veículos Ativos",
      value: 128,
      description: "Veículos em operação",
      icon: Car,
      change: "+5%",
      changeType: "positive"
    },
    {
      title: "Viagens do Mês",
      value: "1.247",
      description: "Viagens realizadas este mês",
      icon: TrendingUp,
      change: "+18%",
      changeType: "positive"
    }
  ]

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {dashboardData.map((card, index) => (
        <Card 
          key={card.title} 
          className="bg-gradient-card border-border/50 shadow-elevation-md hover:shadow-elevation-lg transition-all duration-300 hover:-translate-y-1"
        >
          <CardHeader className="pb-2">
            <div className="flex justify-between items-center">
              <CardTitle className="text-xs font-medium text-muted-foreground text-left">
                {card.title}
              </CardTitle>
              <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center shadow-glow">
                <card.icon className="h-4 w-4 text-primary-foreground" />
              </div>
            </div>
          </CardHeader>
          <CardContent className="py-2">
            <div className="text-2xl font-bold text-foreground flex items-baseline justify-between">
              <span className="text-left">{card.value}</span>
              {card.change && (
                <span 
                  className={`text-xs font-medium px-2 py-1 rounded-full ${
                    card.changeType === "positive" 
                      ? "text-success bg-success/10" 
                      : card.changeType === "negative"
                      ? "text-destructive bg-destructive/10"
                      : "text-muted-foreground bg-muted"
                  }`}
                >
                  {card.change}
                </span>
              )}
            </div>
            <div className="flex items-center justify-center mt-1">
              <p className="text-xs text-muted-foreground whitespace-nowrap overflow-hidden text-ellipsis text-center">
                {card.description}
              </p>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}