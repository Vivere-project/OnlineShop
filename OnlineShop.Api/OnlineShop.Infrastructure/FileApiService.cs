using System.Net;
using OnlineShop.Application.Models;
using OnlineShop.Application.Services.Interfaces;

namespace OnlineShop.Infrastructure
{
    public class FileApiService: IFileService
    {
        private readonly HttpClient httpClient = new ();
        public FileApiService()
        {
            httpClient.BaseAddress = new Uri("http://161.35.208.211/api/file/");
        }
        
        public async Task<Stream> GetFile(string name)
        {
            var response = await httpClient.GetAsync(name);
            if (response.StatusCode == HttpStatusCode.OK)
                return await response.Content.ReadAsStreamAsync();

            throw new FileNotFoundException(name);
        }

        public async Task CreateFile(FileDetails image, string name)
        {
            var formData = new MultipartFormDataContent();
            formData.Add(new StreamContent(new MemoryStream(image.Content)), "file", "file");
            var request = new HttpRequestMessage(HttpMethod.Post, "http://161.35.208.211/api/file/" + name)
            {
                Content = formData
            };
            request.Headers.Add("accept", "image/jpg");

            var response = await httpClient.SendAsync(request);
            
            if (response.StatusCode != HttpStatusCode.Created)
                throw new Exception(response.ReasonPhrase);
        }

        public async Task DeleteFile(string name)
        {
            var response = await httpClient.DeleteAsync(name);
            // if (response.StatusCode != HttpStatusCode.OK)
            //     throw new Exception(response.ReasonPhrase);
        }
    }
}