namespace TradingDiary.Models.Entities
{
    public class UserCard
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public ApplicationUser User { get; set; }
        public List<Trade> Trades { get; set; }
        public List<EntryFactor> Factors { get; set; }
    }
}
