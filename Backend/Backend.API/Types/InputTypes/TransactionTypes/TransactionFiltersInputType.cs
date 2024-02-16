using Backend.Core.Filters.TransactionFilters;

namespace Backend.API.Types.InputTypes.TransactionTypes
{
    public class TransactionFiltersInputType
    {
        public required string UserEmail { get; init; }
        public required string AccountId { get; init; }
        public required TransactionFilters TransactionFilters { get; init; }
    }
}
