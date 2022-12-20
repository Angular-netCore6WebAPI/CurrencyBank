using CurrencyBank.Models;
using Microsoft.EntityFrameworkCore;

namespace CurrencyBank.Context
{
    public class AppDbContext:DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {

        }

        public DbSet<User> Users { get; set; }
        public DbSet<Currency> Currencies { get; set; }
        public DbSet<UserCurrency> UsersCurrencies { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<User>().ToTable("users");
            modelBuilder.Entity<Currency>().ToTable("currencies");
            modelBuilder.Entity<UserCurrency>().ToTable("userscurrencies");
        }
    }
}
