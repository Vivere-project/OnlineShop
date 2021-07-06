using System;
using System.Collections.Generic;
using System.IO;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using OnlineShop.Application.Models;
using OnlineShop.Domain;
using OnlineShop.Domain.Exceptions;

namespace OnlineShop.Application.Services
{
    public class ItemService
    {
        private readonly IOnlineShopContext context;
        private readonly string imagesPath;
        private readonly ILogger logger;

        public ItemService(
            IOnlineShopContext context,
            string imagesPath,
            ILogger<ItemService> logger)
        {
            this.context = context;
            this.imagesPath = imagesPath;
            this.logger = logger;
        }
        
        public async Task<List<Item>> GetItems()
        {
            return await context.Items.ToListAsync();
        }

        public async Task<Item> GetItemById(int id)
        {
            try
            {
                return await context.Items.FirstAsync(i => i.Id == id);
            }
            catch (InvalidOperationException)
            {
                throw new ValueNotFoundException("item", id.ToString());
            }
        }

        public async Task<Item?> CreateItem(ItemDto itemDto)
        {
            string? uniqueFileName = null;
            if (itemDto.ImageFileDetails != null)
            {
                if (!ImageHelpers.HasImageExtension(itemDto.ImageFileDetails))
                    throw new WrongFileExtension(itemDto.ImageFileDetails.Extension);
                
                logger.Log(LogLevel.Information, "Creating image {ImageName}", itemDto.ImageFileDetails.Name);
                uniqueFileName = 
                    await ImageHelpers.GenerateFileNameAndSaveFile(itemDto.ImageFileDetails, imagesPath);
                logger.Log(LogLevel.Information, "Finished creating image {ImageName}", itemDto.ImageFileDetails.Name);
            }

            var insertedItem = context.Items.Add(itemDto.ToDbItem(uniqueFileName)).Entity;
            await context.SaveChangesAsync();
            return insertedItem;
        }

        public async Task<Item> UpdateItem(int id, Item item)
        {
            var itemFromDb = await context.Items.AsNoTracking().FirstOrDefaultAsync(i => i.Id == id);
            if (itemFromDb == null)
                throw new ValueNotFoundException("Item", id.ToString());

            item.Id = id;
            item.ImageFileName = itemFromDb.ImageFileName;
            var updatedItem = context.Items.Update(item).Entity;
            await context.SaveChangesAsync();

            return updatedItem;
        }

        public async Task UpdateImage(int id, FileDetails? image)
        {
            var itemFromDb = await context.Items.FirstOrDefaultAsync(i => i.Id == id);

            if (itemFromDb == null)
                throw new ValueNotFoundException("Item", id.ToString());
            if (image != null && !ImageHelpers.HasImageExtension(image))
                throw new WrongFileExtension(image.Extension);
            
            if (itemFromDb.ImageFileName != null) 
                logger.Log(LogLevel.Information, "Deleting image {ImageName}", itemFromDb.ImageFileName);
            
            ImageHelpers.DeleteImageByName(itemFromDb.ImageFileName, imagesPath);
            
            if (itemFromDb.ImageFileName != null) 
                logger.Log(LogLevel.Information, "Finished deleting image {ImageName}", itemFromDb.ImageFileName);
            
            string? uniqueFileName = null;
            if (image != null)
            {
                logger.Log(LogLevel.Information, "Creating image {ImageName}", image.Name);
                uniqueFileName = await ImageHelpers.GenerateFileNameAndSaveFile(image, imagesPath);
                logger.Log(LogLevel.Information, "Finished creating image {ImageName}", image.Name);
            }

            itemFromDb.ImageFileName = uniqueFileName;
            await context.SaveChangesAsync();
        }
        
        public async Task<Item> DeleteItem(int id)
        {
            var itemFromDb = await context.Items.FirstOrDefaultAsync(i => i.Id == id);
            if (itemFromDb == null)
                throw new ValueNotFoundException("Item", id.ToString());
            
            ImageHelpers.DeleteImageByName(itemFromDb.ImageFileName, imagesPath);
            var removedItem = context.Items.Remove(itemFromDb).Entity;

            await context.SaveChangesAsync();
            return removedItem;
        }

        public async Task<FileStream> GetImageByItemId(int itemId)
        {
            var dbItem = await GetItemById(itemId);

            if (string.IsNullOrEmpty(dbItem.ImageFileName))
                throw new ImageNotFound(dbItem.ImageFileName);

            return ImageHelpers.GetImage(dbItem.ImageFileName, imagesPath);
        }
    }
}