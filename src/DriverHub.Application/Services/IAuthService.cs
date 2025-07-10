using System.Threading.Tasks;

namespace DriverHub.Application.Services
{
    public interface IAuthService
    {
        Task<string> RegisterMotoristaAsync(string nome, string email, string senha, string numeroCelular, decimal aluguelSemanalVeiculo, int diasTrabalhadosPorSemana, decimal autonomiaVeiculoKmPorLitro);
        Task<string> LoginMotoristaAsync(string email, string senha);
    }
}