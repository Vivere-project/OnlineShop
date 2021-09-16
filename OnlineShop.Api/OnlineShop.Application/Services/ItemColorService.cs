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
    public class ItemColorService
    {
        private readonly IOnlineShopContext context;
        
        public ItemColorService(IOnlineShopContext context)
        {
            this.context = context;
        }
        
        public async Task<List<ItemColor>> GetItemColors()
        {
            return await context.ItemColors.ToListAsync();
        }

        public async Task<ItemColor> GetItemColorById(int id)
        {
            try
            {
                return await context.ItemColors.FirstAsync(i => i.Id == id);
            }
            catch (InvalidOperationException)
            {
                throw new ValueNotFoundException("itemColor", id.ToString());
            }
        }

        public async Task<ItemColor> CreateItemColor(ItemColor itemColor)
        {
            var insertedItemColor = context.ItemColors.Add(itemColor).Entity;
            await context.SaveChangesAsync();
            return insertedItemColor;
        }

        public async Task<ItemColor> UpdateItemColor(int id, ItemColor itemColor)
        {
            var itemColorFromDb = await context.ItemColors.AsNoTracking().FirstOrDefaultAsync(i => i.Id == id);
            if (itemColorFromDb == null)
                throw new ValueNotFoundException("ItemColor", id.ToString());

            itemColor.Id = id;

            var updatedItemColor = context.ItemColors.Update(itemColor).Entity;
            await context.SaveChangesAsync();

            return updatedItemColor;
        }

        public async Task<ItemColor> DeleteItemColor(int id)
        {
            var itemColorFromDb = await context.ItemColors.FirstOrDefaultAsync(i => i.Id == id);
            if (itemColorFromDb == null)
                throw new ValueNotFoundException("ItemColor", id.ToString());
            var removedItemColor = context.ItemColors.Remove(itemColorFromDb).Entity;
            await context.SaveChangesAsync();
            return removedItemColor;
        }
    }
}