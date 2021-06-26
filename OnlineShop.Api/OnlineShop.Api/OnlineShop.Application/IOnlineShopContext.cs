using System.Threading;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using OnlineShop.Domain;

namespace OnlineShop.Application
{
    public interface IOnlineShopContext
    {
        DbSet<Item> Items { get; set; }
        
        DbSet<OrderedItem> OrderedItems { get; set; }

        DbSet<Order> Orders { get; set; }
        
        Task<int> SaveChangesAsync(CancellationToken cancellationToken = default);
    }
}