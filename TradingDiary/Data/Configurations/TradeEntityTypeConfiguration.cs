using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using TradingDiary.Models.Entities;

namespace TradingDiary.Data.Configurations
{
    public class TradeEntityTypeConfiguration : IEntityTypeConfiguration<Trade>
    {
        public void Configure(EntityTypeBuilder<Trade> builder)
        {
            builder
                .ToTable("Trades");

            builder
                .HasKey(x => x.Id);

            builder
                .Property(x => x.Id)
                .IsRequired();

            builder
                .Property(x => x.Pair)
                .HasMaxLength(100)
                .IsRequired();

            builder
                .Property(x => x.Direction)
                .HasConversion<string>()
                .HasMaxLength(50)
                .IsRequired();

            builder
                .Property(x => x.Date)
                .IsRequired();

            builder
                .Property(x => x.RiskReward)
                .IsRequired();

            builder
                .Property(x => x.RiskPercent)
                .IsRequired();

            builder
                .Property(x => x.Result)
                .HasConversion<string>()
                .HasMaxLength(50)
                .IsRequired();

            builder
                .HasMany(t => t.EntryFactors)
                .WithMany(ef => ef.Trades)
                .UsingEntity(te => te.ToTable("TradeEntryFactors"));
        }
    }
}
