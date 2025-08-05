using DriverHub.Application.DTOs;
using DriverHub.Application.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace DriverHub.API.Controllers;

[Authorize(Roles = "Motorista")]
[Route("api/[controller]")]
[ApiController]
public class MotoristaController : ControllerBase
{
    private readonly IMotoristaService _motoristaService;

    public MotoristaController(IMotoristaService motoristaService)
    {
        _motoristaService = motoristaService;
    }

    [HttpGet("profile")]
    public async Task<IActionResult> GetProfile()
    {
        var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
        if (string.IsNullOrEmpty(userId))
        {
            return Unauthorized();
        }

        var result = await _motoristaService.GetProfileAsync(userId);

        return result.IsSuccess ? Ok(result.Value) : BadRequest(result.Error);
    }

    [HttpPut("profile")]
    public async Task<IActionResult> UpdateProfile([FromBody] UpdateProfileDto updateDto)
    {
        var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
        if (string.IsNullOrEmpty(userId))
        {
            return Unauthorized();
        }

        var result = await _motoristaService.UpdateProfileAsync(userId, updateDto);

        return result.IsSuccess ? NoContent() : BadRequest(result.Error);
    }
}
