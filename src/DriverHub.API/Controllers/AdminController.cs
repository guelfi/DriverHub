using DriverHub.Application.DTOs;
using DriverHub.Application.Services;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

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
    }
}
