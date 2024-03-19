namespace TradingDiary.Models.Services
{
    public class BinanceCryptoModel
    {
        public string[] exchangeFilters { get; set; }
        public object[] rateLimits { get; set; }
        public string timezone { get; set; }
        public long serverTime { get; set; }
        public object[] assets { get; set; }
        public List<BinanceSymbol> symbols { get; set; }
    }
}
