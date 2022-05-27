using Microsoft.Extensions.Azure;
using Microsoft.Extensions.DependencyInjection;

namespace OnlineShop.Infrastructure;

public static class ConfigurationExtensions
{
    public static void ConfigureAzureClients(this IServiceCollection services, string connectionString)
    {
        services.AddAzureClients(builder =>
            builder.AddBlobServiceClient(connectionString));
    }
}