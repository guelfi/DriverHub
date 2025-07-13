using System.Threading.Tasks;

namespace DriverHub.Application.Services
{
    public interface IAuthService
    {
        Task RegisterAsync(string email, string password, string nome, string sobrenome);
        Task<string?> LoginAsync(string email, string password);
        Task RegisterAdminAsync(string email, string password, string nome, string sobrenome);
    }
}