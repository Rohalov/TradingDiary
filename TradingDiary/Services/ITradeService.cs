using TradingDiary.Models.DTO;
using TradingDiary.Models.Entities;
using TradingDiary.Models.Services;

namespace TradingDiary.Services
{
    public interface ITradeService
    {
        Task<TradeResponse> GetUserTrades(int userId, int page);
        Task<Trade> AddTrade(int userId, TradeDTO newTrade);
        Task<Trade> UpdateTrade(int id , TradeDTO updatedTrade);
        Task<Trade> DeleteTrade(int id);
    }
}
