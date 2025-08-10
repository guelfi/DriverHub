import { useState } from "react"
import { Eye, EyeOff, Mail, Lock, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface LoginFormProps {
  onLogin: (email: string, password: string) => Promise<void>
}

export function LoginForm({ onLogin }: LoginFormProps) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!email || !password) {
      // O toast de erro será tratado pelo componente pai (Login.tsx)
      return
    }

    setIsLoading(true)
    try {
          onLogin(email.trim(), password.trim())
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Card className="w-full max-w-md bg-gradient-card border-border/50 shadow-elevation-lg">
      <CardHeader className="space-y-4 text-center pb-8">
        <div className="mx-auto w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center shadow-glow">
          <Lock className="w-6 h-6 text-primary-foreground" />
        </div>
        <div>
          <CardTitle className="text-2xl font-semibold">Bem-vindo</CardTitle>
          <CardDescription className="text-muted-foreground mt-2">
            Faça login para acessar o dashboard
          </CardDescription>
        </div>
      </CardHeader>
      
      <CardContent>
        <form onSubmit={handleSubmit} className="w-full space-y-6">
          <div className="space-y-2">
            <Label htmlFor="email" className="text-sm font-medium">
              Email
            </Label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                id="email"
                type="email"
                placeholder="seu@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="pl-10 bg-input border-border/50 focus:ring-2 focus:ring-primary/20 transition-all"
                required
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="password" className="text-sm font-medium">
              Senha
            </Label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Sua senha"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="pl-10 pr-10 bg-input border-border/50 focus:ring-2 focus:ring-primary/20 transition-all"
                required
              />
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="absolute right-1 top-1/2 transform -translate-y-1/2 h-8 w-8 text-muted-foreground hover:text-foreground"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </Button>
            </div>
          </div>
          
          <Button
            type="submit"
            className="w-full bg-gradient-primary hover:shadow-glow transition-all duration-300 group"
            disabled={isLoading}
          >
            {isLoading ? (
              "Entrando..."
            ) : (
              <>
                Entrar
                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </>
            )}
          </Button>
        </form>
        
        <div className="mt-6 text-center">
          <Button variant="link" className="text-sm text-muted-foreground hover:text-primary">
            Esqueceu sua senha?
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}