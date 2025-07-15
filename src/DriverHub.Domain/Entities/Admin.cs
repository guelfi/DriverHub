using System;

namespace DriverHub.Domain.Entities
{
    public class Admin
    {
        public Guid Id { get; set; }
        public string Nome { get; set; } = string.Empty;
        public string Sobrenome { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public string SenhaHash { get; set; } = string.Empty;
        public string Sal { get; set; } = string.Empty;
        public DateTimeOffset DataCadastro { get; set; }
    }
}
