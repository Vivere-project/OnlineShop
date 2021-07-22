using System.IO;
using System.Threading.Tasks;
using OnlineShop.Application.Models;

namespace OnlineShop.Application.Services.Interfaces
{
    public interface IFileService
    {
        public Task<Stream> GetFile(string name);

        public Task CreateFile(FileDetails image, string name);

        public Task DeleteFile(string name);
    }
}