using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using OnlineShop.Application;

namespace OnlineShop.Persistence
{
    public static class ConfigurationExtensions
    {
        public static void ConfigureDbContext(this IServiceCollection services, string connectionString)
        {
            services
                .AddDbContext<IOnlineShopContext, OnlineShopContext>(options => options
                    .UseSqlServer(connectionString, x => x.MigrationsAssembly("OnlineShop.Persistence")
                        .EnableRetryOnFailure())
                );
        }
    }
}