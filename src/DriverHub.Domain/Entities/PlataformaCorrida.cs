using System;

namespace DriverHub.Domain.Entities
{
    public class PlataformaCorrida
    {
        public Guid Id { get; set; }
        public Guid LancamentoDiarioId { get; set; }
        public string NomePlataforma { get; set; }
        public int QuantidadeCorridas { get; set; }
        public decimal FaturamentoBrutoPorPlataforma { get; set; }

        public virtual LancamentoDiario LancamentoDiario { get; set; }
    }
}
