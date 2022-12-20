using CurrencyBank.Context;
using CurrencyBank.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace CurrencyBank.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class AdminController : Controller
    {
        private readonly AppDbContext _AuthContext;
        public AdminController(AppDbContext appDbContext)
        {
            _AuthContext = appDbContext;
        }

        [HttpGet("")]
        public async Task<IActionResult> Admin(string userName)
        {
            var admin = await _AuthContext.Users.FirstOrDefaultAsync(u => u.UserName == userName);
            if (admin == null)
            {
                return BadRequest(new
                {
                    Message = "Admin can not find!!!"
                });
            }

            return Ok(new
            {
                Text = $"{admin.UserName}"
            });
        }

        [HttpPost("search-and-get-user")]
        public async Task<IActionResult> SearchandGetUser([FromBody] User userObj)
        {
            var user = await _AuthContext.Users.FirstOrDefaultAsync(u=>u.UserName==userObj.UserName);
            if (user == null)
            {
                return BadRequest(new
                {
                    Message = "User can not find!!!"
                });
            }

            return Ok(new {
                message = "User find",
                Text = $"{user.FirstName} {user.LastName} {user.UserName} {user.Role}"
            });
        }

        [HttpPost("change-role")]
        public async Task<IActionResult> ChangeRole([FromBody] User userObj)
        {
            var user = await _AuthContext.Users.FirstOrDefaultAsync(u => u.UserName == userObj.UserName);
            if (user == null)
            {
                return BadRequest(new
                {
                    Message = "User can not find!!!"
                });
            }

            user.Role= userObj.Role;
            await _AuthContext.SaveChangesAsync();

            return Ok(new
            {
                message = "User's role changed"
            });
        }
    }
}
