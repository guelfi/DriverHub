import React, { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { User, DollarSign } from "lucide-react";
import axios from "axios";
import { useAuth } from "@/context/AuthContext";

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5217/api';

export default function Dashboard() {
  const { user } = useAuth();
  const [motoristCount, setMotoristCount] = useState<number | null>(null);

  useEffect(() => {
    const fetchMotoristCount = async () => {
      try {
        const token = user?.token; // Obter o token do usuário logado
        if (!token) {
          console.error("Token de autenticação não encontrado.");
          return;
        }
        const response = await axios.get(`${API_URL}/Admin/motorist-count`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setMotoristCount(response.data.count);
      } catch (error) {
        console.error("Erro ao buscar contagem de motoristas:", error);
        setMotoristCount(null); // Em caso de erro, define como null
      }
    };

    if (user) { // Só busca a contagem se houver um usuário logado
      fetchMotoristCount();
    }
  }, [user]); // Executa quando o usuário muda

  return (
    <div className="flex-1 p-6">
      {/* Cards de informações */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <Card className="rounded-2xl shadow p-4 bg-white dark:bg-gray-800">
          <CardContent>
            <h3 className="text-sm text-gray-500 dark:text-gray-400">Motoristas Cadastrados</h3>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">{motoristCount !== null ? motoristCount : "Carregando..."}</p>
          </CardContent>
        </Card>
        <Card className="rounded-2xl shadow p-4 bg-white dark:bg-gray-800">
          <CardContent>
            <h3 className="text-sm text-gray-500 dark:text-gray-400">Viagens Realizadas (Mês)</h3>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">150</p>
          </CardContent>
        </Card>
        <Card className="rounded-2xl shadow p-4 bg-white dark:bg-gray-800">
          <CardContent>
            <h3 className="text-sm text-gray-500 dark:text-gray-400">Receita Total (Mês)</h3>
            <p className="text-2xl font-bold text-gray-900 dark:text-white"><DollarSign className="inline-block h-5 w-5 mr-1" />5.200,00</p>
          </CardContent>
        </Card>
        <Card className="rounded-2xl shadow p-4 bg-white dark:bg-gray-800">
          <CardContent>
            <h3 className="text-sm text-gray-500 dark:text-gray-400">Despesas (Mês)</h3>
            <p className="text-2xl font-bold text-gray-900 dark:text-white"><DollarSign className="inline-block h-5 w-5 mr-1" />1.800,00</p>
          </CardContent>
        </Card>
        <Card className="rounded-2xl shadow p-4 bg-white dark:bg-gray-800">
          <CardContent>
            <h3 className="text-sm text-gray-500 dark:text-gray-400">Motoristas Ativos Hoje</h3>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">35</p>
          </CardContent>
        </Card>
        <Card className="rounded-2xl shadow p-4 bg-white dark:bg-gray-800">
          <CardContent>
            <h3 className="text-sm text-gray-500 dark:text-gray-400">Média KM/Litro</h3>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">12.5</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}