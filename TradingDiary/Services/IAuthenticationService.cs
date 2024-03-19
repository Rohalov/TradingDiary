using TradingDiary.Models.DTO;
using TradingDiary.Models.Entities;
using TradingDiary.Models.Services;

namespace TradingDiary.Services
{
    public interface IAuthenticationService
    {
        Task<string> Login(UserDTO user);
        Task<ApplicationUser> Register(RegisterRequest request);
    }
}
