using TradingDiary.Models.Entities;

namespace TradingDiary.Services
{
    public interface IStatisticsService
    {
        Task<TradesStatisticModel> GetStatisticsForWeek(int userId);
        Task<TradesStatisticModel> GetStatisticsForMonth(int userId);
        Task<TradesStatisticModel> GetStatisticsAllTime(int userId);
        Task<TradesStatisticModel> GetCustomStatistics(int userId, DateTimeOffset from, DateTimeOffset to);
    }
}
