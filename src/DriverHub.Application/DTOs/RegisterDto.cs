using System.Text.Json.Serialization;

namespace DriverHub.Application.DTOs
{
    public class RegisterDto
    {
        public string Email { get; set; } = string.Empty;
        [JsonPropertyName("senha")]
        public string Password { get; set; } = string.Empty;
        public string Nome { get; set; } = string.Empty;
        public string Sobrenome { get; set; } = string.Empty;
    }
}