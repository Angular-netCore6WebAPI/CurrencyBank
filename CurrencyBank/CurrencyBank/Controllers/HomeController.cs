using CurrencyBank.Context;
using CurrencyBank.Helpers;
using CurrencyBank.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace CurrencyBank.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class HomeController : Controller
    {
        private readonly AppDbContext _HomeContext;
        public HomeController(AppDbContext appDbContext)
        {
            _HomeContext = appDbContext;
        }

        [HttpGet("")]
        public async Task<IActionResult> AddCurrenciestoDBAndReturnDollar(string Username)
        {
            await GetCurrency.AddDB(_HomeContext, GetCurrency.GetDollar());
            await GetCurrency.AddDB(_HomeContext, GetCurrency.GetEuro());
            await GetCurrency.AddDB(_HomeContext, GetCurrency.GetSterling());
            await GetCurrency.AddDB(_HomeContext, GetCurrency.GetSwissFrank());

            var dollar = await _HomeContext.Currencies.FirstOrDefaultAsync(c=>c.Name=="US DOLLAR");
            if (dollar == null)
            {
                return NotFound();
            }

            var User = await _HomeContext.Users.FirstOrDefaultAsync(u=>u.UserName==Username);
            if (User == null)
            {
                return NotFound();
            }

            var sumDollar = MoneyControl.ReturnMoney(_HomeContext,User.UserName, dollar.Name);

            return Ok(new
            {
                Text = $"{dollar.Purchase},{dollar.Sale},{User.Balance},{sumDollar}"
            });
        }

        [HttpPost("get-currency")]
        public async Task<IActionResult> ReturnCurrencyWithName([FromBody] UserCurrency UserCurrency)
        {
            double sumCurrency = MoneyControl.ReturnMoney(_HomeContext, UserCurrency.UserName, UserCurrency.CurrencyName);

            var currency = await _HomeContext.Currencies.FirstOrDefaultAsync(c => c.Name == UserCurrency.CurrencyName);
            if (currency == null)
            {
                return NotFound();
            }

            return Ok(new
            {
                Text = $"{currency.Purchase},{currency.Sale},{sumCurrency}"
            });
        }

        [HttpPost("purchase")]
        public async Task<IActionResult> PurchaseCurrency([FromBody] UserCurrency UserCurrency)
        {
            var currency = await _HomeContext.Currencies.FirstOrDefaultAsync(c=>c.Name==UserCurrency.CurrencyName);
            if (currency == null)
            {
                return NotFound();
            }

            var user = await _HomeContext.Users.FirstOrDefaultAsync(u=>u.UserName == UserCurrency.UserName);  
            if (user == null)
            {
                return NotFound();
            }

            if (user.Balance >= (UserCurrency.Price*UserCurrency.Amount))
            {
                user.Balance -= (UserCurrency.Price * UserCurrency.Amount);
                user.Balance = Math.Round(user.Balance, 2);
            }
            else
            {
                return BadRequest(new
                {
                    Message = "Your balance not enough to buy currency"
                });
            }

            await _HomeContext.UsersCurrencies.AddAsync(new UserCurrency(){ 
                
                UserName = user.UserName,
                CurrencyName = currency.Name,
                Amount = UserCurrency.Amount,
                Price = UserCurrency.Price,
                PurchaseDate = DateTime.Now,
                Type = UserCurrency.Type
            });           
            await _HomeContext.SaveChangesAsync();

            double sumCurrency = MoneyControl.ReturnMoney(_HomeContext, UserCurrency.UserName, UserCurrency.CurrencyName);

            var balance = Math.Round(user.Balance, 2);
            return Ok(new
            {
                message = $"You get {UserCurrency.Amount} {UserCurrency.CurrencyName}\n Your new balance is {Math.Round(user.Balance, 2)}",
                text= $"{balance},{sumCurrency}"
            });
        }

        [HttpPost("sale")]
        public async Task<IActionResult> SaleCurrency([FromBody] UserCurrency UserCurrency)
        {
            double sumCurrency= MoneyControl.ReturnMoney(_HomeContext, UserCurrency.UserName, UserCurrency.CurrencyName);
            if (sumCurrency < UserCurrency.Amount)
            {
                return BadRequest(new
                {
                    Message = "You don't have enough currency to sell"
                });
            }

            var user = await _HomeContext.Users.FirstOrDefaultAsync(u => u.UserName == UserCurrency.UserName);
            if (user == null)
            {
                return NotFound();
            }

            user.Balance += (UserCurrency.Price * UserCurrency.Amount);

            await _HomeContext.UsersCurrencies.AddAsync(new UserCurrency()
            {
                UserName = user.UserName,
                CurrencyName = UserCurrency.CurrencyName,
                Amount = UserCurrency.Amount,
                Price = UserCurrency.Price,
                PurchaseDate = DateTime.Now,
                Type = UserCurrency.Type
            });
            await _HomeContext.SaveChangesAsync();

            var balance = Math.Round(user.Balance, 2);
            double sumCurrencyAfter = MoneyControl.ReturnMoney(_HomeContext, UserCurrency.UserName, UserCurrency.CurrencyName);
            return Ok(new
            {
                message = $"You sale {UserCurrency.Amount} {UserCurrency.CurrencyName}\n Your new balance is {Math.Round(user.Balance, 2)}",
                text = $"{balance},{sumCurrencyAfter}"
            });
        }
    }
}
