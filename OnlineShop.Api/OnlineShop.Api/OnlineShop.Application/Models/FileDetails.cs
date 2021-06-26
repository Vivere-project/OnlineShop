namespace OnlineShop.Application.Models
{
    public class FileDetails
    {
        public FileDetails(string name, string extension, byte[] content)
        {
            Name = name;
            Extension = extension;
            Content = content;
        }

        public string Name { get; }

        public string Extension { get; }
        
        public byte[] Content { get; }
    }
}