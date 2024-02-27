using Microsoft.AspNetCore.Identity;

namespace TradingDiary.Models.Entities
{
    public class ApplicationRole : IdentityRole<int>
    {
        public virtual List<ApplicationUserRole> UserRoles { get; set; }
    }
}
