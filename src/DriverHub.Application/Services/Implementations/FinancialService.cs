using DriverHub.Application.Services;
using DriverHub.Domain.Entities;
using DriverHub.Domain.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DriverHub.Application.Services.Implementations
{
    public class FinancialService : IFinancialService
    {
        private readonly ILancamentoDiarioRepository _lancamentoDiarioRepository;
        private readonly IDespesaPessoalRepository _despesaPessoalRepository;

        public FinancialService(ILancamentoDiarioRepository lancamentoDiarioRepository, IDespesaPessoalRepository despesaPessoalRepository)
        {
            _lancamentoDiarioRepository = lancamentoDiarioRepository;
            _despesaPessoalRepository = despesaPessoalRepository;
        }

        public async Task<decimal> CalculateTotalProfitLossAsync(Guid motoristaId, DateTime startDate, DateTime endDate)
        {
            var lancamentos = await _lancamentoDiarioRepository.GetByMotoristaIdAndDateRangeAsync(motoristaId, startDate, endDate);
            var despesas = await _despesaPessoalRepository.GetByMotoristaIdAndDateRangeAsync(motoristaId, startDate, endDate);

            decimal totalReceita = lancamentos.Where(l => l.Tipo == "Receita").Sum(l => l.Valor);
            decimal totalDespesa = lancamentos.Where(l => l.Tipo == "Despesa").Sum(l => l.Valor) + despesas.Sum(d => d.Valor);

            return totalReceita - totalDespesa;
        }

        public async Task<IEnumerable<object>> GetDailySummaryAsync(Guid motoristaId, DateTime startDate, DateTime endDate)
        {
            var lancamentos = await _lancamentoDiarioRepository.GetByMotoristaIdAndDateRangeAsync(motoristaId, startDate, endDate);
            var despesas = await _despesaPessoalRepository.GetByMotoristaIdAndDateRangeAsync(motoristaId, startDate, endDate);

            var dailySummary = lancamentos.GroupBy(l => l.Data.Date)
                                        .Select(g => new
                                        {
                                            Date = g.Key,
                                            TotalReceita = g.Where(l => l.Tipo == "Receita").Sum(l => l.Valor),
                                            TotalDespesa = g.Where(l => l.Tipo == "Despesa").Sum(l => l.Valor)
                                        })
                                        .ToList();

            var dailyDespesasPessoais = despesas.GroupBy(d => d.Data.Date)
                                                .Select(g => new
                                                {
                                                    Date = g.Key,
                                                    TotalDespesaPessoal = g.Sum(d => d.Valor)
                                                })
                                                .ToList();

            var combinedSummary = dailySummary.FullOuterJoin(dailyDespesasPessoais,
                                                            ld => ld.Date,
                                                            dp => dp.Date,
                                                            (ld, dp) => new
                                                            {
                                                                Date = ld?.Date ?? dp?.Date,
                                                                Receita = ld?.TotalReceita ?? 0,
                                                                Despesa = (ld?.TotalDespesa ?? 0) + (dp?.TotalDespesaPessoal ?? 0)
                                                            })
                                                            .OrderBy(x => x.Date);

            return combinedSummary;
        }
    }

    // Helper class for FullOuterJoin - typically in a separate utility file
    public static class EnumerableExtensions
    {
        public static IEnumerable<TResult> FullOuterJoin<TOuter, TInner, TKey, TResult>(
            this IEnumerable<TOuter> outer,
            IEnumerable<TInner> inner,
            Func<TOuter, TKey> outerKeySelector,
            Func<TInner, TKey> innerKeySelector,
            Func<TOuter?, TInner?, TResult> resultSelector,
            IEqualityComparer<TKey>? comparer = null)
            where TOuter : class
            where TInner : class
        {
            comparer ??= EqualityComparer<TKey>.Default;
            var outerLookup = outer.ToLookup(outerKeySelector, comparer);
            var innerLookup = inner.ToLookup(innerKeySelector, comparer);

            var keys = new HashSet<TKey>(outerLookup.Select(p => p.Key), comparer);
            keys.UnionWith(innerLookup.Select(p => p.Key));

            foreach (var key in keys)
            {
                var outerMatches = outerLookup[key];
                var innerMatches = innerLookup[key];

                if (outerMatches.Any())
                {
                    foreach (var outerElement in outerMatches)
                    {
                        if (innerMatches.Any())
                        {
                            foreach (var innerElement in innerMatches)
                            {
                                yield return resultSelector(outerElement, innerElement);
                            }
                        }
                        else
                        {
                            yield return resultSelector(outerElement, null);
                        }
                    }
                }
                else
                {
                    foreach (var innerElement in innerMatches)
                    {
                        yield return resultSelector(null, innerElement);
                    }
                }
            }
        }
    }
}
