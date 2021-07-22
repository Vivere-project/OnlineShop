using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http.Extensions;
using Microsoft.AspNetCore.Mvc;
using OnlineShop.Api.ViewModels.OrderViewModels;
using OnlineShop.Application;
using OnlineShop.Domain;

namespace OnlineShop.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class OrderController : ControllerBase
    {
        private readonly OrderService orderService;

        public OrderController(OrderService orderService)
        {
            this.orderService = orderService;
        }
        
        [HttpGet("{id:int}")]
        public async Task<ActionResult<Order>> GetOrderById(int id)
        {
            var order = await orderService.GetOrderById(id);
            return Ok(order.ToResponseModel());
        }
        
        [HttpPost]
        public async Task<ActionResult<Order>> CreateOrder(List<Item> items)
        {
            TelegramBot.EShopBot.SendItemsMessage(items);
            var order = await orderService.CreateOrder(items);
            return Created($"{Request.GetDisplayUrl()}/{order.Id}", order);
        }

        [HttpPut("{id:int}/status/{statusId:int}")]
        public async Task<ActionResult> ChangeStatus(int id, int statusId)
        {
            await orderService.ChangeStatus(id, statusId);
            return Ok();
        }
    }
}