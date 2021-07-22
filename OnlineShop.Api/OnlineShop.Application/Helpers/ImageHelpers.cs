using System;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using OnlineShop.Application.Models;
using OnlineShop.Domain.Exceptions;

namespace OnlineShop.Application
{
    public static class ImageHelpers
    {
        private static readonly string[] AvailablePhotoExtensions = {".jpg", ".jpeg", ".png", ".gif", ".bmp"};
        public static string GenerateFileName(FileDetails image)
        {
            return Guid.NewGuid() + "_" + image.Name;
        }

        public static bool HasImageExtension(FileDetails image)
        {
            return AvailablePhotoExtensions.Contains(image.Extension);
        }
    }
}