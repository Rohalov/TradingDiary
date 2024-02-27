using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using System.Linq;
using TradingDiary.Models.Entities;

namespace TradingDiary.Data
{
    public class TradingPairsUpdater
    {
        private ApplicationDbContext _context;

        public TradingPairsUpdater(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task Update()
        {
            var pairs = await GetPairs();
            var allData = await _context.TradingPairs.ToListAsync();

            await AddDifference(pairs, allData);
            RemoveDifference(allData, pairs);
        }

        private async Task AddDifference(List<TradingPair> allData, List<TradingPair> pairs)
        {
            var newPairs = allData.Select(x => x.Name)
                .Except(pairs.Select(x => x.Name)).ToList();
            List<TradingPair> needAdd = new List<TradingPair>();
            foreach (var pair in newPairs)
            {
                needAdd.Add(new TradingPair { Name = pair});
            }
            await _context.AddRangeAsync(needAdd);
            await _context.SaveChangesAsync();
        }

        private void RemoveDifference(List<TradingPair> pairs, List<TradingPair> allData)
        {
            var unnecessaryPairs = pairs.Select(x => x.Name)
                .Except(allData.Select(x => x.Name)).ToList();
            List<TradingPair> needRemove = new List<TradingPair>();
            foreach (var pair in unnecessaryPairs)
            {
                needRemove.Add(new TradingPair { Name = pair });
            }
            _context.RemoveRange(needRemove);
            _context.SaveChanges();
        }

        private async Task<List<TradingPair>> GetPairs()
        {
            List<TradingPair> pairs = new List<TradingPair>();

            using (var client = new HttpClient())
            {
                string apiUrl = "https://fapi.binance.com/fapi/v1/exchangeInfo";
                var response = await client.GetStringAsync(apiUrl);
                var data = JsonConvert.DeserializeObject<Crypto>(response);

                var sorted = data.symbols.OrderBy(x => x.pair).Select(x => x.pair).ToList();
                foreach (var pair in sorted)
                {
                    pairs.Add(new TradingPair { Name = pair});
                }
            }
            return pairs;
        }
    }

    class Crypto
    {
        public string[] exchangeFilters { get; set; }
        public object[] rateLimits { get; set; }
        public string timezone { get; set; }
        public long serverTime { get; set; }
        public object[] assets { get; set; }
        public List<Symbol> symbols { get; set; }
    }

    public class Symbol
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
