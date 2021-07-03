using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http.Extensions;
using Microsoft.AspNetCore.Mvc;
using OnlineShop.Domain;

namespace OnlineShop.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class OrderController : ControllerBase
    {
        [HttpGet("id")]
        public async Task<ActionResult<Order>> GetOrderById(int id)
        {
            return Ok();
        }
        
        [HttpPost]
        public async Task<ActionResult<Order>> CreateOrder(List<Item> items)
        {
            TelegramBot.EShopBot.SendItemsMessage(items);
            var order = new Order();
            return Created($"{Request.GetDisplayUrl()}/{order.Id}", order);
        }

        [HttpPut("id")]
        public async Task<ActionResult> FinnishOrder(int id)
        {
            return Ok();
        }
    }
}