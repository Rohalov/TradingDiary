namespace TradingDiary.Models.Entities
{
    /// <summary>
    /// Сlass represents a user trade agreement
    /// </summary>
    public class Trade
    {
        /// <summary>
        /// Trade identifier.
        /// </summary>
        public int Id { get; set; }
        /// <summary>
        /// Name of the trading pair 
        /// </summary>
        public string Pair { get; set; }
        /// <summary>
        /// Direction of price movement(long - up or short - down)
        /// </summary>
        public DirectionEnum Direction {  get; set; }
        /// <summary>
        /// Factors for entering into a trade
        /// </summary>
        public List<EntryFactor> EntryFactors { get; set; }
        /// <summary>
        /// Date
        /// </summary>
        public DateTimeOffset Date { get; set; }
        /// <summary>
        /// Ratio of possible profit to possible losses. Calculated before the opening of the deal
        /// </summary>
        public decimal RiskReward { get; set; }
        /// <summary>
        /// Percentage of the user's total that is allocated to the trade 
        /// </summary>
        public decimal RiskPercent { get; set; }
        /// <summary>
        /// Result of the trade
        /// </summary>
        public ResultEnum Result { get; set; }
        /// <summary>
        /// Profit or loss in percent
        /// </summary>
        public decimal ProfitLoss {  get; set; }
        /// <summary>
        /// UserCard identifier
        /// </summary>
        public int UserCardId { get; set; }
        public UserCard UserCard { get; set; }
    }
}
