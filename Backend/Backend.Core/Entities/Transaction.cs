using Backend.Core.Enums;

namespace Backend.Core.Entities
{
    public class Transaction: BaseEntity
    {
        public required string Description { get; set; }
        public required double Amount { get; set; }
        public required OperationType TransactionType { get; set; }
        public required Currency Currency { get; set; }
        public required Category Category { get; set; }
        public required DateTime DateTime { get; set; }
    }
}
