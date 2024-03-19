using TradingDiary.Models.DTO;
using TradingDiary.Models.Entities;

namespace TradingDiary.Services
{
    public interface ITradeService
    {
        Task<List<Trade>> GetAllUserTrades(int userId);
        Task<Trade> AddTrade(int userId, TradeDTO newTrade);
        Task<Trade> UpdateTrade(int id , TradeDTO updatedTrade);
        Task<Trade> DeleteTrade(int id);
    }
}
