using System.ComponentModel.DataAnnotations;

namespace DriverHub.API.Models.DTOs
{
    public class LoginRequest
    {
        [Required(ErrorMessage = "O campo Email é obrigatório.")]
        [EmailAddress(ErrorMessage = "O campo Email deve ser um endereço de e-mail válido.")]
        public string? Email { get; set; }

        [Required(ErrorMessage = "O campo Senha é obrigatório.")]
        public string? Password { get; set; }
    }
}