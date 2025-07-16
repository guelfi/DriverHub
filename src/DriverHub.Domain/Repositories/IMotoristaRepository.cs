using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using DriverHub.Domain.Entities;

namespace DriverHub.Domain.Repositories
{
    public interface IMotoristaRepository
    {
        Task<Motorista?> GetByIdAsync(Guid id);
        Task<Motorista?> GetByEmailAsync(string email);
        Task AddAsync(Motorista motorista);
        Task UpdateAsync(Motorista motorista);
        Task DeleteAsync(Guid id);
        Task<int> GetMotoristCountAsync();
        Task<IEnumerable<Motorista>> GetAllAsync();
    }
}