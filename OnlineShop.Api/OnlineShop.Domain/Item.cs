using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace OnlineShop.Domain
{
    public class Item
    {
        public int Id { get; set; }
        
        [Required]
        [StringLength(50)]
        public string Name { get; set; }
        
        public string Description { get; set; }
        
        public string? ImageFileName { get; set; }
        
        [Column(TypeName = "decimal(9,2)")]
        public decimal Price { get; set; }
        
        [Range(1, 1_000_000)]
        public uint MinimalBuyQuantity { get; set; }
        
        [Range(1, 1_000_000)]
        public uint QuantityInStock { get; set; }
        
        [Range(1, 1_000_000)]
        public uint? Volume { get; set; }

        public int? ColorId { get; set; }
        
        public ItemColor? Color { get; set; }
    }
}