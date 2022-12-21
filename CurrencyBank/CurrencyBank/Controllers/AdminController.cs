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

        [HttpPost("search-and-get-user")]
        public async Task<IActionResult> SearchandGetUser([FromBody] User userObj)
        {
            var user = await _AuthContext.Users.FirstOrDefaultAsync(u=>u.UserName==userObj.UserName);
            if (user == null)
            {
                return BadRequest(new
                {
                    Message = $"{userObj.UserName} can not find!!!"
                });
            }

            return Ok(new {
                message = $"{user.Role} find",
                Text = $"{user.FirstName},{user.LastName},{user.UserName},{user.Role}"
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
                    Message = $"{userObj.UserName} can not find!!!"
                });
            }

            user.Role= userObj.Role;
            await _AuthContext.SaveChangesAsync();

            return Ok(new
            {
                message = $"{user.UserName}'s role is changed to {user.Role}"
            });
        }

        [HttpPost("delete-user")]
        public async Task<IActionResult> DeleteUser([FromBody] User userObj)
        {
            var user = await _AuthContext.Users.FirstOrDefaultAsync(u => u.UserName == userObj.UserName);
            if (user == null)
            {
                return BadRequest(new
                {
                    Message = $"{userObj.UserName} can not find!!!"
                });
            }

            _AuthContext.Users.Remove(user);
            await _AuthContext.SaveChangesAsync();

            return Ok(new
            {
                message = $"{userObj.UserName} succesfully deleted"
            });
        }
    }
}
