using Backend.Core.Enums;

namespace Backend.Core.Entities
{
    public class SubCategory : BaseEntity
    {
        public required string Name { get; set; }
        public required OperationType CategoryType { get; set; }
    }
}
