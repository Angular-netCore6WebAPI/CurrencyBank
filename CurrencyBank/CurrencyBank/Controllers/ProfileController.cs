using CurrencyBank.Context;
using CurrencyBank.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Internal;

namespace CurrencyBank.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class ProfileController : Controller
    {
        
        private readonly AppDbContext _ProfileContext;
        public ProfileController(AppDbContext appDbContext)
        {
            _ProfileContext = appDbContext;
        }

        [HttpGet("")]
        public async Task<IActionResult> ProfileGet(string Username)
        {
            if (Username==null)
            {
                return NotFound(new
                {
                    message = "We couldn't access your account"
                });
            }
            var user = await _ProfileContext.Users.FirstOrDefaultAsync(u=>u.UserName==Username);
            if (user==null)
            {
                return NotFound(new
                {
                    message = $"There is no registered user that have username {Username}"
                });
            }

            return Ok(new
            {
                text = $"{user.FirstName},{user.LastName},{user.Email},{user.Password},{user.Balance},{user.Address},{user.PhoneNumber}"
            });
        }

        [HttpPost("profile")]
        public async Task<IActionResult> ProfilePost([FromBody] User User)
        {
            if (User == null)
            {
                return NotFound(new
                {
                    message = "We couldn't access your account"
                });
            }

            var user = await _ProfileContext.Users.FirstOrDefaultAsync(u => u.UserName == User.UserName);
            if (user == null)
            {
                return NotFound(new
                {
                    message = $"There is no registered user that have username {User.UserName}"
                });
            }

            if (User.Password != null || User.Password != "")
            {
                user.Password = User.Password;
            }
            if (User.Balance != 0)
            {
                user.Balance = User.Balance;
            }
            if (User.Address != "")
            {
                user.Address = User.Address;
            }
            if (User.PhoneNumber != "")
            {
                user.PhoneNumber = User.PhoneNumber;
            }

            await _ProfileContext.SaveChangesAsync();
            return Ok(new
            {
                message = "Profile updated"
            });
        }
    }
}
