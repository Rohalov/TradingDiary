using TradingDiary.Models.Entities;

namespace TradingDiary.Models.DTO
{
    public class TradeDTO
    {
        public string Pair { get; set; }
        public DirectionEnum Direction { get; set; }
        public List<string> EntryFactors { get; set; }
        public DateTimeOffset Date { get; set; }
        public decimal RiskReward { get; set; }
        public decimal RiskPercent { get; set; }
        public ResultEnum Result { get; set; }
        public decimal ProfitLoss {  get; set; }
    }
}
