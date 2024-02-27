using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using TradingDiary.Models.Entities;

namespace TradingDiary.Data.Configurations
{
    public class TradingPairEntityTypeConfiguration : IEntityTypeConfiguration<TradingPair>
    {
        public void Configure(EntityTypeBuilder<TradingPair> builder)
        {
            builder
                .ToTable("TradingPairs");

            builder
                .HasKey(x => x.Id);

            builder
                .Property(x => x.Id)
                .IsRequired();

            builder
                .Property(x => x.Name)
                .HasMaxLength(100)
                .IsRequired();
        }
    }
}
