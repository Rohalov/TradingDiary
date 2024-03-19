using TradingDiary.Models.Entities;

namespace TradingDiary.Services.Exchanges
{
    public interface IExchange
    {
        Task<List<TradingPair>> GetPairs();
    }
}
