using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using TradingDiary.Models.Entities;

namespace TradingDiary.Data.Configurations
{
    public class EntryFactorEntityTypeConfiguration : IEntityTypeConfiguration<EntryFactor>
    {
        public void Configure(EntityTypeBuilder<EntryFactor> builder)
        {
            builder
                .ToTable("EntryFactors");

            builder
                .HasKey(x => x.Id);

            builder
                .Property(x => x.Id)
                .IsRequired();

            builder
                .Property(x => x.Name)
                .HasMaxLength(256)
                .IsRequired();
        }
    }
}
