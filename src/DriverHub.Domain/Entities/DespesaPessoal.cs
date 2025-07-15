using System;

namespace DriverHub.Domain.Entities
{
    public class DespesaPessoal
    {
        public Guid Id { get; set; }
        public Guid MotoristaId { get; set; }
        public DateTime Data { get; set; }
        public decimal Valor { get; set; }
        public string Descricao { get; set; } = null!;
        public string Categoria { get; set; } = null!; // Ex: "Combustível", "Manutenção", "Alimentação"

        public Motorista Motorista { get; set; } = null!;
    }
}
