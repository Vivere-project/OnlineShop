using System.Collections.Generic;
using System.Linq;
using OnlineShop.Api.ViewModels.ItemViewModels;
using OnlineShop.Domain;

namespace OnlineShop.Api.ViewModels.OrderViewModels
{
    public class OrderResponseModel
    {
        public OrderResponseModel(IEnumerable<ItemResponse> items)
        {
            Items = items;
        }

        public IEnumerable<ItemResponse> Items { get; }
    }

    public static class OrderExtensions
    {
        public static OrderResponseModel ToResponseModel(this Order order)
        {
            return new(order.OrderedItems.Select(oi => oi.Item.ToResponseModel()));
        }
    }
}