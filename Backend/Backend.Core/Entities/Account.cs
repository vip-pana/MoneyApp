using Backend.Core.Enums;

namespace Backend.Core.Entities
{
    public class Account : BaseEntity
    {
        public required string Name { get; set; }
        public required Currency Currency { get; set; }
        public required List<Category> Categories { get; set; }
        public List<Transaction> Transactions { get; set; }
        public List<User> SubUsers { get; set; }
        public required double IncomeAmount { get; set; }
        public required double ExpenseAmount { get; set; }

        public Account()
        {
            Categories = [];
            Transactions = [];
        }
    }
}
