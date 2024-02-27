namespace TradingDiary.Models.Entities
{
    public class TradesStaticticModel
    {
        public int Total { get; set; }
        public int Profit { get; set; }
        public int Loss { get; set; }
        public decimal ProfitLoss { get; set; }
        public Trade BestTrade { get; set; }
        public Trade WorstTrade { get; set; }
        public decimal AvgRiskReward { get; set; }
        public decimal AvgRisk { get; set; }
        public string BestTradingPair { get; set; }
        public string WorstTradingPair { get; set; }
    }
}
