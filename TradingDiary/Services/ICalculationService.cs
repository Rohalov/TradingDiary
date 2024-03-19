using TradingDiary.Models.Services;

namespace TradingDiary.Services
{
    public interface ICalculationService
    {
        Task<decimal> CountRiskReward(CounterData data);
    }
}
