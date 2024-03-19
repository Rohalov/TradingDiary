using Newtonsoft.Json;
using TradingDiary.Models.Entities;
using TradingDiary.Models.Services;

namespace TradingDiary.Services.Exchanges
{
    public class Binance : IExchange
    {
        public async Task<List<TradingPair>> GetPairs()
        {
            List<TradingPair> pairs = new List<TradingPair>();

            using (var client = new HttpClient())
            {
                string apiUrl = "https://fapi.binance.com/fapi/v1/exchangeInfo";
                var response = await client.GetStringAsync(apiUrl);
                var data = JsonConvert.DeserializeObject<BinanceCryptoModel>(response);

                var sorted = data.symbols.OrderBy(x => x.pair).Select(x => x.pair).ToList();
                foreach (var pair in sorted)
                {
                    pairs.Add(new TradingPair { Name = pair });
                }
            }
            return pairs;
        }
    }
}
