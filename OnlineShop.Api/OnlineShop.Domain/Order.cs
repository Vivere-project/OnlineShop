using System.Collections.Generic;

namespace OnlineShop.Domain
{
    public class Order
    {
        public int Id { get; set; }

        public ICollection<OrderedItem> OrderedItems { get; set; } = new List<OrderedItem>();
        
        public int StatusId { get; set; }

        public Status Status { get; set; }
    }
}