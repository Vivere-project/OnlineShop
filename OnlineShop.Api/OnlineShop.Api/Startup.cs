using System;
using System.IO;
using System.Reflection;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpOverrides;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.OpenApi.Models;
using OnlineShop.Application;
using OnlineShop.Application.Services;
using OnlineShop.Application.Services.Interfaces;
using OnlineShop.Domain;
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

            if (Convert.ToBoolean(Configuration["UseLocalImages"]))
            {
                var imagesPath = Path.Combine(Configuration["ImagesPath"], "Images");
                if (!Directory.Exists(imagesPath))
                    Directory.CreateDirectory(imagesPath);
                services.AddScoped<IFileService>(sp => 
                    ActivatorUtilities.CreateInstance<LocalFileService>(sp, imagesPath));
            }
            else
            {
                services.AddScoped<IFileService, RemoteFileService>();
            }

            services.AddScoped<ItemService>();
            services.AddScoped<OrderService>();
            services.AddScoped<ItemColorService>();
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
            
            app.UseForwardedHeaders(new ForwardedHeadersOptions
            {
                ForwardedHeaders = ForwardedHeaders.XForwardedFor |
                                   ForwardedHeaders.XForwardedProto
            });
            
            app.UseMiddleware<ExceptionHandlingMiddleware>(env.IsDevelopment());
            
            app.UseRouting();

            app.UseAuthorization();

            app.UseEndpoints(endpoints => { endpoints.MapControllers(); });
        }
    }
}