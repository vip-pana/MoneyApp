using Backend.Core.Enums;

namespace Backend.Core.Entities
{
    public class Account : BaseEntity
    {
        public required string Name { get; set; }
        public required User UserOwner { get; set; }
        public double Liquidity { get; set; }
        public CurrencyEnum Currency { get; set; }
        public List<Category> Categories { get; set; }
        public List<Transaction> Transactions { get; set; }
        public List<User> SubUsers { get; set; }
    }
}
