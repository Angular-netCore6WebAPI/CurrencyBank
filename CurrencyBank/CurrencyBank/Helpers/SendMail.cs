using CurrencyBank.Models;
using MailKit.Net.Smtp;
using MimeKit;

namespace CurrencyBank.Helpers
{
    public class SendMail
    {
        public static void Send(string Who, string To, string Body)
        {
            MimeMessage mimeMessage = new MimeMessage();

            MailboxAddress mailboxAddressFrom = new MailboxAddress("CurrencyBank", "12deneme34deneme56@gmail.com");
            mimeMessage.From.Add(mailboxAddressFrom);

            MailboxAddress mailboxAddressTo = new MailboxAddress(Who, To);
            mimeMessage.To.Add(mailboxAddressTo);

            mimeMessage.Subject = "Changing Password";

            var BodyBuilder = new BodyBuilder();
            BodyBuilder.TextBody = "Your New Password is : " + Body;
            mimeMessage.Body = BodyBuilder.ToMessageBody();

            SmtpClient client = new SmtpClient();
            client.Connect("smtp.gmail.com", 587, false);
            client.Authenticate("12deneme34deneme56@gmail.com", "yvnkddrvhbkafait");
            client.Send(mimeMessage);
            client.Disconnect(true);
        }
    }
}
