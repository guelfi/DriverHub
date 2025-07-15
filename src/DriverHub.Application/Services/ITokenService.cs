using System;

namespace DriverHub.Application.Services
{
    public interface ITokenService
    {
        string GenerateToken(Guid userId, string role);
    }
}
