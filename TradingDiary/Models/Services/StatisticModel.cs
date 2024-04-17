using TradingDiary.Models.Entities;

namespace TradingDiary.Models.Services
{
    public class StatisticModel
    {
        public DateTime From { get; set; }
        public DateTime To { get; set; }
        public int Total { get; set; }
        public int Profit { get; set; }
        public int Loss { get; set; }
        public decimal ProfitLoss { get; set; }
        public Trade BestTrade { get; set; }
        public Trade WorstTrade { get; set; }
        public decimal AvgRiskReward { get; set; }
        public decimal AvgRisk { get; set; }
    }
}
