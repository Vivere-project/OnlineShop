using System.IO;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.OpenApi.Models;
using OnlineShop.Application;
using OnlineShop.Persistence;

namespace OnlineShop.Api
{
    public class Startup
    {
        public Startup(IConfiguration configuration, IWebHostEnvironment environment)
        {
            Configuration = configuration;
            Environment = environment;
        }

        public IConfiguration Configuration { get; }
        public IWebHostEnvironment Environment { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddControllers();
            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new OpenApiInfo {Title = "OnlineShop.Api", Version = "v1"});
            });

            services.ConfigureDbContext(Configuration.GetConnectionString("OnlineShop"));
            
            // Add strongly typed AppSettings
            var appSettingsSection = Configuration.GetSection("AppSettings");

            var imagesPath = Path.Combine(Environment.ContentRootPath, "Images");
            services.AddScoped(sp => 
                ActivatorUtilities.CreateInstance<ItemService>(sp, imagesPath));
            services.AddScoped<OrderService>();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
                app.UseSwagger();
                app.UseSwaggerUI(c => c.SwaggerEndpoint("/swagger/v1/swagger.json", "OnlineShop.Api v1"));
            }
            app.UseCors(
                options => options.WithOrigins("*").AllowAnyMethod()
            );
            app.UseHttpsRedirection();

            app.UseRouting();

            app.UseAuthorization();

            app.UseEndpoints(endpoints => { endpoints.MapControllers(); });
        }
    }
}