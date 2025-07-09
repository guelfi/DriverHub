using System;
using System.Threading.Tasks;
using DriverHub.Domain.Entities;

namespace DriverHub.Domain.Repositories
{
    public interface IPlataformaCorridaRepository
    {
        Task<PlataformaCorrida> GetByIdAsync(Guid id);
        Task AddAsync(PlataformaCorrida plataforma);
        Task UpdateAsync(PlataformaCorrida plataforma);
        Task DeleteAsync(Guid id);
    }
}
