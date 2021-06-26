using System;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using OnlineShop.Application.Models;

namespace OnlineShop.Application
{
    public static class ImageHelpers
    {
        private static readonly string[] AvailablePhotoExtensions = {".jpg", ".jpeg", ".png", ".gif", ".bmp"};
        public static async Task<string> GenerateFileNameAndSaveFile(FileDetails image, string imagesPath)
        {
            var uniqueFileName = Guid.NewGuid() + "_" + image.Name;
            var filePath = Path.Combine(imagesPath, uniqueFileName);
            
            await using var fileStream = new FileStream(filePath, FileMode.Create);
            await fileStream.WriteAsync(image.Content);

            return uniqueFileName;
        }

        public static bool HasImageExtension(FileDetails image)
        {
            return AvailablePhotoExtensions.Contains(image.Extension);
        }

        public static void DeleteImageByName(string? imageFileName, string imagesPath)
        {
            if (string.IsNullOrEmpty(imageFileName))
                return;
            
            var filePath = Path.Combine(imagesPath, imageFileName);
            File.Delete(filePath);
        }
    }
}