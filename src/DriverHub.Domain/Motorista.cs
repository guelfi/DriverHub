using System;
using System.Collections.Generic;

namespace DriverHub.Domain.Entities
{
    public class Motorista
    {
        public Guid Id { get; set; }
        public string Nome { get; set; } = null!; // Adicione = null!
        public string Sobrenome { get; set; } = null!; // Adicione = null!
        public string Email { get; set; } = null!; // Adicione = null!
        public string SenhaHash { get; set; } = null!; // Adicione = null!
        public string Sal { get; set; } = null!; // Adicione = null!
        public string NumeroCelular { get; set; } = null!; // Adicione = null!
        public decimal AluguelSemanalVeiculo { get; set; }
        public int DiasTrabalhadosPorSemana { get; set; }
        public decimal AutonomiaVeiculoKmPorLitro { get; set; }
        public DateTimeOffset DataCadastro { get; set; }

        // Relacionamentos (mantido comentado por enquanto)
        public ICollection<Viagem> Viagens { get; set; } = new List<Viagem>();
    }
}