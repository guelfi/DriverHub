using DriverHub.Application.Services;
using DriverHub.API.Models.DTOs;
using DriverHub.Domain.Repositories;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;

namespace DriverHub.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly IAuthService _authService;
        private readonly IMotoristaRepository _motoristaRepository;

        public AuthController(IAuthService authService, IMotoristaRepository motoristaRepository)
        {
            _authService = authService;
            _motoristaRepository = motoristaRepository;
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] RegisterRequest request)
        {
            try
            {
                await _authService.RegisterAsync(request.Email!, request.Password!, request.Nome!, request.Sobrenome!);
                return Ok("Usuário registrado com sucesso.");
            }
            catch (ArgumentException ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginRequest request)
        {
            var token = await _authService.LoginAsync(request.Email!, request.Password!);
            if (string.IsNullOrEmpty(token))
            {
                return Unauthorized(new { message = "Credenciais inválidas." });
            }

            var motorista = await _motoristaRepository.GetByEmailAsync(request.Email!);
            if (motorista == null)
            {
                // Isso não deveria acontecer se o login foi bem-sucedido, mas é uma verificação de segurança
                return Unauthorized(new { message = "Usuário não encontrado após login bem-sucedido." });
            }

            return Ok(new { Token = token, Nome = motorista.Nome, Sobrenome = motorista.Sobrenome });
        }

        [HttpGet("ProtectedData")]
        [Authorize]
        public IActionResult ProtectedData()
        {
            return Ok("Você acessou um recurso protegido!");
        }
    }
}