using DriverHub.Application.Common;
using DriverHub.Application.DTOs;

namespace DriverHub.Application.Services;

public interface IMotoristaService
{
    Task<Result<ProfileDto>> GetProfileAsync(string motoristaId);
    Task<Result> UpdateProfileAsync(string motoristaId, UpdateProfileDto updateDto);
}
