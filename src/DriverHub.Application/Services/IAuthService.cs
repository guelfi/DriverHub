using System.Threading.Tasks;
using DriverHub.Application.Common;
using DriverHub.Application.DTOs;

namespace DriverHub.Application.Services
{
    public interface IAuthService
    {
        Task<Result<string>> RegisterMotoristaAsync(RegisterDto registerDto);
        Task<Result<LoginResponseDto>> LoginMotoristaAsync(LoginDto loginDto);
        Task<Result<string>> RegisterAdminAsync(RegisterDto registerDto);
        Task<Result<LoginResponseDto>> LoginAdminAsync(LoginDto loginDto);
    }
}