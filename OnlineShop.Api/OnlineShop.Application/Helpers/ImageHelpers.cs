using System;
using System.Linq;
using OnlineShop.Application.Models;

namespace OnlineShop.Application
{
    public static class ImageHelpers
    {
        private static readonly string[] AvailablePhotoExtensions = {".jpg", ".jpeg", ".png", ".gif", ".bmp"};
        public static string GenerateFileName(FileDetails image)
        {
            return $"{Guid.NewGuid()}_{image.Name}";
        }

        public static bool HasImageExtension(FileDetails image)
        {
            return AvailablePhotoExtensions.Contains(image.Extension.ToLower());
        }
    }
}