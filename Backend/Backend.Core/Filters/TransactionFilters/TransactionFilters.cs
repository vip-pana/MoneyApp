using Backend.Core.Enums;

namespace Backend.Core.Filters.TransactionFilters
{
    public class TransactionFilters
    {
        public DateTime DateStart { get; init; }
        public DateTime DateEnd { get; init; }
        public List<string>? CategoriesIds { get; init; }
        public List<Currency>? Currencies { get; init; }
        public List<OperationType>? OperationTypes { get; init; }

    }
}
