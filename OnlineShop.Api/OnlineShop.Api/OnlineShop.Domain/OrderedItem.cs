using System.ComponentModel.DataAnnotations;

namespace OnlineShop.Domain
{
    public class OrderedItem
    {
        public int ItemId { get; set; }

        public Item Item { get; set; }

        public int OrderId { get; set; }

        public Order Order { get; set; }

        [Range(1, 1_000_000)]
        public uint BuyQuantity { get; set; }
    }
}