import { User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useAuth } from "@/context/AuthContext"

export default function ProfileSettings() {
  const { user } = useAuth();

  return (
    <div className="space-y-6">
      <div className="flex items-baseline gap-2">
        <h1 className="text-3xl font-bold text-foreground">Perfil do Usuário</h1>
        <p className="text-muted-foreground text-sm">
          Gerencie suas informações de perfil.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Perfil */}
        <Card className="bg-gradient-card border-border/50 shadow-elevation-md">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="w-5 h-5" />
              Informações do Perfil
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Nome</Label>
              <Input id="name" defaultValue={user?.name || ""} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" defaultValue={user?.email || ""} />
            </div>
            <Button className="w-full bg-gradient-primary">
              Salvar Alterações
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}