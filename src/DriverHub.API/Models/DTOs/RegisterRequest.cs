using System.ComponentModel.DataAnnotations;

namespace DriverHub.API.Models.DTOs
{
    public class RegisterRequest
    {
        [Required(ErrorMessage = "O campo Email é obrigatório.")]
        [EmailAddress(ErrorMessage = "O campo Email deve ser um endereço de e-mail válido.")]
        public string? Email { get; set; }

        [Required(ErrorMessage = "O campo Senha é obrigatório.")]
        [StringLength(100, MinimumLength = 6, ErrorMessage = "A Senha deve ter entre 6 e 100 caracteres.")]
        public string? Password { get; set; }

        [Required(ErrorMessage = "O campo Nome é obrigatório.")]
        [StringLength(100, ErrorMessage = "O Nome não pode exceder 100 caracteres.")]
        public string? Nome { get; set; }

        [Required(ErrorMessage = "O campo Sobrenome é obrigatório.")]
        [StringLength(100, ErrorMessage = "O Sobrenome não pode exceder 100 caracteres.")]
        public string? Sobrenome { get; set; }
    }
}