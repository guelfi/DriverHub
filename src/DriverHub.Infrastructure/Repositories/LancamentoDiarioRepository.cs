using DriverHub.Domain.Entities;
using DriverHub.Domain.Repositories;
using DriverHub.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DriverHub.Infrastructure.Repositories
{
    public class LancamentoDiarioRepository : ILancamentoDiarioRepository
    {
        private readonly ApplicationDbContext _context;

        public LancamentoDiarioRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<LancamentoDiario?> GetByIdAsync(Guid id)
        {
            return await _context.LancamentosDiarios.FindAsync(id);
        }

        public async Task AddAsync(LancamentoDiario lancamento)
        {
            await _context.LancamentosDiarios.AddAsync(lancamento);
            await _context.SaveChangesAsync();
        }

        public async Task UpdateAsync(LancamentoDiario lancamento)
        {
            _context.LancamentosDiarios.Update(lancamento);
            await _context.SaveChangesAsync();
        }

        public async Task DeleteAsync(Guid id)
        {
            var lancamento = await _context.LancamentosDiarios.FindAsync(id);
            if (lancamento != null)
            {
                _context.LancamentosDiarios.Remove(lancamento);
                await _context.SaveChangesAsync();
            }
        }

        public async Task<IEnumerable<LancamentoDiario>> GetByMotoristaIdAndDateRangeAsync(Guid motoristaId, DateTime startDate, DateTime endDate)
        {
            return await _context.LancamentosDiarios
                                 .Where(l => l.MotoristaId == motoristaId && l.Data >= startDate && l.Data <= endDate)
                                 .ToListAsync();
        }
    }
}
