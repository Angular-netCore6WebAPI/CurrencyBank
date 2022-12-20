namespace CurrencyBank.Models
{
    public class UserCurrency
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public int CurrencyId { get; set; }
        public DateTime PurchaseDate { get; set; }
        public double Amount { get; set; }
        public double Price { get; set; }
        public string Type { get; set; }
    }
}
