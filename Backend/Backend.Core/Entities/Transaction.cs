using Backend.Core.Enums;

namespace Backend.Core.Entities
{
    public class Transaction: BaseEntity
    {
        public required string Name { get; set; }
        public required double Value { get; set; }
        public OperationType Type { get; set; }
        public Currency Currency { get; set; }
        public required Category Category { get; set; }
        public DateTime DateTime { get; set; }
    }
}
