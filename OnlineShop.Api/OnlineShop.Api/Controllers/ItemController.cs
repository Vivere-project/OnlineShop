using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Http.Extensions;
using Microsoft.AspNetCore.Mvc;
using OnlineShop.Api.Extensions;
using OnlineShop.Api.ViewModels;
using OnlineShop.Application;
using OnlineShop.Domain;

namespace OnlineShop.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ItemController : ControllerBase
    {
        private readonly ItemService itemService;
        private readonly IWebHostEnvironment hostEnvironment;

        public ItemController(ItemService itemService, IWebHostEnvironment hostEnvironment)
        {
            this.itemService = itemService;
            this.hostEnvironment = hostEnvironment;
        }
        
        [HttpGet]
        public async Task<ActionResult<List<ItemResponse>>> GetItems()
        {
            var dbItems = await itemService.GetItems();
            return Ok(dbItems.Select(i => i.ToResponseModel()));
        }
        
        [HttpGet("{id:int}")]
        public async Task<ActionResult<Item>> GetItem(int id)
        {
            var dbItem = await itemService.GetItemById(id);
            if (dbItem == null)
                return NotFound($"Item with Id = {id.ToString()} not found");
            return Ok(dbItem.ToResponseModel());
        }

        [HttpGet("image/{itemId:int}")]
        public async Task<IActionResult> DownloadImageByItemId(int itemId)
        {
            var dbItem = await itemService.GetItemById(itemId);

            if (string.IsNullOrEmpty(dbItem.ImageFileName))
                return BadRequest("This Item has no photo");
            
            var uploadFolder = Path.Combine(hostEnvironment.ContentRootPath, "Images");
            var filePath = Path.Combine(uploadFolder, dbItem.ImageFileName);
            await using var fileStream = new FileStream(filePath, FileMode.Open);

            return File(await System.IO.File.ReadAllBytesAsync(filePath), "image/jpg");
        }  

        [HttpPost]
        public async Task<ActionResult<Item>> CreateItem([FromForm] ItemRequestCreate itemRequest)
        {
            var createdDbItem = await itemService.CreateItem(await itemRequest.ToDtoModel());
            var responseItem = createdDbItem.ToResponseModel();
            return Created($"{Request.GetDisplayUrl()}/{responseItem.Id.ToString()}", responseItem);
        }

        [HttpPut("{id:int}")]
        public async Task<ActionResult<Item>> UpdateItem([FromRoute] int id, [FromBody] ItemRequestUpdate item)
        {
            var updatedDbItem = await itemService.UpdateItem(id, item.ToDbModel());
            return Ok(updatedDbItem.ToResponseModel());
        }

        [HttpPost("image/{id:int}")]
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