using Backend.Core.Filters.Transaction;

namespace Backend.API.Types.Input.Transaction
{
    public class FilterTransactionListInput : BaseInput
    {
        public required TransactionFilters TransactionFilters { get; init; }
    }
}
