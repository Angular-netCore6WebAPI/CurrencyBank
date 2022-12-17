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

            var User = _AuthContext.Users.SingleOrDefault(u=>u.UserName==userObj.UserName);

            if (User != null)
            {
                return BadRequest( new { Message = "Girilen Kullanıcı Adı Zaten Kayıtlı" });
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

        [HttpPost("ForgotPassword")]
        public async Task<IActionResult> ForgotPassword([FromBody] User userObj)
        {
            if (userObj.Email == null)
            {
                return BadRequest();
            }
            
            var User = _AuthContext.Users.FirstOrDefault(u=>u.Email == userObj.Email);
            if (User == null)
            {
                return NotFound();
            }
            
            User.Password = CreatePassword();   
            SendMail.Send(User.FirstName, userObj.Email, User.Password);
            await _AuthContext.SaveChangesAsync();

            return Ok(new
            {
                Message = "Password Changed"
            });
        }


        private string CreatePassword()
        {
            Random rnd = new Random();
            int randomnumber = rnd.Next(0, 10);
            int randomchars = rnd.Next(0, 29);
            int randomspecialcharacters = rnd.Next(0, 6);

            int randomnumber2 = rnd.Next(0, 10);
            int randomchars2 = rnd.Next(0, 29);
            int randomspecialcharacters2 = rnd.Next(0, 6);

            int randomnumber3 = rnd.Next(0, 10);
            int randomchars3 = rnd.Next(0, 29);
            int randomspecialcharacters3 = rnd.Next(0, 6);

            string numbers = "0123456789";
            string Chars = "abcçdefgğhıijklmnoöprsştuüvyz";
            string specialcharacters = "@$!%&?";

            return "" + numbers[randomnumber] + Chars[randomchars] + specialcharacters[randomspecialcharacters] +
                   numbers[randomnumber2] + Chars[randomchars2] + specialcharacters[randomspecialcharacters2] +
                   numbers[randomnumber3] + Chars[randomchars3] + specialcharacters[randomspecialcharacters3];
        }
    }
}
