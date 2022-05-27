using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using BrunoZell.ModelBinding;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Http.Extensions;
using Microsoft.AspNetCore.Mvc;
using OnlineShop.Api.Extensions;
using OnlineShop.Api.ViewModels.ItemViewModels;
using OnlineShop.Application.Services;
using OnlineShop.Domain;

namespace OnlineShop.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ItemController : ControllerBase
    {
        private readonly ItemService itemService;
        private readonly ItemColorService itemColorService;
        private readonly IWebHostEnvironment hostEnvironment;

        public ItemController(ItemService itemService, ItemColorService itemColorService, IWebHostEnvironment hostEnvironment)
        {
            this.itemService = itemService;
            this.itemColorService = itemColorService;
            this.hostEnvironment = hostEnvironment;
        }
        
        [HttpGet]
        public async Task<ActionResult<List<ItemResponse>>> GetItems()
        {
            var dbItems = await itemService.GetItems();
            return Ok(dbItems.Select(i => i.ToResponseModel()));
        }
        
        [HttpGet("{id:int}")]
        public async Task<ActionResult<ItemResponse>> GetItem(int id)
        {
            var dbItem = await itemService.GetItemById(id);
            return Ok(dbItem.ToResponseModel());
        }

        [HttpGet("{itemId:int}/image")]
        public async Task<IActionResult> DownloadImageByItemId(int itemId)
        {
            var imageStream = await itemService.GetImageByItemId(itemId);
            return File(imageStream, "image/jpg");
        }  

        [HttpPost]
        public async Task<ActionResult<Item>> CreateItem(
            [ModelBinder(BinderType = typeof(JsonModelBinder))] ItemRequestCreate itemRequest,
            IFormFile image)
        {
            if (itemRequest.Color != null)
            {
                var itemColorId = (await itemColorService.CreateItemColor(itemRequest.Color?.ToDbModel())).Id;
                itemRequest.ColorId = itemColorId;
            }

            var createdDbItem = await itemService.CreateItem(await itemRequest.ToDtoModel(image));
            var responseItem = createdDbItem.ToResponseModel();
            return Created($"{Request.GetDisplayUrl()}/{responseItem.Id.ToString()}", responseItem);
        }

        [HttpPut("{id:int}")]
        public async Task<ActionResult<Item>> UpdateItem([FromRoute] int id, [FromBody] ItemRequestUpdate itemRequest)
        {
            if (itemRequest.Color != null) // TODO: Update colors instead of creating new
            {
                var itemColorId = (await itemColorService.CreateItemColor(itemRequest.Color?.ToDbModel())).Id;
                itemRequest.ColorId = itemColorId;
            }
            var updatedDbItem = await itemService.UpdateItem(id, itemRequest.ToDbModel());
            return Ok(updatedDbItem.ToResponseModel());
        }

        [HttpPost("{id:int}/image")]
        public async Task<ActionResult> UpdateFile([FromRoute] int id, [FromForm] IFormFile image)
        {
            await itemService.UpdateImage(id, await image.ToFileDetails());
            return Ok();
        }
            
        
        [HttpDelete("{id:int}")]
        public async Task<ActionResult<Item>> DeleteItem([FromRoute] int id)
        {
            var deletedDbItem = await itemService.DeleteItem(id);
            return Ok(deletedDbItem.ToResponseModel());
        }
    }
}