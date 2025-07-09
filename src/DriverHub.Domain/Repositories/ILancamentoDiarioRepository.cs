using System;
using System.Threading.Tasks;
using DriverHub.Domain.Entities;

namespace DriverHub.Domain.Repositories
{
    public interface ILancamentoDiarioRepository
    {
        Task<LancamentoDiario> GetByIdAsync(Guid id);
        Task AddAsync(LancamentoDiario lancamento);
        Task UpdateAsync(LancamentoDiario lancamento);
        Task DeleteAsync(Guid id);
    }
}