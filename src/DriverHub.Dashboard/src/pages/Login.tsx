import { LoginForm } from "@/components/login-form"
import { useAuth } from "../context/AuthContext";
import AuthService from "../services/AuthService";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogin = async (email: string, password: string) => {
    try {
      const token = await AuthService.login(email, password);
      login(token);
      navigate("/dashboard");
    } catch (error: any) {
      toast({
        title: "Erro de Login",
        description: error.response?.data?.message || "Credenciais inválidas ou erro de servidor.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-background flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <LoginForm onLogin={handleLogin} />
      </div>
    </div>
  )
}