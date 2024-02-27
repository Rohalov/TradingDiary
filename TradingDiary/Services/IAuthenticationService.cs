using TradingDiary.Models.DTO;
using TradingDiary.Models.Entities;

namespace TradingDiary.Services
{
    public interface IAuthenticationService
    {
        Task<string> Login(UserDTO user);
        Task<ApplicationUser> Register(RegisterRequest request);
    }
}
