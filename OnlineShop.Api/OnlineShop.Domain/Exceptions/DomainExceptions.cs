using System;

namespace OnlineShop.Domain.Exceptions
{
    public class ValueNotFoundException: Exception
    {
        public ValueNotFoundException(string entityType, string id)
            : base($"Entity {entityType} with id = {id} not found")
        { }
    }

    public class ConfigurationException : Exception
    {
        public ConfigurationException(string configurationField)
            : base($"{configurationField} isn't configured")
        { }
    }

    public class WrongFileExtension : Exception
    {
        public WrongFileExtension(string extension)
            : base($"Extension \"{extension}\"not supported")
        { }
    }
}