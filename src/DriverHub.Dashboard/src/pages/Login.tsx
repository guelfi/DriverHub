import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/context/AuthContext";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const { login } = useAuth();

  const handleLogin = async () => {
    setError(null);
    try {
      const response = await login(email, password); // Assumindo que login retorna o token e dados do usuário
      // O AuthContext já cuida de setar o estado de autenticação
    } catch (err: any) {
      setError(err.message || "Erro desconhecido ao fazer login");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
      <Card className="w-full max-w-md shadow-2xl rounded-2xl p-6">
        <h2 className="text-2xl font-bold mb-4 text-center text-gray-800 dark:text-gray-100">Login</h2>
        <Input
          placeholder="Email"
          className="mb-3"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          placeholder="Senha"
          type="password"
          className="mb-4"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {error && <p className="text-red-500 text-sm mb-3">{error}</p>}
        <Button className="w-full" onClick={handleLogin}>Entrar</Button>
      </Card>
    </div>
  );
}
