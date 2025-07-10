using DriverHub.Application.Services;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace DriverHub.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly IAuthService _authService;

        public AuthController(IAuthService authService)
        {
            _authService = authService;
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] RegisterRequest request)
        {
            try
            {
                var motoristaId = await _authService.RegisterMotoristaAsync(
                    request.Nome,
                    request.Email,
                    request.Password,
                    string.Empty, // Default value for NumeroCelular
                    0,            // Default value for AluguelSemanalVeiculo
                    0,            // Default value for DiasTrabalhadosPorSemana
                    0             // Default value for AutonomiaVeiculoKmPorLitro
                );
                return Ok(new { Id = motoristaId, Message = "Motorista registrado com sucesso!" });
            }
            catch (ArgumentException ex)
            {
                return BadRequest(new { Message = ex.Message });
            }
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginRequest request)
        {
            try
            {
                var token = await _authService.LoginMotoristaAsync(request.Email, request.Password);
                return Ok(new { Token = token });
            }
            catch (ArgumentException ex)
            {
                return Unauthorized(new { Message = ex.Message });
            }
        }
    }

    public class RegisterRequest
    {
        public string Nome { get; set; } = null!;
        public string Email { get; set; } = null!;
        public string Password { get; set; } = null!;
    }

    public class LoginRequest
    {
        public string Email { get; set; } = null!;
        public string Password { get; set; } = null!;
    }
}