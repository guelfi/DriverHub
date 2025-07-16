import { BarChart3, Download, Calendar, TrendingUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function Reports() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Relatórios</h1>
          <p className="text-muted-foreground mt-2">
            Análises e estatísticas da sua frota
          </p>
        </div>
        <Button className="bg-gradient-primary shadow-elevation-sm hover:shadow-glow">
          <Download className="w-4 h-4 mr-2" />
          Exportar Dados
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card className="bg-gradient-card border-border/50 shadow-elevation-md hover:shadow-elevation-lg transition-all duration-300">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Relatório Mensal</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">245</div>
            <p className="text-xs text-muted-foreground">Viagens realizadas</p>
            <div className="mt-4">
              <Button variant="outline" size="sm" className="w-full">
                Ver Detalhes
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-card border-border/50 shadow-elevation-md hover:shadow-elevation-lg transition-all duration-300">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Performance</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">98.5%</div>
            <p className="text-xs text-muted-foreground">Taxa de disponibilidade</p>
            <div className="mt-4">
              <Button variant="outline" size="sm" className="w-full">
                Ver Análise
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-card border-border/50 shadow-elevation-md hover:shadow-elevation-lg transition-all duration-300">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Custos</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">R$ 45.2k</div>
            <p className="text-xs text-muted-foreground">Gastos este mês</p>
            <div className="mt-4">
              <Button variant="outline" size="sm" className="w-full">
                Ver Breakdown
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-gradient-card border-border/50 shadow-elevation-md">
        <CardHeader>
          <CardTitle>Gráficos e Análises</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground text-center py-16">
            Gráficos interativos em desenvolvimento...
          </p>
        </CardContent>
      </Card>
    </div>
  )
}