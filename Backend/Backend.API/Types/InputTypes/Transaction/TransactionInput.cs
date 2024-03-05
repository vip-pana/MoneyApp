using Backend.Core.Entities;
using Backend.Core.Enums;

namespace Backend.API.Types.InputTypes.Transaction
{
    public class TransactionInput
    {
        public string? Id { get; set; }
        public required string Description { get; set; }
        public required double Amount { get; set; }
        public required OperationType TransactionType { get; set; }
        public required Currency Currency { get; set; }
        public required Core.Entities.Category Category { get; set; }
        public required DateTime DateTime { get; set; }
    }
}
