using DriverHub.Domain.Entities;
using System;
using System.Threading.Tasks;

namespace DriverHub.Domain.Repositories
{
    public interface IMotoristaRepository
    {
        Task<Motorista> GetByIdAsync(Guid id);
        Task<Motorista> GetByEmailAsync(string email);
        Task AddAsync(Motorista motorista);
        Task UpdateAsync(Motorista motorista);
        Task DeleteAsync(Guid id);
    }
}