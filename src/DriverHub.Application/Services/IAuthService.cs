using System.Threading.Tasks;
using DriverHub.Application.Common;
using DriverHub.Application.DTOs;
using DriverHub.Domain.Entities;

namespace DriverHub.Application.Services
{
    public interface IAuthService
    {
        Task<Result<string>> RegisterMotoristaAsync(RegisterDto registerDto);
        Task<Result<LoginResponseDto>> LoginMotoristaAsync(LoginDto loginDto);
        Task<Result<string>> RegisterAdminAsync(RegisterDto registerDto);
        Task<Result<LoginResponseDto>> LoginAdminAsync(LoginDto loginDto);
        Task<Result<int>> GetMotoristCountAsync();
        Task<Result<IEnumerable<Motorista>>> GetAllMotoristasAsync();
    }
}