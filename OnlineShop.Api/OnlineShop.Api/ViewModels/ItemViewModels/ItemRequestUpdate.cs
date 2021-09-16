using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using OnlineShop.Api.ViewModels.ItemColorViewModels;
using OnlineShop.Application.Models;
using OnlineShop.Domain;

namespace OnlineShop.Api.ViewModels.ItemViewModels
{
    public class ItemRequestUpdate
    {
        [Required]
        [StringLength(50, ErrorMessage = "{0} length must be between {2} and {1}.", MinimumLength = 1)]
        public string Name { get; set; }

        public string Description { get; set; }

        [Range(1, 1_000_000)]
        [DefaultValue(0)]
        public decimal Price { get; set; }

        [Range(1, 1_000_000)]
        [DefaultValue(1)]
        public uint MinimalBuyQuantity { get; set; }

        [Range(1, 1_000_000)]
        [DefaultValue(1)]
        public uint QuantityInStock { get; set; }
        
        public uint? Volume { get; set; }

        public int? ColorId { get; set; }
        
        public ItemColorViewModel? Color { get; set; }

        public Item ToDbModel()
        {
            return new ()
            {
                Name = Name,
                Description = Description,
                Price = Price,
                MinimalBuyQuantity = MinimalBuyQuantity,
                QuantityInStock = QuantityInStock,
                Volume = Volume,
                ColorId = ColorId
            };
        }
    }
}