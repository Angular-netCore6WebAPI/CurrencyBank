using CurrencyBank.Context;
using CurrencyBank.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace CurrencyBank.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly AppDbContext _AuthContext;
        public UserController(AppDbContext appDbContext)
        {
            _AuthContext = appDbContext;                                            
        }

        [HttpPost("Login")]
        public async Task<IActionResult> Login([FromBody] User userObj)
        {
            if (userObj == null)
            {
                return BadRequest();
            }
            var user = await _AuthContext.Users.FirstOrDefaultAsync(u=>u.UserName == userObj.UserName && u.Password == userObj.Password);
            if (user == null)
            {
                return NotFound(new { Message = "User Not Found"});
            }
            return Ok(new
            {
                Message = "Login Success"
            });
        }

        [HttpPost("Register")]
        public async Task<IActionResult> Register([FromBody] User userObj)
        {
            if (userObj == null)
            {
                return BadRequest();
            }

            userObj.Role = "User";
            userObj.Balance = 1000;

            await _AuthContext.AddAsync(userObj);
            await _AuthContext.SaveChangesAsync();

            return Ok(new
            {
                Message = "User Registered"
            });
        }
    }
}
