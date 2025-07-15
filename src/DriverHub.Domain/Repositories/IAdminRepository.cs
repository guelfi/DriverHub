using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using DriverHub.Domain.Entities;

namespace DriverHub.Domain.Repositories
{
    public interface IAdminRepository
    {
        Task<Admin?> GetByEmailAsync(string email);
        Task AddAsync(Admin admin);
        Task<IEnumerable<Admin>> GetAllAsync();
    }
}
