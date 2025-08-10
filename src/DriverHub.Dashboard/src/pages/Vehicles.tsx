import { Search, Plus, Filter } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Pagination, PaginationContent, PaginationItem, PaginationPrevious, PaginationNext } from "@/components/ui/pagination"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

interface Veiculo {
  id: string;
  marca: string;
  modelo: string;
  anoFabricacao: number;
  anoModelo: number;
  quilometragem: number;
  autonomiaKmPorLitro: number; // Assumindo que este campo existe na API
}

export default function Vehicles() {
  const { token } = useAuth();
  const [veiculos, setVeiculos] = useState<Veiculo[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5); // 5 veículos por página
  const [totalItems, setTotalItems] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedVeiculo, setSelectedVeiculo] = useState<Veiculo | null>(null); // Novo estado para o veículo selecionado
  const [isDetailsDialogOpen, setIsDetailsDialogOpen] = useState(false); // Novo estado para controlar a abertura do diálogo

  const fetchVeiculos = async (page: number, limit: number) => {
    setLoading(true);
    setError(null);

    // Dados mockados de veículos
    const mockVeiculos: Veiculo[] = [
      { id: "1", marca: "Toyota", modelo: "Corolla", anoFabricacao: 2020, anoModelo: 2021, quilometragem: 50000, autonomiaKmPorLitro: 12 },
      { id: "2", marca: "Honda", modelo: "Civic", anoFabricacao: 2019, anoModelo: 2020, quilometragem: 60000, autonomiaKmPorLitro: 11 },
      { id: "3", marca: "Ford", modelo: "Focus", anoFabricacao: 2018, anoModelo: 2019, quilometragem: 75000, autonomiaKmPorLitro: 10 },
      { id: "4", marca: "Chevrolet", modelo: "Onix", anoFabricacao: 2022, anoModelo: 2022, quilometragem: 20000, autonomiaKmPorLitro: 13 },
      { id: "5", marca: "Volkswagen", modelo: "Gol", anoFabricacao: 2017, anoModelo: 2018, quilometragem: 90000, autonomiaKmPorLitro: 14 },
      { id: "6", marca: "Hyundai", modelo: "HB20", anoFabricacao: 2021, anoModelo: 2021, quilometragem: 30000, autonomiaKmPorLitro: 12.5 },
      { id: "7", marca: "Fiat", modelo: "Cronos", anoFabricacao: 2020, anoModelo: 2020, quilometragem: 45000, autonomiaKmPorLitro: 11.5 },
      { id: "8", marca: "Renault", modelo: "Kwid", anoFabricacao: 2023, anoModelo: 2023, quilometragem: 10000, autonomiaKmPorLitro: 15 },
      { id: "9", marca: "Jeep", modelo: "Renegade", anoFabricacao: 2019, anoModelo: 2020, quilometragem: 55000, autonomiaKmPorLitro: 9 },
      { id: "10", marca: "BMW", modelo: "X1", anoFabricacao: 2022, anoModelo: 2023, quilometragem: 15000, autonomiaKmPorLitro: 8.5 },
    ];

    // Simula a paginação dos dados mockados
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedVeiculos = mockVeiculos.slice(startIndex, endIndex);

    // Simula um atraso na rede
    await new Promise(resolve => setTimeout(resolve, 500));

    setVeiculos(paginatedVeiculos);
    setTotalItems(mockVeiculos.length);
    setLoading(false);
  };

  useEffect(() => {
    fetchVeiculos(currentPage, itemsPerPage);
  }, [currentPage, itemsPerPage, token]);

  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const handleRowClick = (veiculo: Veiculo) => {
    setSelectedVeiculo(veiculo);
    setIsDetailsDialogOpen(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="flex items-baseline gap-2">
          <h1 className="text-3xl font-bold text-foreground">Veículos</h1>
          <p className="text-muted-foreground text-sm">
            Gerencie os veículos da sua frota
          </p>
        </div>
        {/* Botão "Novo Veículo" removido conforme requisito */}
      </div>

      <div className="flex gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input 
            placeholder="Buscar veículos..." 
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
          <CardTitle className="flex-shrink-0">Lista de Veículos ({totalItems})</CardTitle>
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
          {loading && <p className="text-center py-8">Carregando veículos...</p>}
          {error && <p className="text-center py-8 text-destructive">Erro: {error}</p>}
          {!loading && !error && veiculos.length === 0 && (
            <p className="text-center py-8 text-muted-foreground">Nenhum veículo encontrado.</p>
          )}
          {!loading && !error && veiculos.length > 0 && (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Marca</TableHead>
                    <TableHead>Modelo</TableHead>
                    <TableHead>Ano Fabricação</TableHead>
                    <TableHead>Ano Modelo</TableHead>
                    <TableHead>Quilometragem</TableHead>
                    <TableHead>Autonomia</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {veiculos.map((veiculo) => (
                    <TableRow key={veiculo.id} onClick={() => handleRowClick(veiculo)} className="cursor-pointer hover:bg-muted/50">
                      <TableCell>{veiculo.marca}</TableCell>
                      <TableCell>{veiculo.modelo}</TableCell>
                      <TableCell>{veiculo.anoFabricacao}</TableCell>
                      <TableCell>{veiculo.anoModelo}</TableCell>
                      <TableCell>{veiculo.quilometragem} km</TableCell>
                      <TableCell>{veiculo.autonomiaKmPorLitro} km/l</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Diálogo de Detalhes do Veículo */}
      <Dialog open={isDetailsDialogOpen} onOpenChange={setIsDetailsDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Detalhes do Veículo</DialogTitle>
            <DialogDescription>
              Informações detalhadas do veículo selecionado.
            </DialogDescription>
          </DialogHeader>
          {selectedVeiculo && (
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <p className="text-right font-medium">Marca:</p>
                <p className="col-span-3">{selectedVeiculo.marca}</p>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <p className="text-right font-medium">Modelo:</p>
                <p className="col-span-3">{selectedVeiculo.modelo}</p>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <p className="text-right font-medium">Ano Fabricação:</p>
                <p className="col-span-3">{selectedVeiculo.anoFabricacao}</p>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <p className="text-right font-medium">Ano Modelo:</p>
                <p className="col-span-3">{selectedVeiculo.anoModelo}</p>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <p className="text-right font-medium">Quilometragem:</p>
                <p className="col-span-3">{selectedVeiculo.quilometragem} km</p>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <p className="text-right font-medium">Autonomia:</p>
                <p className="col-span-3">{selectedVeiculo.autonomiaKmPorLitro} km/l</p>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}