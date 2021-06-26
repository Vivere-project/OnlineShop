using System;
using Microsoft.EntityFrameworkCore;
using OnlineShop.Application;
using OnlineShop.Domain;

namespace OnlineShop.Persistence
{
    public class OnlineShopContext: DbContext, IOnlineShopContext
    {
        public DbSet<Item> Items { get; set; }

        public DbSet<OrderedItem> OrderedItems { get; set; }

        public DbSet<Order> Orders { get; set; }

        public OnlineShopContext(DbContextOptions<OnlineShopContext> options) :base(options)
        { }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
            => optionsBuilder.LogTo(Console.WriteLine);
        
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<OrderedItem>()
                .HasKey(oi => new { oi.ItemId, oi.OrderId });

            modelBuilder.Entity<OrderedItem>()
                .HasOne(oi => oi.Item)
                .WithMany();
            
            modelBuilder.Entity<OrderedItem>()
                .HasOne(oi => oi.Order)
                .WithMany(o => o.OrderedItems);
        }
    }
}