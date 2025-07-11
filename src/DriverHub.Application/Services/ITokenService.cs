namespace DriverHub.Application.Services
{
    public interface ITokenService
    {
        string GenerateToken(Domain.Entities.Motorista motorista);
    }
}