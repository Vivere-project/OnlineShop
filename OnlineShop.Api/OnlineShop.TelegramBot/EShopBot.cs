using System.Collections.Generic;
using OnlineShop.Domain;
using Telegram.Bot;
using Telegram.Bot.Types;

namespace OnlineShop.TelegramBot
{
    public static class EShopBot
    {
        private static readonly TelegramBotClient Bot = new ("1697116522:AAHalShSQhFWHlv72nlgbyJeETBH76oyzJc");
        private static readonly ChatId ValeriuChatId = new (308674164); 
        
        
        public static void SendItemsMessage(IEnumerable<Item> items)
        {
            // var timezone = TimeZoneInfo.FindSystemTimeZoneById("Asia/Beirut");
            // var timeStamp = TimeZoneInfo.ConvertTimeFromUtc(DateTime.UtcNow, timezone);
            // var header = $"Ordered at:{timeStamp.ToString("yyyy MM dd hh:mm:ss")}";
            // var body = string.Join('\n', items.Select(i => i.Name));
            // var mesasge = header+Environment.NewLine+body;
            // Bot.SendTextMessageAsync(ValeriuChatId, mesasge.ToString());
        }

        public static void SendTextMessage(string text)
        {
            // Bot.SendTextMessageAsync(ValeriuChatId, text);
        }
    }
}