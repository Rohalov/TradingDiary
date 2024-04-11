using Microsoft.AspNetCore.Identity;
using TradingDiary.Models.Entities;

namespace TradingDiary.Services
{
    public class PasswordHasher : IPasswordHasher<ApplicationUser>
    {
        public string HashPassword(ApplicationUser user, string password)
        {
            return BCrypt.Net.BCrypt.HashPassword(password);
        }

        public PasswordVerificationResult VerifyHashedPassword(ApplicationUser user, string hashedPassword, string providedPassword)
        {
            if (!BCrypt.Net.BCrypt.Verify(providedPassword, hashedPassword))
            {
                return PasswordVerificationResult.Failed;
            }
            return PasswordVerificationResult.Success;
        }
    }
}
