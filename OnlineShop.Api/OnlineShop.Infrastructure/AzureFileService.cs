using Azure.Storage.Blobs;
using OnlineShop.Application.Models;
using OnlineShop.Application.Services.Interfaces;

namespace OnlineShop.Infrastructure;

public class AzureFileService: IFileService
{
    private readonly BlobServiceClient blobServiceClient;

    public AzureFileService(BlobServiceClient blobServiceClient)
    {
        this.blobServiceClient = blobServiceClient;
    }
    public async Task<Stream> GetFile(string name)
    {
        var response = 
            await blobServiceClient.GetBlobContainerClient("images").GetBlobClient(name).DownloadAsync();
        // TODO: Validate response
        return response.Value.Content;
    }

    public async Task CreateFile(FileDetails image, string name)
    {
        var response = 
            await blobServiceClient.GetBlobContainerClient("images")
                .GetBlobClient(name)
                .UploadAsync(new BinaryData(image.Content));
        // TODO: Throw Exception of error
    }

    public async Task DeleteFile(string name)
    {
        var response = 
            await blobServiceClient.GetBlobContainerClient("images")
                .GetBlobClient(name)
                .DeleteAsync();
        // TODO: Throw Exception of error
    }
}