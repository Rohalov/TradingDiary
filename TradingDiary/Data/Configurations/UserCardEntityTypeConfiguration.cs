using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using TradingDiary.Models.Entities;

namespace TradingDiary.Data.Configurations
{
    public class UserCardEntityTypeConfiguration : IEntityTypeConfiguration<UserCard>
    {
        public void Configure(EntityTypeBuilder<UserCard> builder)
        {
            builder
                .ToTable("UserCards");

            builder
                .HasKey(x => x.Id);

            builder
                .Property(x => x.UserId)
                .IsRequired();

            builder
                .HasMany(p => p.Trades)
                .WithOne(t => t.UserCard)
                .HasForeignKey(t => t.UserCardId);

            builder
                .HasMany(p => p.Factors)
                .WithMany(f => f.UserCards)
                .UsingEntity(pf => pf.ToTable("UserCardFactors"));
        }
    }
}
