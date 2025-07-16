using DriverHub.Domain.Entities;
using DriverHub.Domain.Repositories;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using System;
using System.Linq;
using System.Threading.Tasks;
using System.Collections.Generic;
using DriverHub.Infrastructure.Data;
using DriverHub.Application.Common;

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

        public async Task<int> GetMotoristCountAsync()
        {
            return await _context.Motoristas.CountAsync();
        }

        public async Task<(IEnumerable<Motorista> Items, int TotalCount)> GetAllAsync(int pageNumber, int pageSize)
        {
            var totalCount = await _context.Motoristas.CountAsync();
            var motoristas = await _context.Motoristas
                                        .Skip((pageNumber - 1) * pageSize)
                                        .Take(pageSize)
                                        .ToListAsync();
            return (motoristas, totalCount);
        }
    }
}