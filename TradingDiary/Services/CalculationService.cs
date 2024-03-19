using TradingDiary.Models.Entities;

namespace TradingDiary.Services
{
    public class CalculationService : ICalculationService
    {
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
            return Math.Round(res, 2);
        }
    }
}
