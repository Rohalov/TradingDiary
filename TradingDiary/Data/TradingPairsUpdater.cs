using Microsoft.EntityFrameworkCore;
using System.Threading;
using TradingDiary.Models.Entities;
using TradingDiary.Services.Exchanges;

namespace TradingDiary.Data
{
    public class TradingPairsUpdater
    {
        private ApplicationDbContext _context;
        private CancellationTokenSource _cancellationTokenSource;

        public TradingPairsUpdater(ApplicationDbContext context)
        {
            _context = context;
            _cancellationTokenSource = new CancellationTokenSource();
        }

        public void Start()
        {
            Task.Run(async () => await UpdateAsync(_cancellationTokenSource.Token));
        }

        public void Stop()
        {
            _cancellationTokenSource?.Cancel();
        }


        public async Task UpdateAsync(CancellationToken cancellationToken)
        {
            var binance = new Binance();
            while (!cancellationToken.IsCancellationRequested)
            {
                var pairs = await binance.GetPairs();
                var allData = await _context.TradingPairs.ToListAsync();

                await AddDifference(pairs, allData);
                RemoveDifference(allData, pairs);

                await Task.Delay(TimeSpan.FromDays(1), cancellationToken);
            }
        }

        private async Task AddDifference(List<TradingPair> allData, List<TradingPair> pairs)
        {
            var newPairs = allData.Select(x => x.Name)
                .Except(pairs.Select(x => x.Name)).ToList();
            List<TradingPair> needAdd = new List<TradingPair>();
            foreach (var pair in newPairs)
            {
                needAdd.Add(new TradingPair { Name = pair });
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
    }
}
