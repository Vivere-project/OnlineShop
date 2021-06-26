using OnlineShop.Domain;

namespace OnlineShop.Application.Models
{
    public class ItemDto
    {
        public ItemDto(string name, string description, FileDetails? imageFileDetails, decimal price, uint minimalBuyQuantity, uint quantityInStock)
        {
            Name = name;
            Description = description;
            ImageFileDetails = imageFileDetails;
            Price = price;
            MinimalBuyQuantity = minimalBuyQuantity;
            QuantityInStock = quantityInStock;
        }

        public string Name { get; }
        
        public string Description { get; }
        
        public FileDetails? ImageFileDetails { get; }
        
        public decimal Price { get; }
        
        public uint MinimalBuyQuantity { get; }
        
        public uint QuantityInStock { get; }

        public Item ToDbItem(string? fileName)
        {
            return new()
            {
                Name = Name,
                Description = Description,
                ImageFileName = fileName,
                Price = Price,
                MinimalBuyQuantity = MinimalBuyQuantity,
                QuantityInStock = QuantityInStock
            };
        }
    }
}