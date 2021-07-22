using System.ComponentModel.DataAnnotations;
using OnlineShop.Domain;

namespace OnlineShop.Api.ViewModels.ItemViewModels
{
    public class ItemResponse
    {
        public int Id { get; set; }
        public string Name { get; set; }
        
        public string Description { get; set; }
        
        public bool HasPhoto { get; set; }
        
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
                HasPhoto = !string.IsNullOrWhiteSpace(item.ImageFileName),
                Price = item.Price,
                MinimalBuyQuantity = item.MinimalBuyQuantity,
                QuantityInStock = item.QuantityInStock
            };
        }
    }
}