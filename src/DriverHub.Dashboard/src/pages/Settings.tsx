import { User, Lock, Globe } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { useAuth } from "@/context/AuthContext"

export default function Settings() {
  const { user } = useAuth();

  return (
    <div className="space-y-6">
      <div className="flex items-baseline gap-2">
        <h1 className="text-3xl font-bold text-foreground">Configurações</h1>
        <p className="text-muted-foreground text-sm">
          Gerencie suas preferências e configurações do sistema
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Segurança */}
        <Card className="bg-gradient-card border-border/50 shadow-elevation-md">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Lock className="w-5 h-5" />
              Segurança
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button variant="outline" className="w-full">
              Alterar Senha
            </Button>
            <Button variant="outline" className="w-full">
              Autenticação em Duas Etapas
            </Button>
            <div className="flex items-center justify-between">
              <Label htmlFor="session-timeout">Timeout de Sessão</Label>
              <Switch id="session-timeout" />
            </div>
          </CardContent>
        </Card>

        {/* Sistema */}
        <Card className="bg-gradient-card border-border/50 shadow-elevation-md">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Globe className="w-5 h-5" />
              Sistema
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Idioma</Label>
              <select className="w-full p-2 border border-border rounded-md bg-input">
                <option>Português (Brasil)</option>
                <option>English</option>
                <option>Español</option>
              </select>
            </div>
            <div className="space-y-2">
              <Label>Fuso Horário</Label>
              <select className="w-full p-2 border border-border rounded-md bg-input">
                <option>América/São_Paulo</option>
                <option>América/New_York</option>
                <option>Europa/London</option>
              </select>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}