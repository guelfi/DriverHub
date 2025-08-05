using DriverHub.Application.DTOs;
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
        public async Task<IActionResult> RegisterMotorista([FromBody] RegisterDto registerDto)
        {
            var result = await _authService.RegisterMotoristaAsync(registerDto);
            if (!result.IsSuccess)
            {
                return BadRequest(result.Error);
            }
            return Ok(new { motoristaId = result.Value });
        }

        [HttpPost("login")]
        public async Task<IActionResult> LoginMotorista([FromBody] LoginDto loginDto)
        {
            var result = await _authService.LoginMotoristaAsync(loginDto);
            if (!result.IsSuccess)
            {
                return Unauthorized(new { message = result.Error });
            }
            return Ok(result.Value);
        }

        [HttpPost("login-admin")]
        public async Task<IActionResult> LoginAdmin([FromBody] LoginDto loginDto)
        {
            var result = await _authService.LoginAdminAsync(loginDto);
            if (!result.IsSuccess)
            {
                return Unauthorized(new { message = result.Error });
            }
            return Ok(result.Value);
        }
    }
}
