using TradingDiary.Models.Entities;

namespace TradingDiary.Services
{
    public interface IStatisticsService
    {
        Task<StatisticModel> GetStatisticsForWeek(int userId);
        Task<StatisticModel> GetStatisticsForMonth(int userId);
        Task<StatisticModel> GetStatisticsAllTime(int userId);
        Task<StatisticModel> GetCustomStatistics(int userId, DateTime from, DateTime to);
    }
}
