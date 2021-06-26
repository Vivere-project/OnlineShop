using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using OnlineShop.Application.Models;
using OnlineShop.Domain;

namespace OnlineShop.Application
{
    public class ItemService
    {
        private readonly IOnlineShopContext context;
        private readonly string imagesPath;
        
        public ItemService(IOnlineShopContext context, string imagesPath)
        {
            this.context = context;
            this.imagesPath = imagesPath;
        }
        
        public async Task<List<Item>> GetItems()
        {
            return await context.Items.ToListAsync();
        }

        public async Task<Item?> GetItemById(int id)
        {
            return await context.Items.FirstOrDefaultAsync(i => i.Id == id);
        }

        public async Task<Item?> CreateItem(ItemDto itemDto)
        {
            string? uniqueFileName = null;
            if (itemDto.ImageFileDetails != null)
            {
                if (!ImageHelpers.HasImageExtension(itemDto.ImageFileDetails))
                    throw new Exception("Wrong file extension");
                
                uniqueFileName = 
                    await ImageHelpers.GenerateFileNameAndSaveFile(itemDto.ImageFileDetails, imagesPath);
            }

            var insertedItem = context.Items.Add(itemDto.ToDbItem(uniqueFileName)).Entity;
            await context.SaveChangesAsync();
            return insertedItem;
        }

        public async Task<Item> UpdateItem(int id, Item item)
        {
            var itemFromDb = await context.Items.AsNoTracking().FirstOrDefaultAsync(i => i.Id == id);
            if (itemFromDb == null)
                throw new Exception($"Item with id = {id} was not found");

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
                throw new Exception($"Item with id = {id} was not found");
            if (image == null || !ImageHelpers.HasImageExtension(image))
                throw new Exception("Wrong file");

            ImageHelpers.DeleteImageByName(itemFromDb.ImageFileName, imagesPath);
            var uniqueFileName = await ImageHelpers.GenerateFileNameAndSaveFile(image, imagesPath);

            itemFromDb.ImageFileName = uniqueFileName;
            await context.SaveChangesAsync();
        }
        
        public async Task<Item> DeleteItem(int id)
        {
            var itemFromDb = await context.Items.FirstOrDefaultAsync(i => i.Id == id);
            if (itemFromDb == null)
                throw new Exception($"Item with id = {id} not found");
            
            ImageHelpers.DeleteImageByName(itemFromDb.ImageFileName, imagesPath);
            var removedItem = context.Items.Remove(itemFromDb).Entity;

            await context.SaveChangesAsync();
            return removedItem;
        }
    }
}