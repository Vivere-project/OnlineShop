using System.ComponentModel;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using OnlineShop.Api.Extensions;
using OnlineShop.Application.Models;
using OnlineShop.Domain;
using System.ComponentModel.DataAnnotations;

namespace OnlineShop.Api.ViewModels
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

        public async Task<ItemDto> ToDtoModel()
        {
            return new (
                name: Name,
                description: Description,
                imageFileDetails: await Image.ToFileDetails(),
                price: Price,
                minimalBuyQuantity: MinimalBuyQuantity,
                quantityInStock: QuantityInStock
            );
        }
        
        public Item ToDbModel()
        {
            return new ()
            {
                Name = Name,
                Description = Description,
                Price = Price,
                MinimalBuyQuantity = MinimalBuyQuantity,
                QuantityInStock = QuantityInStock
            };
        }
    }

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

        public ItemDto ToDtoModel()
        {
            return new(
                name: Name,
                description: Description,
                imageFileDetails: null,
                price: Price,
                minimalBuyQuantity: MinimalBuyQuantity,
                quantityInStock: QuantityInStock
            );
        }
        
        public Item ToDbModel()
        {
            return new ()
            {
                Name = Name,
                Description = Description,
                Price = Price,
                MinimalBuyQuantity = MinimalBuyQuantity,
                QuantityInStock = QuantityInStock
            };
        }
    }

    public class ItemResponse
    {
        public int Id { get; set; }
        public string Name { get; set; }
        
        public string Description { get; set; }
        
        public string PhotoFilePath { get; set; }
        
        public decimal Price { get; set; }
        
        [Range(1, 1_000_000)]
        public uint MinimalBuyQuantity { get; set; }
        
        [Range(1, 1_000_000)]
        public uint QuantityInStock { get; set; }
    }
    
    public static class ItemExtensions
    {
        public static ItemResponse ToResponseModel(this Item item)
        {
            return new()
            {
                Id = item.Id,
                Name = item.Name,
                Description = item.Description,
                Price = item.Price,
                MinimalBuyQuantity = item.MinimalBuyQuantity,
                QuantityInStock = item.QuantityInStock
            };
        }
    }
}