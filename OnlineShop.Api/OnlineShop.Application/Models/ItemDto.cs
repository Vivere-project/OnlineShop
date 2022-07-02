using OnlineShop.Domain;

namespace OnlineShop.Application.Models
{
    public class ItemDto
    {
        public ItemDto(
            string name, 
            string? description,
            FileDetails? imageFileDetails,
            decimal? price,
            uint? minimalBuyQuantity,
            uint? quantityInStock, 
            string? volume,
            int? colorId)
        {
            Name = name;
            Description = description;
            ImageFileDetails = imageFileDetails;
            Price = price;
            MinimalBuyQuantity = minimalBuyQuantity;
            QuantityInStock = quantityInStock;
            Volume = volume;
            ColorId = colorId;
        }

        public string Name { get; }
        
        public string? Description { get; }
        
        public FileDetails? ImageFileDetails { get; }
        
        public decimal? Price { get; }
        
        public uint? MinimalBuyQuantity { get; }
        
        public uint? QuantityInStock { get; }

        public string? Volume { get; }

        public int? ColorId { get; set; }
        
        public Item ToDbItem(string? fileName)
        {
            return new()
            {
                Name = Name,
                Description = Description,
                ImageFileName = fileName,
                Price = Price,
                MinimalBuyQuantity = MinimalBuyQuantity,
                QuantityInStock = QuantityInStock,
                Volume = Volume,
                ColorId = ColorId
            };
        }
    }
}