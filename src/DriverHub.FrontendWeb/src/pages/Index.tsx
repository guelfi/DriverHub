import { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Seo } from "@/components/Seo";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Mail, Lock, Eye, EyeOff, X } from "lucide-react"; // Adicionado Eye, EyeOff e X
import heroImg from "@/assets/login-abstract.jpg";
import { toast } from "sonner";
import Header from "@/components/Header"; // Importar o componente Header

const Index = () => {
  const glowRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate(); // Hook para navegação

  const [email, setEmail] = useState(''); // Estado para o email
  const [password, setPassword] = useState(''); // Estado para a senha
  const [showPassword, setShowPassword] = useState(false); // Estado para mostrar/ocultar senha
  const [showErrorCard, setShowErrorCard] = useState(false); // Estado para mostrar/ocultar o card de erro
  // const [errorMessage, setErrorMessage] = useState(''); // Estado para a mensagem de erro - Removido, pois a mensagem é fixa

  // Efeito para esconder o card de erro após 3 segundos
  useEffect(() => {
    if (showErrorCard) {
      const timer = setTimeout(() => {
        setShowErrorCard(false);
        // setErrorMessage(''); // Limpa a mensagem de erro - Removido, pois a mensagem é fixa
      }, 3000); // 3 segundos
      return () => clearTimeout(timer);
    }
  }, [showErrorCard]);

  const onMouseMove = (e: React.MouseEvent) => {
    const el = glowRef.current;
    if (!el) return;
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    el.style.setProperty("--x", `${x}px`);
    el.style.setProperty("--y", `${y}px`);
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Credenciais mockadas para teste
    const mockEmail = "motora@motora.com";
    const mockPassword = "246588";

    if (email === mockEmail && password === mockPassword) {
      toast.success("Login efetuado com sucesso ✨"); // Manter o toast de sucesso
      localStorage.setItem('authToken', 'mock-token'); // Set a mock token for authentication
      navigate("/home"); // Navega para a HomeScreen após o login bem-sucedido
    } else {
      // setErrorMessage("Credenciais inválidas.<br />Tente novamente."); // Removido, pois a mensagem é fixa
      setShowErrorCard(true); // Mostra o card de erro
    }
  };

  return (
    <>
      <Seo
        title="Login | Escolha de Tema (Claro/Escuro)"
        description="Tela de login moderna inspirada no Material UI com alternância entre tema claro e escuro."
        canonical={window.location.origin + "/"}
      />

      <Header /> {/* Incluir o componente Header */}

      {showErrorCard && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
              <Card className="p-6 bg-red-600 text-white shadow-lg rounded-lg text-center">
                <CardTitle className="text-xl font-bold mb-2">Erro de Login</CardTitle>
                <CardContent>
                  <p className="text-lg">Credenciais inválidas.</p>
                  <p className="text-lg">Tente novamente.</p>
                </CardContent>
              </Card>
            </div>
          )}

          <main
            className="min-h-screen grid md:grid-cols-2"
            onMouseMove={onMouseMove}
            aria-label="Tela de login com seleção de tema"
          >
        <aside className="hidden md:block relative overflow-hidden">
          <img
            src={heroImg}
            alt="Arte abstrata em tons de índigo, estilo moderno, ilustrando o tema da aplicação"
            className="h-full w-full object-cover"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/20 to-transparent" />
        </aside>

        <section className="relative flex items-center justify-center p-6 md:p-10 bg-background">
          <div
            ref={glowRef}
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "radial-gradient(600px circle at var(--x,50%) var(--y,50%), hsl(var(--primary) / 0.15), transparent 40%)",
            }}
          />

          <div className="w-full max-w-md">
            <header className="mb-6 flex flex-col items-center">
              <h1 className="sr-only">Login - Escolha de tema</h1>
              <div className="text-center">
                <p className="text-lg text-muted-foreground">Bem-vindo de volta</p>
                <p className="font-bold text-2xl">Acesse sua conta</p>
              </div>
              {/* <ThemeToggle /> Removed */}
            </header>

            <Card className="shadow-elevated">
              <CardHeader>
                <CardTitle className="text-lg">Entre com suas credenciais</CardTitle>
              </CardHeader>
              <CardContent>
                <form className="space-y-6" onSubmit={onSubmit}>
                  <div className="space-y-2">
                    <Label htmlFor="email">E-mail</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input id="email" type="email" placeholder="voce@exemplo.com" className="pl-9" required value={email} onChange={(e) => setEmail(e.target.value)} />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="password">Senha</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="password"
                        type={showPassword ? "text" : "password"} // Alterna entre text e password
                        placeholder="Sua senha"
                        className="pl-9 pr-10" // Adicionado padding à direita para o ícone
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                      <button
                        type="button" // Importante para não submeter o formulário
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                        aria-label={showPassword ? "Ocultar senha" : "Mostrar senha"}
                      >
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Checkbox id="remember" />
                      <Label htmlFor="remember" className="text-sm text-muted-foreground">Lembrar sessão</Label>
                    </div>
                    <a href="#" className="text-sm text-primary hover:underline">Esqueceu a senha?</a>
                  </div>

                  <Button type="submit" className="w-full bg-gradient-primary text-primary-foreground hover:opacity-90 transition-smooth">
                    Entrar
                  </Button>

                  <p className="text-center text-sm text-muted-foreground mt-4">
                    Não tem cadastro? <a href="/new-motora" className="text-primary hover:underline">clique aqui</a>
                  </p>

                  </form>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>
    </>
  );
};

export default Index;