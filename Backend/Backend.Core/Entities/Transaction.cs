using Backend.Core.Enums;

namespace Backend.Core.Entities
{
    public class Transaction: BaseEntity
    {
        public string Description { get; set; }
        public double Amount { get; set; }
        public OperationType TransactionType { get; set; }
        public Currency Currency { get; set; }
        public Category Category { get; set; }
        public DateTime DateTime { get; set; }

        public Transaction(string description, double amount, OperationType transactionType, Currency currency, Category category, DateTime dateTime) : base()
        {
            Description = description;
            Amount = amount;
            TransactionType = transactionType;
            Currency = currency;
            Category = category;
            DateTime = dateTime;
        }
    }
}
