using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using TradingDiary.Models.Entities;

namespace TradingDiary.Data.Configurations
{
    public class UserEntityTypeConfiguration : IEntityTypeConfiguration<ApplicationUser>
    {
        public void Configure(EntityTypeBuilder<ApplicationUser> builder)
        {
            builder
                .ToTable("Users");

            builder
                .HasKey(x => x.Id);

            builder
                .Property(x => x.Id)
                .HasColumnName("UserId")
                .IsRequired();

            builder
                .Property(x => x.UserName)
                .HasMaxLength(150)
                .IsRequired()
                .IsUnicode();

            builder
                .Property(x => x.Email)
                .HasMaxLength(250)
                .IsUnicode();

            builder
                .Property(x => x.NormalizedUserName)
                .HasMaxLength(150);

            builder
                .HasMany(u => u.UserRoles)
                .WithOne(ur => ur.User)
                .HasForeignKey(ur => ur.UserId)
                .IsRequired();

            builder
                .HasOne(u => u.UserCard)
                .WithOne(p => p.User)
                .HasForeignKey<UserCard>(p => p.UserId)
                .IsRequired();
        }
    }
}
