import { Search, Plus, Filter } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Pagination, PaginationContent, PaginationItem, PaginationPrevious, PaginationNext } from "@/components/ui/pagination"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog" // Importar Dialog components
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

interface Motorista {
  id: string;
  nome: string;
  sobrenome: string;
  email: string;
  numeroCelular: string;
  dataCadastro: string;
}

export default function Drivers() {
  const { token } = useAuth();
  const [motoristas, setMotoristas] = useState<Motorista[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5); // 5 motoristas por página
  const [totalItems, setTotalItems] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedMotorista, setSelectedMotorista] = useState<Motorista | null>(null); // Novo estado para o motorista selecionado
  const [isDetailsDialogOpen, setIsDetailsDialogOpen] = useState(false); // Novo estado para controlar a abertura do diálogo

  const fetchMotoristas = async (page: number, limit: number) => {
    if (!token) {
      setError("Usuário não autenticado.");
      setLoading(false);
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/Admin/motoristas`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          pageNumber: page,
          pageSize: limit,
        },
      });
      setMotoristas(response.data.items);
      setTotalItems(response.data.totalCount);
    } catch (err: any) {
      console.error("Erro ao buscar motoristas:", err);
      setError(err.response?.data?.message || "Erro ao carregar motoristas.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMotoristas(currentPage, itemsPerPage);
  }, [currentPage, itemsPerPage, token]);

  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const handleRowClick = (motorista: Motorista) => {
    setSelectedMotorista(motorista);
    setIsDetailsDialogOpen(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="flex items-baseline gap-2">
          <h1 className="text-3xl font-bold text-foreground">Motoristas</h1>
          <p className="text-muted-foreground text-sm">
            Gerencie os motoristas da sua frota
          </p>
        </div>
        {/* Botão "Novo Motorista" removido conforme requisito */}
      </div>

      <div className="flex gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input 
            placeholder="Buscar motoristas..." 
            className="pl-10 bg-input border-border/50"
          />
        </div>
        <Button variant="outline" className="border-border/50">
          <Filter className="w-4 h-4 mr-2" />
          Filtros
        </Button>
      </div>

      <Card className="bg-gradient-card border-border/50 shadow-elevation-md">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="flex-shrink-0">Lista de Motoristas ({totalItems})</CardTitle>
          {!loading && !error && totalPages > 1 && (
            <Pagination className="m-0 flex-shrink-0">
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious 
                    onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                    disabled={currentPage === 1}
                    className="h-6 px-2 py-1 text-xs" 
                  />
                </PaginationItem>
                {[...Array(totalPages)].map((_, index) => (
                  <PaginationItem key={index}>
                    <Button 
                      variant={currentPage === index + 1 ? "default" : "outline"}
                      onClick={() => setCurrentPage(index + 1)}
                      className="h-6 px-2 py-1 text-xs" 
                    >
                      {index + 1}
                    </Button>
                  </PaginationItem>
                ))}
                <PaginationItem>
                  <PaginationNext 
                    onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                    disabled={currentPage === totalPages}
                    className="h-6 px-2 py-1 text-xs" 
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          )}
        </CardHeader>
        <CardContent>
          {loading && <p className="text-center py-8">Carregando motoristas...</p>}
          {error && <p className="text-center py-8 text-destructive">Erro: {error}</p>}
          {!loading && !error && motoristas.length === 0 && (
            <p className="text-center py-8 text-muted-foreground">Nenhum motorista encontrado.</p>
          )}
          {!loading && !error && motoristas.length > 0 && (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nome</TableHead>
                    <TableHead>Sobrenome</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Celular</TableHead>
                    <TableHead>Data de Cadastro</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {motoristas.map((motorista) => (
                    <TableRow key={motorista.id} onClick={() => handleRowClick(motorista)} className="cursor-pointer hover:bg-muted/50">
                      <TableCell>{motorista.nome}</TableCell>
                      <TableCell>{motorista.sobrenome}</TableCell>
                      <TableCell>{motorista.email}</TableCell>
                      <TableCell>{motorista.numeroCelular}</TableCell>
                      <TableCell>{new Date(motorista.dataCadastro).toLocaleDateString()}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Diálogo de Detalhes do Motorista */}
      <Dialog open={isDetailsDialogOpen} onOpenChange={setIsDetailsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Detalhes do Motorista</DialogTitle>
            <DialogDescription>
              Informações detalhadas do motorista selecionado.
            </DialogDescription>
          </DialogHeader>
          {selectedMotorista && (
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <p className="text-right font-medium">Nome:</p>
                <p className="col-span-3">{selectedMotorista.nome} {selectedMotorista.sobrenome}</p>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <p className="text-right font-medium">Email:</p>
                <p className="col-span-3">{selectedMotorista.email}</p>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <p className="text-right font-medium">Celular:</p>
                <p className="col-span-3">{selectedMotorista.numeroCelular}</p>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <p className="text-right font-medium">Cadastro:</p>
                <p className="col-span-3">{new Date(selectedMotorista.dataCadastro).toLocaleDateString()}</p>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}