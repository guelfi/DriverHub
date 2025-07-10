using System;
using System.Collections.Generic;

namespace DriverHub.Domain.Entities
{
    public class Viagem
    {
        public Guid Id { get; set; }
        public Guid MotoristaId { get; set; }
        public DateTimeOffset DataViagem { get; set; }
        public decimal QuilometragemInicial { get; set; }
        public decimal QuilometragemFinal { get; set; }
        public decimal ValorRecebido { get; set; }
        public decimal GastoCombustivel { get; set; }
        public decimal ValorLiquido => ValorRecebido - GastoCombustivel;

        // Propriedade de navegação
        public Motorista? Motorista { get; set; }
    }
}