import { Bell } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"

export default function Notifications() {
  return (
    <div className="space-y-6">
      <div className="flex items-baseline gap-2">
        <h1 className="text-3xl font-bold text-foreground">Notificações</h1>
        <p className="text-muted-foreground text-sm">
          Gerencie suas preferências de notificação.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Notificações */}
        <Card className="bg-gradient-card border-border/50 shadow-elevation-md">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell className="w-5 h-5" />
              Preferências de Notificação
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
      </div>
    </div>
  )
}