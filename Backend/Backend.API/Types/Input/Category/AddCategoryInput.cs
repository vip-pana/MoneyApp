using Backend.Core.Enums;

namespace Backend.API.Types.Input.Category
{
    public class AddCategoryInput : BaseInput
    {
        public required string Name { get; init; }
        public required OperationType OperationType { get; init; }
        public required List<string> SubcategorysNames { get; init; }

    }
}
