using DriverHub.Domain.Repositories;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;

namespace DriverHub.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize(Roles = "Admin")] // Apenas administradores podem acessar este controlador
    public class AdminController : ControllerBase
    {
        private readonly IMotoristaRepository _motoristaRepository;

        public AdminController(IMotoristaRepository motoristaRepository)
        {
            _motoristaRepository = motoristaRepository;
        }

        [HttpGet("motorist-count")]
        public async Task<IActionResult> GetMotoristCount()
        {
            var count = await _motoristaRepository.GetMotoristCountAsync(); // Método a ser implementado
            return Ok(new { MotoristCount = count });
        }
    }
}
