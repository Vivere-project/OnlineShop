using System.ComponentModel.DataAnnotations;

namespace OnlineShop.Domain
{
    public class ItemColor
    {
        public int Id { get; set; }

        [Required]
        [StringLength(50)]
        public string Name { get; set; }

        public string ColorHex { get; set; }
    }
}