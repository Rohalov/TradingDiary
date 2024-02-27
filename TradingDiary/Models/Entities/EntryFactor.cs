namespace TradingDiary.Models.Entities
{
    /// <summary>
    /// Сlass represents a factor that the user identified for himself
    /// before entering into the agreement
    /// </summary>
    public class EntryFactor
    {
        /// <summary>
        /// Factor identifier
        /// </summary>
        public int Id { get; set; }
        /// <summary>
        /// Name of the factor
        /// </summary>
        public string Name { get; set; }
        /// <summary>
        /// Users who use this factor
        /// </summary>
        public List<UserCard> UserCards { get; set; }
        /// <summary>
        /// Trades in which this factor is used
        /// </summary>
        public List<Trade> Trades { get; set; }
    }
}
