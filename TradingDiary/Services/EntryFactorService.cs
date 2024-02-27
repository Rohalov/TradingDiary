using Microsoft.EntityFrameworkCore;
using TradingDiary.Data;
using TradingDiary.Models.DTO;
using TradingDiary.Models.Entities;

namespace TradingDiary.Services
{
    public class EntryFactorService : IEntryFactorService
    {
        private ApplicationDbContext _context;

        public EntryFactorService(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<List<EntryFactor>> GetAllUserEntryFactors(int userId)
        {
            var userCard = await _context.Users
                .Select(x => x.UserCard)
                .Where(x => x.UserId == userId)
                .FirstOrDefaultAsync();
            if (userCard == null)
            {
                return null;
            }
            var entryFactors = await _context.UserCards
                .Where(u => u.Id == userCard.Id)
                .Include(u => u.Factors)
                .Select(e => e.Factors)
                .SingleOrDefaultAsync();
            return entryFactors;
        }

        public async Task<EntryFactor> AddEntryFactor(int userId, EntryFactorDTO newEntryFactor)
        {
            var entryFactor = await _context.EntryFactors
                .Include(e => e.UserCards)
                .Where(e => e.Name == newEntryFactor.Name)
                .FirstOrDefaultAsync();

            var userCard = await _context.UserCards
                .Where(u => u.UserId == userId)
                .FirstOrDefaultAsync();

            if (entryFactor == null)
            {
                entryFactor = new EntryFactor
                {
                    Name = newEntryFactor.Name,
                    UserCards = new List<UserCard> { userCard }
                };
                await _context.EntryFactors.AddAsync(entryFactor);
            }
            else
            {
                entryFactor.UserCards.Add(userCard);
            }
            await _context.SaveChangesAsync();
            return entryFactor;
        }

        public async Task<EntryFactor> DeleteEntryFactor(int userId, int factorId)
        {
            var entryFactor = await _context.EntryFactors
                .Include(x => x.UserCards)
                .Where(e => e.Id == factorId)
                .FirstOrDefaultAsync();

            if (entryFactor == null)
            {
                return null;
            }

            if (entryFactor.UserCards.Count == 1)
            {
                _context.EntryFactors.Remove(entryFactor);
            }
            else
            {
                var userCard = _context.UserCards.Where(u => u.UserId == userId).FirstOrDefault();
                entryFactor.UserCards.Remove(userCard);
            }
            await _context.SaveChangesAsync();
            return entryFactor;
        }

        public async Task<EntryFactor> UpdateEntryFactor(int userId, int factorId, EntryFactorDTO updatedEntryFactor)
        {
            var entryFactor = await _context.EntryFactors
                .Include(x => x.UserCards)
                .Where(e => e.Id == factorId)
                .FirstOrDefaultAsync();

            if (entryFactor == null)
            {
                return null;
            }

            if (entryFactor.UserCards.Count == 1)
            {
                entryFactor.Name = updatedEntryFactor.Name;
            }
            else
            {
                var userCard = _context.UserCards.Where(u => u.UserId == userId).FirstOrDefault();
                entryFactor.UserCards.Remove(userCard);
                await AddEntryFactor(userId, updatedEntryFactor);
            }
            await _context.SaveChangesAsync();
            return entryFactor;
        }
    }
}
