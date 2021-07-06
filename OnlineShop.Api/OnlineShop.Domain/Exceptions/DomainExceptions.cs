using System;

namespace OnlineShop.Domain.Exceptions
{
    public class ValueNotFoundException: Exception
    {
        public string EntityType { get; }
        
        public string Itentifier { get; }
        
        public ValueNotFoundException(string entityType, string identifier)
            : base($"Entity {entityType} with id = {identifier} not found")
        {
            EntityType = entityType;
            Itentifier = identifier;
        }
    }

    public class ConfigurationException : Exception
    {
        public string ConfigurationField { get; }

        public ConfigurationException(string configurationField)
            : base($"{configurationField} isn't configured")
        {
            ConfigurationField = configurationField;
        }
    }

    public class WrongFileExtension : Exception
    {
        public string Extension { get; }

        public WrongFileExtension(string extension)
            : base($"Extension \"{extension}\" not supported")
        {
            Extension = extension;
        }
    }

    public class ImageNotFound : Exception
    {
        public string? ImageFullName { get; }
        
        public ImageNotFound(string? imageFullName)
        {
            ImageFullName = imageFullName;
        }
    }
}