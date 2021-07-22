using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using OnlineShop.Application.Enums;
using OnlineShop.Domain;

namespace OnlineShop.Application
{
    public class OrderService
    {
        private readonly IOnlineShopContext context;

        public OrderService(IOnlineShopContext context)
        {
            this.context = context;
        }
        
        public Task<Order> GetOrderById(int id)
        {
            return context.Orders
                .Include(o => o.OrderedItems)
                    .ThenInclude(oi => oi.Item)
                .AsNoTracking()
                .FirstAsync(o => o.Id == id);
        }

        public async Task<Order> CreateOrder(IEnumerable<Item> items)
        {
            var orderToInsert = new Order();
            orderToInsert.OrderedItems = items.Select(i => new OrderedItem{Item = i} ).ToList();
            orderToInsert = context.Orders.Add(orderToInsert).Entity;
            await context.SaveChangesAsync();
            return orderToInsert;
        }

        public async Task ChangeStatus(int id, int statusId)
        {
            var orderToChange = await context.Orders.FirstAsync(o => o.Id == id);
            // todo: validate statusId
            orderToChange.StatusId = statusId;
            await context.SaveChangesAsync();
        }
    }
}