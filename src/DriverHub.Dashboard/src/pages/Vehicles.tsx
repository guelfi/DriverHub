import { Search, Plus, Filter } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function Vehicles() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="flex items-baseline gap-2">
          <h1 className="text-3xl font-bold text-foreground">Veículos</h1>
          <p className="text-muted-foreground text-sm">
            Gerencie os veículos da sua frota
          </p>
        </div>
        <Button className="bg-gradient-primary shadow-elevation-sm hover:shadow-glow">
          <Plus className="w-4 h-4 mr-2" />
          Novo Veículo
        </Button>
      </div>

      <div className="flex gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input 
            placeholder="Buscar veículos..." 
            className="pl-10 bg-input border-border/50"
          />
        </div>
        <Button variant="outline" className="border-border/50">
          <Filter className="w-4 h-4 mr-2" />
          Filtros
        </Button>
      </div>

      <Card className="bg-gradient-card border-border/50 shadow-elevation-md">
        <CardHeader>
          <CardTitle>Lista de Veículos</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground text-center py-8">
            Funcionalidade em desenvolvimento...
          </p>
        </CardContent>
      </Card>
    </div>
  )
}