using Microsoft.AspNetCore.Identity;

namespace TradingDiary.Models.Entities
{
    public class ApplicationUser : IdentityUser<int>
    {
        public List<ApplicationUserRole> UserRoles { get; set; }
        public UserCard UserCard { get; set; }
    }
}
