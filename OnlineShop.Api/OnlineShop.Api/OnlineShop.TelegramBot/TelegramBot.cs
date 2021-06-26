using System.Collections.Generic;
using System.Text;
using OnlineShop.Domain;
using Telegram.Bot;

namespace OnlineShop.TelegramBot
{
    public class TelegramBot
    {
        static TelegramBotClient bot = new TelegramBotClient("1697116522:AAHalShSQhFWHlv72nlgbyJeETBH76oyzJc");
        
        public static void SendMessage(List<Item> items)
        {
            var mesasge = new StringBuilder();
            foreach (var item in items)
            {
                mesasge.Append(item.Name);
                mesasge.Append('\n');
            }
            bot.SendTextMessageAsync(308674164, mesasge.ToString());
        }
    }
}