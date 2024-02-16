using Backend.Core.Entities;
using Backend.Core.Enums;

namespace Backend.Core.Filters.TransactionFilters
{
    public class TransactionFilters
    {
        public DateTime StartDate { get; init; }
        public DateTime EndDate { get; init; }
        public List<string>? CategoriesIds { get; init; }
        public List<Currency>? Currencies { get; init; }
        public List<OperationType>? OperationTypes { get; init; }

    }
}
