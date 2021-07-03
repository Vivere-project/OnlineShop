using System.Collections.Generic;
using System.Text;
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
            var mesasge = new StringBuilder();
            foreach (var item in items)
            {
                mesasge.Append(item.Name);
                mesasge.Append('\n');
            }
            Bot.SendTextMessageAsync(ValeriuChatId, mesasge.ToString());
        }

        public static void SendTextMessage(string text)
        {
            Bot.SendTextMessageAsync(ValeriuChatId, text);
        }
    }
}