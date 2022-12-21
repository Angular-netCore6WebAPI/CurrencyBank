using CurrencyBank.Context;
using CurrencyBank.Models;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System.Globalization;
using System.Net;

namespace CurrencyBank.Helpers
{
    public class GetCurrencyAPI
    {          
        public static CurrencyAPI GetDollar()
        {                 
            CurrencyAPI dollar = JsonConvert.DeserializeObject<CurrencyAPI>(GetData(0).ToString());
            return dollar;           
        }

        public static CurrencyAPI GetEuro()
        {                                             
            CurrencyAPI euro = JsonConvert.DeserializeObject<CurrencyAPI>(GetData(3).ToString());
            return euro;
        }
        public static CurrencyAPI GetSterling()
        {
            CurrencyAPI sterling = JsonConvert.DeserializeObject<CurrencyAPI>(GetData(4).ToString());
            return sterling;
        }
        public static CurrencyAPI GetSwissFrank()
        {            
            CurrencyAPI frank = JsonConvert.DeserializeObject<CurrencyAPI>(GetData(5).ToString());
            return frank;
        }
        static JToken GetData(int count)
        {
            WebClient client = new();
            var response = client.DownloadString("http://hasanadiguzel.com.tr/api/kurgetir");
            JObject jsonData = JObject.Parse(response);
            var data = jsonData.SelectToken("TCMB_AnlikKurBilgileri");
            return data[count];
        }
        public static async Task AddDB(AppDbContext appDbContext, CurrencyAPI currency)
        {
            var Dbcurrency = await appDbContext.Currencies.FirstOrDefaultAsync(c => c.Name == currency.CurrencyName);

            var buying=double.Parse(currency.ForexBuying, CultureInfo.InvariantCulture);
            var selling= double.Parse(currency.ForexSelling, CultureInfo.InvariantCulture);

            if (Dbcurrency == null)
            {
                await appDbContext.Currencies.AddAsync(new Currency
                {
                    Name = currency.CurrencyName,
                    Purchase = buying,
                    Sale = selling
                });
            }
            else
            {
                Dbcurrency.Purchase = buying;
                Dbcurrency.Sale = selling;                  
            }
            await appDbContext.SaveChangesAsync();
        }
    }
}
