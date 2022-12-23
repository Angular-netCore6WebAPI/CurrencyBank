using CurrencyBank.Context;
using CurrencyBank.Models;
using Microsoft.EntityFrameworkCore;
using System.Reflection.Metadata.Ecma335;

namespace CurrencyBank.Helpers
{
    public class MoneyControl
    {
        public static double ReturnMoney(AppDbContext appDbContext, string userName, string currencyName)
        {
            double sumCurrency = 0;
            var userCurrency = appDbContext.UsersCurrencies.Where(uc => uc.CurrencyName == currencyName && uc.UserName == userName).ToList();
            if (userCurrency != null)
            {
                userCurrency.ForEach(uc =>
                {
                    if (uc.Type == "Purchase")
                    {
                        sumCurrency += uc.Amount;
                    }
                    else
                    {
                        sumCurrency -= uc.Amount;
                    }
                });
            }
            return sumCurrency;
        }
    }
}
