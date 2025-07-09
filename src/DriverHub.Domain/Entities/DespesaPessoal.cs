using System;

namespace DriverHub.Domain.Entities
{
    public class DespesaPessoal
    {
        public Guid Id { get; set; }
        public Guid MotoristaId { get; set; }
        public string Categoria { get; set; }
        public DateTimeOffset Data { get; set; }
        public decimal Valor { get; set; }
        public string? Descricao { get; set; }

        public virtual Motorista Motorista { get; set; }
    }
}