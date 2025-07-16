import { DashboardCards } from "@/components/dashboard-cards"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function Dashboard() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
        <p className="text-muted-foreground mt-2">
          Visão geral do sistema de gerenciamento de frota
        </p>
      </div>

      {/* Cards principais */}
      <DashboardCards />

      {/* Cards adicionais */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card className="bg-gradient-card border-border/50 shadow-elevation-md">
          <CardHeader>
            <CardTitle className="text-lg">Atividades Recentes</CardTitle>
            <CardDescription>
              Últimas atividades do sistema
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                <div className="w-2 h-2 bg-success rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium">Novo motorista cadastrado</p>
                  <p className="text-xs text-muted-foreground">João Silva - há 2 horas</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                <div className="w-2 h-2 bg-primary rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium">Viagem concluída</p>
                  <p className="text-xs text-muted-foreground">Veículo ABC-1234 - há 1 hora</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                <div className="w-2 h-2 bg-warning rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium">Manutenção agendada</p>
                  <p className="text-xs text-muted-foreground">Veículo DEF-5678 - há 3 horas</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-card border-border/50 shadow-elevation-md">
          <CardHeader>
            <CardTitle className="text-lg">Próximas Tarefas</CardTitle>
            <CardDescription>
              Ações que precisam de atenção
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center gap-3 p-3 bg-warning/10 border border-warning/20 rounded-lg">
                <div className="w-2 h-2 bg-warning rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium">Renovar CNH de 3 motoristas</p>
                  <p className="text-xs text-muted-foreground">Vence em 15 dias</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-destructive/10 border border-destructive/20 rounded-lg">
                <div className="w-2 h-2 bg-destructive rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium">Manutenção preventiva</p>
                  <p className="text-xs text-muted-foreground">2 veículos aguardando</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-primary/10 border border-primary/20 rounded-lg">
                <div className="w-2 h-2 bg-primary rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium">Relatório mensal</p>
                  <p className="text-xs text-muted-foreground">Gerar até sexta-feira</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}