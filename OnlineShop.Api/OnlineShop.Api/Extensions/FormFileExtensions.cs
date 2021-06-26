using System.IO;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using OnlineShop.Application.Models;

namespace OnlineShop.Api.Extensions
{
    public static class FormFileExtensions
    {
        public static async Task<FileDetails?> ToFileDetails(this IFormFile formFile)
        {
            if (formFile == null) return null;
            var extension = Path.GetExtension(formFile.FileName);
            var fileNameWithoutExtension = Path.GetFileName(formFile.FileName); //Todo: not sure if its needed
            if (string.IsNullOrEmpty(fileNameWithoutExtension))
                return null; // todo: add exception
            return new FileDetails
            (
                name: fileNameWithoutExtension,
                extension: extension,
                content: await formFile.ToByteArray()
            );
        }

        private static async Task<byte[]> ToByteArray(this IFormFile formFile)
        {
            await using var memoryStream = new MemoryStream();
            await formFile.CopyToAsync(memoryStream);
            return memoryStream.ToArray();
        }
    }
}