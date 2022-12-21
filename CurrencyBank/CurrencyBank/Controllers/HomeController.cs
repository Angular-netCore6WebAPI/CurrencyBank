using CurrencyBank.Context;
using CurrencyBank.Helpers;
using Microsoft.AspNetCore.Mvc;

namespace CurrencyBank.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class HomeController : Controller
    {
        private readonly AppDbContext _AuthContext;
        public HomeController(AppDbContext appDbContext)
        {
            _AuthContext = appDbContext;
        }

        [HttpGet("")]
        public async Task<IActionResult> Home()
        {
            await GetCurrencyAPI.AddDB(_AuthContext, GetCurrencyAPI.GetDollar());
            await GetCurrencyAPI.AddDB(_AuthContext, GetCurrencyAPI.GetEuro());
            await GetCurrencyAPI.AddDB(_AuthContext, GetCurrencyAPI.GetSterling());
            await GetCurrencyAPI.AddDB(_AuthContext, GetCurrencyAPI.GetSwissFrank());
            return Ok();
        }
    }
}
