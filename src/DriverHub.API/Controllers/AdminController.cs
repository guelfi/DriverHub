using DriverHub.Application.DTOs;
using DriverHub.Application.Services;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;

namespace DriverHub.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AdminController : ControllerBase
    {
        private readonly IAuthService _authService;

        public AdminController(IAuthService authService)
        {
            _authService = authService;
        }

        [HttpPost("login")]
        public async Task<IActionResult> LoginAdmin([FromBody] LoginDto loginDto)
        {
            var result = await _authService.LoginAdminAsync(loginDto);
            if (!result.IsSuccess)
            {
                return Unauthorized(new { message = result.Error });
            }
            return Ok(result.Value);
        }

        [HttpGet("motorist-count")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> GetMotoristCount()
        {
            var result = await _authService.GetMotoristCountAsync();
            if (!result.IsSuccess)
            {
                return StatusCode(500, new { message = result.Error });
            }
            return Ok(new { count = result.Value });
        }

        [HttpGet("motoristas")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> GetAllMotoristas()
        {
            var result = await _authService.GetAllMotoristasAsync();
            if (!result.IsSuccess)
            {
                return StatusCode(500, new { message = result.Error });
            }
            return Ok(result.Value);
        }
    }
}
