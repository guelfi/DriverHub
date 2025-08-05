using System.Text.Json.Serialization;

namespace DriverHub.Application.DTOs
{
    public class LoginDto
    {
        public string Email { get; set; } = string.Empty;

        [JsonPropertyName("senha")]
        public string Password { get; set; } = string.Empty;
    }
}