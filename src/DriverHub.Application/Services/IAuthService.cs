using System.Threading.Tasks;

namespace DriverHub.Application.Services
{
    public interface IAuthService
    {
        Task RegisterAsync(string email, string password, string nome);
        Task<string?> LoginAsync(string email, string password);
    }
}