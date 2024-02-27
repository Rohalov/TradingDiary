using Microsoft.EntityFrameworkCore;
using TradingDiary.Models.Entities;

namespace TradingDiary.Data
{
    public class ApplicationDbContext : DbContext
    {
        public DbSet<ApplicationUser> Users { get; set; }

        public DbSet<ApplicationRole> Roles { get; set; }

        public DbSet<ApplicationUserRole> UserRoles { get; set; }
        
        public DbSet<UserCard> UserCards{ get; set; }

        public DbSet<Trade> Trades { get; set; }

        public DbSet<EntryFactor> EntryFactors { get; set; }

        public DbSet<TradingPair> TradingPairs { get; set; }

        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options) { }

        public ApplicationDbContext()
        {
        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            var configuration = new ConfigurationBuilder()
                .AddUserSecrets<ApplicationDbContext>()
                .Build();

            var connectionString = configuration.GetConnectionString("TradingDiaryDB");

            optionsBuilder
                .UseSqlServer(connectionString)
                .EnableDetailedErrors()
                .EnableSensitiveDataLogging()
                .LogTo(
                    Console.WriteLine,
                    new[] { DbLoggerCategory.Database.Command.Name },
                    LogLevel.Information);
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.ApplyConfigurationsFromAssembly(typeof(ApplicationDbContext).Assembly);
        }
    }
}
