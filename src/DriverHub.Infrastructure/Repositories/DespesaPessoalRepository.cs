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
    public class DespesaPessoalRepository : IDespesaPessoalRepository
    {
        private readonly ApplicationDbContext _context;

        public DespesaPessoalRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<DespesaPessoal?> GetByIdAsync(Guid id)
        {
            return await _context.DespesasPessoais.FindAsync(id);
        }

        public async Task AddAsync(DespesaPessoal despesa)
        {
            await _context.DespesasPessoais.AddAsync(despesa);
            await _context.SaveChangesAsync();
        }

        public async Task UpdateAsync(DespesaPessoal despesa)
        {
            _context.DespesasPessoais.Update(despesa);
            await _context.SaveChangesAsync();
        }

        public async Task DeleteAsync(Guid id)
        {
            var despesa = await _context.DespesasPessoais.FindAsync(id);
            if (despesa != null)
            {
                _context.DespesasPessoais.Remove(despesa);
                await _context.SaveChangesAsync();
            }
        }

        public async Task<IEnumerable<DespesaPessoal>> GetByMotoristaIdAndDateRangeAsync(Guid motoristaId, DateTime startDate, DateTime endDate)
        {
            return await _context.DespesasPessoais
                                 .Where(d => d.MotoristaId == motoristaId && d.Data >= startDate && d.Data <= endDate)
                                 .ToListAsync();
        }
    }
}
