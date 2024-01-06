using Backend.Core.Enums;

namespace Backend.Core.Entities
{
    public class Transaction: BaseEntity
    {
        public string Name { get; set; }
        public double Value { get; set; }
        TypeEnum Type { get; set; }
        CurrencyEnum Currency { get; set; }
        Category Category { get; set; }
        DateTime DateTime { get; set; }

    }
}
