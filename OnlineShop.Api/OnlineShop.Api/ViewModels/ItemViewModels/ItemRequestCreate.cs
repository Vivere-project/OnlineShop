using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.Drawing;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using OnlineShop.Api.Extensions;
using OnlineShop.Api.ViewModels.ItemColorViewModels;
using OnlineShop.Application.Models;
using OnlineShop.Domain;

namespace OnlineShop.Api.ViewModels.ItemViewModels
{
    public class ItemRequestCreate
    {   
        [Required]
        [StringLength(50, ErrorMessage = "{0} length must be between {2} and {1}.", MinimumLength = 1)]
        public string Name { get; set; }
        
        public string Description { get; set; }
        
        public IFormFile? Image { get; set; }

        [Range(1, 1_000_000)] 
        [DefaultValue(0)]
        public decimal Price { get; set; }

        [Range(1, 1_000_000)] 
        [DefaultValue(1)]
        public uint MinimalBuyQuantity { get; set; }

        [Range(1, 1_000_000)] 
        [DefaultValue(1)]
        public uint QuantityInStock { get; set; }
        
        [Range(1, 1_000_000)]
        public uint? Volume { get; set; }

        public int? ColorId { get; set; }

        public ItemColorViewModel? Color { get; set; }
        
        public async Task<ItemDto> ToDtoModel()
        {
            return new (
                name: Name,
                description: Description,
                imageFileDetails: await Image.ToFileDetails(),
                price: Price,
                minimalBuyQuantity: MinimalBuyQuantity,
                quantityInStock: QuantityInStock,
                volume: Volume,
                colorId: ColorId
            );
        }
    }
}