import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { Seo } from "@/components/Seo";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Mail, Lock, User, Eye, EyeOff, Car } from "lucide-react"; // Adicionado User, Eye, EyeOff e Car
import Header from "@/components/Header"; // Importar o componente Header

const NewMotora = () => {
  const navigate = useNavigate(); // Hook para navegação
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false); // Estado para mostrar/ocultar senha
  const [showConfirmPassword, setShowConfirmPassword] = useState(false); // Estado para mostrar/ocultar confirmação de senha

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error("As senhas não coincidem.");
      return;
    }

    // Lógica de cadastro mockada
    console.log('Dados de cadastro:', { firstName, lastName, email, password });
    toast.success("Cadastro efetuado com sucesso! ✨");
    // Aqui você faria a chamada para a API de cadastro
    // Após o cadastro, você pode redirecionar o usuário para a tela de login ou home
  };

  return (
    <>
      <Seo
        title="Novo Cadastro | DriverHub"
        description="Formulário de cadastro para novos motoristas."
        canonical={window.location.origin + "/new-motora"}
      />
      <div className="min-h-screen flex flex-col"> {/* Container principal para ocupar a tela toda */}
        <Header /> {/* Incluir o componente Header */}
        <main className="flex flex-col items-center justify-center flex-grow bg-background p-6"> {/* Ocupa o restante do espaço */}
          <div className="w-full max-w-md">
            {/* Conteúdo do Card */}
            <Card className="shadow-elevated">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-lg">Preencha seus dados</CardTitle>
                <Button variant="default" className="bg-gradient-primary text-primary-foreground hover:opacity-90 transition-smooth" onClick={() => navigate("/")}> Fechar</Button>
              </CardHeader>
              <CardContent>
                <form className="space-y-6" onSubmit={handleSubmit}>
                  <div className="space-y-2">
                    <Label htmlFor="firstName">Nome</Label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="firstName"
                        type="text"
                        placeholder="Seu nome"
                        className="pl-9"
                        required
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="lastName">Sobrenome</Label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="lastName"
                        type="text"
                        placeholder="Seu sobrenome"
                        className="pl-9"
                        required
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">E-mail</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="email"
                        type="email"
                        placeholder="voce@exemplo.com"
                        className="pl-9"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
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

                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword">Confirmar Senha</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="confirmPassword"
                        type={showConfirmPassword ? "text" : "password"} // Alterna entre text e password
                        placeholder="Confirme sua senha"
                        className="pl-9 pr-10" // Adicionado padding à direita para o ícone
                        required
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                      />
                      <button
                        type="button" // Importante para não submeter o formulário
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                        aria-label={showConfirmPassword ? "Ocultar confirmação de senha" : "Mostrar confirmação de senha"}
                      >
                        {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                  </div>

                  <Button type="submit" className="w-full bg-gradient-primary text-primary-foreground hover:opacity-90 transition-smooth">
                    Cadastrar
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </>
  );
};

export default NewMotora;
