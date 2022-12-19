using Org.BouncyCastle.Tls;

namespace CurrencyBank.Helpers
{
    public class PasswordGenerator
    {
        public static string CreatePassword()
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
