import { LoginForm } from "@/components/login-form"

interface LoginProps {
  onLogin: (email: string, password: string) => void
}

export default function Login({ onLogin }: LoginProps) {
  return (
    <div className="min-h-screen bg-gradient-background flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <LoginForm onLogin={onLogin} />
      </div>
    </div>
  )
}