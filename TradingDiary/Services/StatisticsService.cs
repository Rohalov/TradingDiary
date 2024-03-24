using Microsoft.EntityFrameworkCore;
using TradingDiary.Data;
using TradingDiary.Models.Entities;
using TradingDiary.Models.Services;

namespace TradingDiary.Services
{
    public class StatisticsService : IStatisticsService
    {
        private ApplicationDbContext _context;

        public StatisticsService(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<StatisticModel> GetStatisticsForWeek(int userId)
        {
            var today = DateTime.Today;

            var from = today.AddDays(DayOfWeek.Monday - today.DayOfWeek);

            var result = await GetCustomStatistics(userId, from, today);
            return result;
        }

        public async Task<StatisticModel> GetStatisticsForMonth(int userId)
        {
            var today = DateTime.Today;

            var from = today.AddDays(-today.Day + 1);

            var result = await GetCustomStatistics(userId, from, today);
            return result;
        }

        public async Task<StatisticModel> GetStatisticsAllTime(int userId)
        {
            var from = DateTime.MinValue;
            var today = DateTime.Today;
            
            var result = await GetCustomStatistics(userId, from, today);
            return result;
        }

        public async Task<StatisticModel> GetCustomStatistics(int userId, DateTime from, DateTime to)
        {
            var userCard = await _context.UserCards
                .Where(u => u.UserId == userId).FirstOrDefaultAsync();

            if (userCard == null)
            {
                return null;
            }
            var trades = await _context.Trades.Include(t => t.EntryFactors)
                .Where(t => t.UserCardId == userCard.Id)
                .Where(t => t.Date >= from && t.Date <= to)
                .ToListAsync();

            var profitTrades = trades.Where(t => t.Result == ResultEnum.Profit).Count();
            var lossTrades = trades.Where(t => t.Result == ResultEnum.Loss).Count();
            var pl = trades.Select(t => t.ProfitLoss).Average();
            var bestTrade = trades.Where(t => t.ProfitLoss == trades.Select(t => t.ProfitLoss).Max()).FirstOrDefault();
            var worstTrade = trades.Where(t => t.ProfitLoss == trades.Select(t => t.ProfitLoss).Min()).FirstOrDefault();
            var avgRR = trades.Select(t => t.RiskReward).Average();
            var avgRisk = trades.Select(t => t.RiskPercent).Average();
            var pairs = trades.GroupBy(t => t.Pair).Select(t => new
            {
                key = t.Key,
                avg = trades.Where(x => x.Pair == t.Key).Select(x => x.ProfitLoss).Average()
            });
            var bestp = pairs.Where(x => x.avg == pairs.Select(x => x.avg).Max()).ToList().Select(t => t.key).FirstOrDefault();
            var worstp = pairs.Where(x => x.avg == pairs.Select(x => x.avg).Min()).ToList().Select(t => t.key).FirstOrDefault();

            var result = new StatisticModel
            {
                From = from,
                To = to,
                Total = trades.Count,
                Profit = profitTrades,
                Loss = lossTrades,
                //convert in percentage
                ProfitLoss = Math.Round(pl, 3),
                BestTrade = bestTrade,
                WorstTrade = worstTrade,
                AvgRiskReward = Math.Round(avgRR, 3),
                AvgRisk = Math.Round(avgRisk, 3),
                BestTradingPair = bestp,
                WorstTradingPair = worstp
            };
            return result;
        }
    }
}
