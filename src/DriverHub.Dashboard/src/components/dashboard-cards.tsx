import { Users, Car, TrendingUp, Activity } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

interface DashboardCard {
  title: string
  value: string | number
  description: string
  icon: React.ElementType
  change?: string
  changeType?: "positive" | "negative" | "neutral"
}

const dashboardData: DashboardCard[] = [
  {
    title: "Motoristas Cadastrados",
    value: 245,
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
  },
  {
    title: "Status Geral",
    value: "98.5%",
    description: "Disponibilidade da frota",
    icon: Activity,
    change: "-1.2%",
    changeType: "negative"
  }
]

export function DashboardCards() {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
      {dashboardData.map((card, index) => (
        <Card 
          key={card.title} 
          className="bg-gradient-card border-border/50 shadow-elevation-md hover:shadow-elevation-lg transition-all duration-300 hover:-translate-y-1"
        >
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              {card.title}
            </CardTitle>
            <div className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center shadow-glow">
              <card.icon className="h-5 w-5 text-primary-foreground" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-foreground mb-1">
              {card.value}
            </div>
            <div className="flex items-center gap-2">
              <p className="text-xs text-muted-foreground">
                {card.description}
              </p>
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
          </CardContent>
        </Card>
      ))}
    </div>
  )
}