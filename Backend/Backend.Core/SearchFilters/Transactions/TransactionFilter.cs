using Backend.Core.Entities;
using Backend.Core.Enums;

namespace Backend.Core.SearchFilters.Transactions
{
    public class TransactionFilter
    {
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public List<Category>? Categories { get; set; }
        public List<Currency>? Currencies { get; set; }
        public List<OperationType>? OperationTypes { get; set; }
    }
}
