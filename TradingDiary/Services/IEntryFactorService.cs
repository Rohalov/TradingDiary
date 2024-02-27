using TradingDiary.Models.DTO;
using TradingDiary.Models.Entities;

namespace TradingDiary.Services
{
    public interface IEntryFactorService
    {
        Task<List<EntryFactor>> GetAllUserEntryFactors(int userId);
        Task<EntryFactor> AddEntryFactor(int userId, EntryFactorDTO newEntryFactor);
        Task<EntryFactor> UpdateEntryFactor(int userId, int factorId, EntryFactorDTO entryFactor);
        Task<EntryFactor> DeleteEntryFactor(int userId, int factorId);
    }
}
