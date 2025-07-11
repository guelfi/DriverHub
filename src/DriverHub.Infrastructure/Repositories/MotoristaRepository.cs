using DriverHub.Domain.Entities;
using DriverHub.Domain.Repositories;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using System;
using System.Linq;
using System.Threading.Tasks;

using DriverHub.Infrastructure.Data;

namespace DriverHub.Infrastructure.Repositories
{
    public class MotoristaRepository : IMotoristaRepository
    {
        private readonly ApplicationDbContext _context;
        private readonly ILogger<MotoristaRepository> _logger;

        public MotoristaRepository(ApplicationDbContext context, ILogger<MotoristaRepository> logger)
        {
            _context = context;
            _logger = logger;
        }

        public async Task<Motorista?> GetByIdAsync(Guid id)
        {
            return await _context.Motoristas.FindAsync(id);
        }

        public async Task<Motorista?> GetByEmailAsync(string email)
        {
            return await _context.Motoristas.FirstOrDefaultAsync(m => m.Email == email);
        }

        public async Task AddAsync(Motorista motorista)
        {
            await _context.Motoristas.AddAsync(motorista);
            await _context.SaveChangesAsync();
        }

        public async Task UpdateAsync(Motorista motorista)
        {
            _context.Motoristas.Update(motorista);
            await _context.SaveChangesAsync();
        }

        public async Task DeleteAsync(Guid id)
        {
            var motorista = await _context.Motoristas.FindAsync(id);
            if (motorista != null)
            {
                _context.Motoristas.Remove(motorista);
                await _context.SaveChangesAsync();
                _logger.LogInformation("Motorista excluído: {MotoristaId}", id);
            }
        }
    }
}
