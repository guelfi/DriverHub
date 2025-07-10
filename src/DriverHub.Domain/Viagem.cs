using System;
using System.Collections.Generic;

namespace DriverHub.Domain.Entities
{
    public class Viagem
    {
        public Guid Id { get; set; }
        public Guid MotoristaId { get; set; }
        public DateTimeOffset DataViagem { get; set; }
        public string Origem { get; set; } = null!;
        public string Destino { get; set; } = null!;
        public decimal DistanciaKm { get; set; }
        public decimal ValorRecebido { get; set; }
        public decimal CustoCombustivel { get; set; }
        public decimal Lucro { get; set; }

        // Propriedade de navegação
        public Motorista? Motorista { get; set; }
    }
}