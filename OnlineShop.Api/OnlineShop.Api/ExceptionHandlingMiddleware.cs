using System;
using System.IO;
using System.Net;
using System.Security.Authentication;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using OnlineShop.Domain.Exceptions;

namespace OnlineShop.Api
{
    public class ExceptionHandlingMiddleware
    {
        private readonly RequestDelegate next;
        private readonly bool isDevelopment;

        public ExceptionHandlingMiddleware(RequestDelegate next, bool isDevelopment)
        {
            this.next = next;
            this.isDevelopment = isDevelopment;
        }

        public async Task InvokeAsync(HttpContext context)
        {
            try
            {
                await next(context);
            } // TODO: When you add a custom exception, you can add a handler here
            catch (ConfigurationException configurationException)
            {
                await HandleConfigurationException(context, configurationException);
            }
            catch (ValueNotFoundException valueNotFoundException)
            {
                await HandleValueNotFoundException(context, valueNotFoundException);
            }
            catch (ArgumentException argumentException)
            {
                await HandleBadValueExceptionAsync(context, argumentException);
            }
            catch (AuthenticationException authenticationException)
            {
                await AuthenticationExceptionHandler(context, authenticationException);
            }
            catch (ImageNotFound imageNotFound)
            {
                await HandleFileNotFoundException(context, imageNotFound);
            }
            catch (Exception exceptionObj)
            {
                await HandleExceptionAsync(context, exceptionObj);
            }
        }

        private async Task HandleConfigurationException(HttpContext context, ConfigurationException configurationException)
        {   
            context.Response.StatusCode = (int)HttpStatusCode.InternalServerError;
            if (isDevelopment)
                await context.Response.WriteAsync(configurationException.Message);
            else
            {
                TelegramBot.EShopBot.SendTextMessage($"Configuration error occured: {configurationException.Message}");
                await context.Response.WriteAsync("Something went wrong, try again in some minutes");
            }
        }

        private static async Task HandleValueNotFoundException(HttpContext context, ValueNotFoundException valueNotFoundException)
        {
            context.Response.StatusCode = (int)HttpStatusCode.BadRequest;
            var message = string.IsNullOrEmpty(valueNotFoundException.Message)
                 ? "Item was not found"
                : valueNotFoundException.Message;
            TelegramBot.EShopBot.SendTextMessage($"Error occured: {valueNotFoundException}");
            await context.Response.WriteAsync(message);
        }

        private async Task AuthenticationExceptionHandler(HttpContext context, AuthenticationException authenticationException)
        {
            context.Response.StatusCode = (int)HttpStatusCode.BadRequest;
            var message = string.IsNullOrEmpty(authenticationException.Message)
                ? "Authentication failed"
                : authenticationException.Message;
            if (isDevelopment)
                await context.Response.WriteAsync(authenticationException.ToString());
            else
            {
                TelegramBot.EShopBot.SendTextMessage($"Error occured: {authenticationException}");
                await context.Response.WriteAsync(message);
            }
        }

        private static async Task HandleBadValueExceptionAsync(HttpContext context, ArgumentException badValueException)
        {
            context.Response.StatusCode = (int)HttpStatusCode.BadRequest;
            TelegramBot.EShopBot.SendTextMessage($"Error occured: {badValueException.Message}");
            await context.Response.WriteAsync(badValueException.Message);
        }
        
        private async Task HandleFileNotFoundException(HttpContext context, ImageNotFound imageNotFound)
        {
            context.Response.StatusCode = (int)HttpStatusCode.InternalServerError;
            if (isDevelopment)
                await context.Response.WriteAsync(imageNotFound.ImageFullName + " " +imageNotFound.ToString());
            else
            {
                TelegramBot.EShopBot.SendTextMessage($"Error occured: {imageNotFound.ImageFullName + " " + imageNotFound}");
                await context.Response.WriteAsync("Something went wrong, please try again in a few minutes");
            }
        }

        private async Task HandleExceptionAsync(HttpContext context, Exception exception)
        {
            context.Response.StatusCode = (int)HttpStatusCode.InternalServerError;
            if (isDevelopment)
                await context.Response.WriteAsync(exception.ToString());
            else
            {
                TelegramBot.EShopBot.SendTextMessage($"Error occured: {exception}");
                await context.Response.WriteAsync("Something went wrong, please try again in a few minutes");
            }
        }
    }
}