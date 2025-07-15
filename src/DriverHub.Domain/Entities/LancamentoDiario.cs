using System;

namespace DriverHub.Domain.Entities
{
    public class LancamentoDiario
    {
        public Guid Id { get; set; }
        public Guid MotoristaId { get; set; }
        public DateTime Data { get; set; }
        public decimal Valor { get; set; }
        public string Descricao { get; set; } = null!;
        public string Tipo { get; set; } = null!; // Ex: "Receita", "Despesa"

        public Motorista Motorista { get; set; } = null!;
    }
}
