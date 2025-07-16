import { User, Bell, Lock, Globe } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"

export default function Settings() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Configurações</h1>
        <p className="text-muted-foreground mt-2">
          Gerencie suas preferências e configurações do sistema
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Perfil */}
        <Card className="bg-gradient-card border-border/50 shadow-elevation-md">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="w-5 h-5" />
              Perfil do Usuário
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Nome</Label>
              <Input id="name" defaultValue="Administrador" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" defaultValue="admin@empresa.com" />
            </div>
            <Button className="w-full bg-gradient-primary">
              Salvar Alterações
            </Button>
          </CardContent>
        </Card>

        {/* Notificações */}
        <Card className="bg-gradient-card border-border/50 shadow-elevation-md">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell className="w-5 h-5" />
              Notificações
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="email-notifications">Notificações por Email</Label>
              <Switch id="email-notifications" defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="push-notifications">Notificações Push</Label>
              <Switch id="push-notifications" defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="maintenance-alerts">Alertas de Manutenção</Label>
              <Switch id="maintenance-alerts" defaultChecked />
            </div>
          </CardContent>
        </Card>

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