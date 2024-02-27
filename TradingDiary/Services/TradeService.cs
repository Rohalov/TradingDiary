using Microsoft.EntityFrameworkCore;
using TradingDiary.Data;
using TradingDiary.Models.DTO;
using TradingDiary.Models.Entities;

namespace TradingDiary.Services
{
    public class TradeService : ITradeService
    {
        private ApplicationDbContext _context;

        public TradeService(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<List<Trade>> GetAllUserTrades(int userId)
        {
            var userCard = await _context.UserCards
                .Where(u => u.UserId == userId).FirstOrDefaultAsync();

            if (userCard == null)
            {
                return null;
            }
            var trades = await _context.Trades.Include(t => t.EntryFactors)
                .Where(t => t.UserCardId == userCard.Id).ToListAsync();
            trades.ForEach(t => { t.UserCard = null; });
            return trades;
        }

        public async Task<Trade> AddTrade(int userId, TradeDTO newTrade)
        {
            var userCard = await _context.UserCards.Where(u => u.UserId == userId).FirstOrDefaultAsync();

            var entryFactors = await SearchFactors(newTrade.EntryFactors);

            var trade = new Trade
            {
                Pair = newTrade.Pair,
                Direction = newTrade.Direction,
                Date = newTrade.Date,
                EntryFactors = entryFactors,
                RiskReward = newTrade.RiskReward,
                RiskPercent = newTrade.RiskPercent,
                Result = newTrade.Result,
                ProfitLoss = newTrade.ProfitLoss,
                UserCardId = userCard.Id,
                UserCard = userCard
            };
            await _context.Trades.AddAsync(trade);
            await _context.SaveChangesAsync();
            return trade;
        }

        public async Task<Trade> DeleteTrade(int id)
        {
            var trade = await _context.Trades.FindAsync(id);
            if (trade == null)
            {
                return null;
            }
            _context.Trades.Remove(trade);
            await _context.SaveChangesAsync();
            return trade;
        }

        public async Task<Trade> UpdateTrade(int id, TradeDTO updatedTrade)
        {
            var trade = await _context.Trades.FindAsync(id);
            if (trade == null)
            {
                return null;
            }
            var entryFactors = await SearchFactors(updatedTrade.EntryFactors);

            trade.Pair = updatedTrade.Pair;
            trade.Direction = updatedTrade.Direction;
            trade.EntryFactors = entryFactors;
            trade.Date = updatedTrade.Date;
            trade.RiskReward = updatedTrade.RiskReward;
            trade.RiskPercent = updatedTrade.RiskPercent;
            trade.Result = updatedTrade.Result;
            trade.ProfitLoss = updatedTrade.ProfitLoss;

            await _context.SaveChangesAsync();
            return trade;
        }

        private async Task<List<EntryFactor>> SearchFactors(List<string> entryFactors)
        {
            var factorsDb = new List<EntryFactor>();
            var factor = new EntryFactor();
            foreach (var entryFactor in entryFactors)
            {
                factor = await _context.EntryFactors
                    .Where(e => e.Name == entryFactor)
                    .SingleOrDefaultAsync();

                factorsDb.Add(factor);
            }
            return factorsDb;
        }

        public async Task<decimal> CountRiskReward(CounterData data)
        {
            var res = await Task.Run(() =>
            {
                decimal rr;
                decimal ep = data.EntryPoint,
                tp = data.TakeProfit,
                sl = data.StopLoss;
                if (tp > sl)
                {
                    rr = (tp - ep) / (ep - sl);
                }
                else
                {
                    rr = (sl - ep) / (tp - sl);
                }
                return rr;
            });
            return res;
        }

        public async Task<TradesStaticticModel> GetStatictic(int userId, DateTimeOffset from, DateTimeOffset to)
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

            var result = new TradesStaticticModel
            {
                Total = trades.Count,
                Profit = profitTrades,
                Loss = lossTrades,
                ProfitLoss = pl,
                BestTrade = bestTrade,
                WorstTrade = worstTrade,
                AvgRiskReward = avgRR,
                AvgRisk = avgRisk,
                BestTradingPair = bestp,
                WorstTradingPair = worstp
            };
            return result;
        }
    }
}
