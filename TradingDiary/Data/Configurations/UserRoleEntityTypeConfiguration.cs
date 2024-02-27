using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using TradingDiary.Models.Entities;

namespace TradingDiary.Data.Configurations
{
    public class UserRoleEntityTypeConfiguration : IEntityTypeConfiguration<ApplicationUserRole>
    {
        public void Configure(EntityTypeBuilder<ApplicationUserRole> builder)
        {
            builder
                .ToTable("UserRoles");

            builder
                .HasKey(ur => new { ur.UserId, ur.RoleId });

            builder
                .Property(x => x.UserId)
                .IsRequired();

            builder
                .Property(x => x.RoleId)
                .IsRequired();
        }
    }
}
