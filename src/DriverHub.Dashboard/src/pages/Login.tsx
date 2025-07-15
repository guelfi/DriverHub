import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/context/AuthContext";
import { Eye, EyeOff } from "lucide-react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false); // Novo estado
  const { login } = useAuth();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault(); // Previne o comportamento padrão do formulário
    console.log("handleLogin called");
    setError(null);
    try {
      const response = await login(email, password); // Assumindo que login retorna o token e dados do usuário
      // O AuthContext já cuida de setar o estado de autenticação
      window.location.reload(); // Força o recarregamento da página após o login bem-sucedido
    } catch (err: any) {
      setError(err.message || "Erro desconhecido ao fazer login");
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
      <Card className="w-full max-w-md shadow-2xl rounded-2xl p-6">
        <h2 className="text-2xl font-bold mb-4 text-center text-gray-800 dark:text-gray-100">Login</h2>
        <form onSubmit={handleLogin}> {/* Adiciona o formulário e o onSubmit */}
          <Input
            placeholder="Email"
            className="mb-3"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <div className="relative mb-4">
            <Input
              placeholder="Senha"
              type={showPassword ? "text" : "password"} // Altera o tipo com base no estado
              className="pr-10" // Adiciona padding para o ícone
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 dark:text-gray-400"
              aria-label={showPassword ? "Esconder senha" : "Mostrar senha"}
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
          {error && <p className="text-red-500 text-sm mb-3">{error}</p>}
          <Button className="w-full" type="submit">Entrar</Button> {/* Altera para type="submit" */}
        </form>
      </Card>
    </div>
  );
}
