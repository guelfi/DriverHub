using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using DriverHub.Domain.Entities;

namespace DriverHub.Application.Services
{
    public interface IFinancialService
    {
        Task<decimal> CalculateTotalProfitLossAsync(Guid motoristaId, DateTime startDate, DateTime endDate);
        Task<IEnumerable<object>> GetDailySummaryAsync(Guid motoristaId, DateTime startDate, DateTime endDate);
        // Outros métodos financeiros podem ser adicionados aqui conforme necessário
    }
}
