using System.IO;
using System.Threading.Tasks;
using OnlineShop.Application.Models;
using OnlineShop.Application.Services.Interfaces;
using OnlineShop.Domain.Exceptions;

namespace OnlineShop.Application.Services
{
    public class LocalFileService: IFileService
    {
        private readonly string imagesPath;

        public LocalFileService(string imagesPath)
        {
            this.imagesPath = imagesPath;
        }
        
        public async Task<Stream> GetFile(string name)
        {
            var filePath = Path.Combine(imagesPath, name);
            try
            {
                return new FileStream(
                    filePath, 
                    FileMode.Open,
                    FileAccess.Read,
                    FileShare.Read,
                    4096 /*default*/,
                    true);
            }
            catch
            {
                throw new ImageNotFoundException(filePath);
            }
        }

        public async Task CreateFile(FileDetails image, string name)
        {
            var filePath = Path.Combine(imagesPath, name);
            
            await using var fileStream = new FileStream(filePath, FileMode.Create);
            await fileStream.WriteAsync(image.Content);
        }

        public Task DeleteFile(string name)
        {
            if (string.IsNullOrEmpty(name))
                return Task.CompletedTask;
            
            var filePath = Path.Combine(imagesPath, name);
            File.Delete(filePath);
            return Task.CompletedTask;
        }
    }
}