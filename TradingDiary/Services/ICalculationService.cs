using TradingDiary.Models.Entities;

namespace TradingDiary.Services
{
    public interface ICalculationService
    {
        Task<decimal> CountRiskReward(CounterData data);
    }
}
