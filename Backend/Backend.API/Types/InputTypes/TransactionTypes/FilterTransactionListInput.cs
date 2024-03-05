using Backend.Core.Filters.TransactionFilters;

namespace Backend.API.Types.InputTypes.TransactionTypes
{
    public class FilterTransactionListInput : BaseInput
    {
        public required TransactionFilters TransactionFilters { get; init; }
    }
}
