using Backend.Core.Entities;
using Backend.Core.Enums;

namespace Backend.API.Types.Input.Transaction
{
    public class TransactionInput
    {
        public string? Id { get; set; }
        public required string Description { get; set; }
        public required double Amount { get; set; }
        public required OperationType TransactionType { get; set; }
        public required Currency Currency { get; set; }
        public required CategoryInput Category { get; set; }
        public required DateTime DateTime { get; set; }
        public SubCategory? SelectedSubCategory { get; set; }
    }

    public class CategoryInput : BaseEntity
    {
        public required string Name { get; set; }
        public required OperationType CategoryType { get; set; }
        public virtual List<SubCategory>? SubCategories { get; set; }
    }
}
