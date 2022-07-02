using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.Drawing;
using System.Threading.Tasks;
using BrunoZell.ModelBinding;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
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
        
        public string? Description { get; set; }
        
        public decimal? Price { get; set; }

        public uint? MinimalBuyQuantity { get; set; }
        
        public uint? QuantityInStock { get; set; }

        public string? Volume { get; set; }

        public int? ColorId { get; set; }
        public ItemColorViewModel? Color { get; set; }
        
        public async Task<ItemDto> ToDtoModel(IFormFile image)
        {
            return new (
                name: Name,
                description: Description,
                imageFileDetails: await image.ToFileDetails(),
                price: Price,
                minimalBuyQuantity: MinimalBuyQuantity,
                quantityInStock: QuantityInStock,
                volume: Volume,
                colorId: ColorId
            );
        }
    }
}