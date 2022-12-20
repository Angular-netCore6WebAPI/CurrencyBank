using CurrencyBank.Context;
using CurrencyBank.Models;
using MailKit.Security;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MimeKit.Text;
using MimeKit;
using MailKit.Net.Smtp;
using CurrencyBank.Helpers;

namespace CurrencyBank.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly AppDbContext _AuthContext;
        public AuthController(AppDbContext appDbContext)
        {
            _AuthContext = appDbContext;                                            
        }

        [HttpPost("login")]
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

            return Ok(new {
                Message = $"Welcome {user.UserName}",
                Text = user.Role                
            });
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] User userObj)
        {
            if (userObj == null)
            {
                return BadRequest();
            }

            var User = await _AuthContext.Users.SingleOrDefaultAsync(u=>u.UserName==userObj.UserName);

            if (User != null)
            {
                return BadRequest( new 
                { 
                    Message = "Entered Username Already Registered" 
                });
            }

            userObj.Address = "";
            userObj.PhoneNumber = "";
            userObj.Role = "User";
            userObj.Balance = 1000;

            await _AuthContext.AddAsync(userObj);
            await _AuthContext.SaveChangesAsync();

            return Ok(new
            {
                Message = "User Registered"
            });
        }

        [HttpPost("forgot-password")]
        public async Task<IActionResult> ForgotPassword([FromBody] User userObj)
        {
            if (userObj.Email == null)
            {
                return BadRequest();
            }
            
            var User = await _AuthContext.Users.FirstOrDefaultAsync(u=>u.Email == userObj.Email);
            if (User == null)
            {
                return NotFound();
            }
            
            User.Password = PasswordGenerator.CreatePassword();   
            SendMail.Send(User.FirstName, userObj.Email, User.Password);
            await _AuthContext.SaveChangesAsync();

            return Ok(new
            {
                Message = "Password Changed"
            });
        }
    }
}
