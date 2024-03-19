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
            trades.ForEach(t =>
            {
                t.UserCard = null;
                t.EntryFactors.ForEach(f => f.Trades = null);
            });
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
    }
}
