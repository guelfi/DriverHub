using System;
using System.Threading.Tasks;
using DriverHub.Domain.Entities;

namespace DriverHub.Domain.Repositories
{
    public interface IDespesaPessoalRepository
    {
        Task<DespesaPessoal> GetByIdAsync(Guid id);
        Task AddAsync(DespesaPessoal despesa);
        Task UpdateAsync(DespesaPessoal despesa);
        Task DeleteAsync(Guid id);
    }
}
