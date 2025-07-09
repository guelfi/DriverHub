using System;

namespace DriverHub.Domain.Entities
{
    public class LancamentoDiario
    {
        public Guid Id { get; set; }
        public Guid MotoristaId { get; set; }
        public DateTimeOffset Data { get; set; }
        public decimal KmRodados { get; set; }
        public decimal FaturamentoBrutoTotal { get; set; }
        public decimal ValorMedioEtanolDoDia { get; set; }
        public decimal HorasTrabalhadas { get; set; }
        public virtual Motorista Motorista { get; set; }
    }
}
