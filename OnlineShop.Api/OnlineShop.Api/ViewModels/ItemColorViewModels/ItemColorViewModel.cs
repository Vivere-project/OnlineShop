using OnlineShop.Domain;

namespace OnlineShop.Api.ViewModels.ItemColorViewModels
{
    public class ItemColorViewModel
    {
        public string Name { get; set; }

        public string ColorHex { get; set; }

        public ItemColor ToDbModel()
        {
            return new()
            {
                Name = Name,
                ColorHex = ColorHex
            };
        }
    }
}