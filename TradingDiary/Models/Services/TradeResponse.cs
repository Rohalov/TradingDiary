using TradingDiary.Models.Entities;

namespace TradingDiary.Models.Services
{
    public class TradeResponse
    {
        public List<Trade> Trades { get; set; }
        public int Pages { get; set;}
        public int CurrentPage { get; set;}
    }
}
