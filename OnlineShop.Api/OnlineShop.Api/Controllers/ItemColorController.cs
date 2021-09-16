using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http.Extensions;
using Microsoft.AspNetCore.Mvc;
using OnlineShop.Api.ViewModels.ItemColorViewModels;
using OnlineShop.Application.Services;
using OnlineShop.Domain;

namespace OnlineShop.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ItemColorController : ControllerBase
    {
        private readonly ItemColorService itemColorService;

        public ItemColorController(ItemColorService itemColorService)
        {
            this.itemColorService = itemColorService;
        }
        [HttpGet]
        public async Task<ActionResult<List<ItemColor>>> GetItemColors()
        {
            var dbItemColors = await itemColorService.GetItemColors();
            return Ok(dbItemColors);
        }

        [HttpGet("{id:int}")]
        public async Task<ActionResult<ItemColor>> GetItemColor(int id)
        {
            return Ok(await itemColorService.GetItemColorById(id));
        }

        [HttpPost]
        public async Task<ActionResult<ItemColor>> CreateItemColor(ItemColor itemColor)
        {
            var createdItemColor = await itemColorService.CreateItemColor(itemColor);
            return Created($"{Request.GetDisplayUrl()}/{createdItemColor.Id}", createdItemColor);
        }

        [HttpPut("{id:int}")]
        public async Task<ActionResult<ItemColor>> UpdateItemColor([FromRoute] int id, [FromBody] ItemColorViewModel itemColor)
        {
            var updatedItemColor = await itemColorService.UpdateItemColor(id, itemColor.ToDbModel());
            return Ok(updatedItemColor);
        }

        [HttpDelete("{id:int}")]
        public async Task<ActionResult<ItemColor>> DeleteItemColor([FromRoute] int id)
        {
            var deletedItemColor = await itemColorService.DeleteItemColor(id);
            return Ok(deletedItemColor);
        }
    }
}