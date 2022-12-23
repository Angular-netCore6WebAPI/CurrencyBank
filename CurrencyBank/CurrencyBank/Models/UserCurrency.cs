namespace CurrencyBank.Models
{
    public class UserCurrency
    {
        public int Id { get; set; }
        public string UserName { get; set; }
        public string CurrencyName { get; set; }
        public DateTime PurchaseDate { get; set; }
        public double Amount { get; set; }
        public double Price { get; set; }
        public string Type { get; set; }
    }
}
