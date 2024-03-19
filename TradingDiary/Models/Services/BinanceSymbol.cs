namespace TradingDiary.Models
{
    public class BinanceSymbol
    {
        public string symbol { get; set; }
        public string pair { get; set; }
        public string contractType { get; set; }
        public long deliveryDate { get; set; }
        public long onboardDate { get; set; }
        public string status { get; set; }
        public string baseAsset { get; set; }
        public string quoteAsset { get; set; }
        public string marginAsset { get; set; }
        public int pricePrecision { get; set; }
        public int quantityPrecision { get; set; }
        public int baseAssetPrecision { get; set; }
        public int quotePrecision { get; set; }
        public string underlyingType { get; set; }
        public string[] underlyingSubType { get; set; }
        public int settlePlan { get; set; }
        public string triggerProtect { get; set; }
        public object[] filters { get; set; }
        public string[] OrderType { get; set; }
        public string[] timeInForce { get; set; }
    }
}
