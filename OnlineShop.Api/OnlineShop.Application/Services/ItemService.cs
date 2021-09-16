using System;
using System.Collections.Generic;
using System.IO;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using OnlineShop.Application.Models;
using OnlineShop.Application.Services.Interfaces;
using OnlineShop.Domain;
using OnlineShop.Domain.Exceptions;

namespace OnlineShop.Application.Services
{
    public class ItemService
    {
        private readonly IOnlineShopContext context;
        private readonly string imagesPath;
        private readonly ILogger logger;
        private readonly IFileService fileService;

        public ItemService(
            IOnlineShopContext context,
            ILogger<ItemService> logger,
            IFileService fileService)
        {
            this.context = context;
            this.logger = logger;
            this.fileService = fileService;
        }
        
        public async Task<List<Item>> GetItems()
        {
            return await context.Items
                .Include(i => i.Color)
                .ToListAsync();
        }

        public async Task<Item> GetItemById(int id)
        {
            try
            {
                return await context.Items
                    .Include(i => i.Color)
                    .FirstAsync(i => i.Id == id);
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
                
                uniqueFileName = ImageHelpers.GenerateFileName(itemDto.ImageFileDetails);
                await fileService.CreateFile(itemDto.ImageFileDetails, uniqueFileName);
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
            if (!string.IsNullOrWhiteSpace(itemFromDb.ImageFileName))
                await fileService.DeleteFile(itemFromDb.ImageFileName);

            string? uniqueFileName = null; // if no image was attached then, you just delete the image
            if (image != null)
            {
                uniqueFileName = ImageHelpers.GenerateFileName(image);
                await fileService.CreateFile(image, uniqueFileName);
            }

            itemFromDb.ImageFileName = uniqueFileName;
            await context.SaveChangesAsync();
        }
        
        public async Task<Item> DeleteItem(int id)
        {
            var itemFromDb = await context.Items.FirstOrDefaultAsync(i => i.Id == id);
            if (itemFromDb == null)
                throw new ValueNotFoundException("Item", id.ToString());
            
            if (!string.IsNullOrEmpty(itemFromDb.ImageFileName))
                await fileService.DeleteFile(itemFromDb.ImageFileName);
            var removedItem = context.Items.Remove(itemFromDb).Entity;

            await context.SaveChangesAsync();
            return removedItem;
        }

        public async Task<Stream> GetImageByItemId(int itemId)
        {
            var dbItem = await GetItemById(itemId);

            if (string.IsNullOrEmpty(dbItem.ImageFileName))
                throw new ImageNotFoundException(dbItem.ImageFileName);

            return await fileService.GetFile(dbItem.ImageFileName);
        }
    }
}