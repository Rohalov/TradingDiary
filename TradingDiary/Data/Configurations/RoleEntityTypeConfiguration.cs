using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using TradingDiary.Models.Entities;

namespace TradingDiary.Data.Configurations
{
    public class RoleEntityTypeConfiguration : IEntityTypeConfiguration<ApplicationRole>
    {
        public void Configure(EntityTypeBuilder<ApplicationRole> builder)
        {
            builder
                .ToTable("Roles");

            builder
                .HasKey(x => x.Id);

            builder
                .Property(x => x.Id)
                .HasColumnName("RoleId")
                .IsRequired();

            builder
                .Property(x => x.Name)
                .HasMaxLength(150)
                .IsRequired()
                .IsUnicode();

            builder
                .Property(x => x.NormalizedName)
                .HasMaxLength(150);

            builder
                .Property(x => x.ConcurrencyStamp)
                .IsConcurrencyToken();

            builder
                .HasMany(r => r.UserRoles)
                .WithOne(ur => ur.Role)
                .HasForeignKey(ur => ur.RoleId)
                .IsRequired();
        }
    }
}
