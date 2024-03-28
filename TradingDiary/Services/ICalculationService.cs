using TradingDiary.Models.Services;

namespace TradingDiary.Services
{
    public interface ICalculationService
    {
        decimal CountRiskReward(CounterData data);
    }
}
