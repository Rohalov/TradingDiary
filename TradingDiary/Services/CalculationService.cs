using TradingDiary.Models.Services;

namespace TradingDiary.Services
{
    public class CalculationService : ICalculationService
    {
        public decimal CountRiskReward(CounterData data)
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
           
        }
    }
}
