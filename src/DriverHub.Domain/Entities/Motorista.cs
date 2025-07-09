using System;

namespace DriverHub.Domain.Entities
{
    public enum Role
    {
        Motorista,
        Admin
    }

    public class Motorista
    {
        public Guid Id { get; set; }
        public string Nome { get; set; }
        public string Email { get; set; }
        public string SenhaHash { get; set; }
        public string Sal { get; set; }
        public string NumeroCelular { get; set; }
        public Role Role { get; set; }
        public decimal AluguelSemanalVeiculo { get; set; }
        public int DiasTrabalhadosPorSemana { get; set; }
        public decimal AutonomiaVeiculoKmPorLitro { get; set; }
        public DateTimeOffset DataCadastro { get; set; }
    }
}