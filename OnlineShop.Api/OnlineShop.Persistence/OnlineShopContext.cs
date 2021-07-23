using System;
using System.Collections.Generic;
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
        
        public DbSet<Status> Statuses { get; set; }

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

            modelBuilder.Entity<Status>()
                .HasData(new List<Status>
                {
                    new()
                    {
                        Id = 1,
                        Name = "Ready"
                    },
                    new()
                    {
                        Id = 2,
                        Name = "InProgress"
                    },
                    new()
                    {
                        Id = 3,
                        Name = "Finished"
                    },
                });

            modelBuilder.Entity<Order>()
                .HasOne(s => s.Status)
                .WithMany();
        }
    }
}