using Backend.Core.Enums;

namespace Backend.API.Types.InputTypes.Category
{
    public class AddCategoryInput : BaseInput
    {
        public required string Name { get; init; }
        public required OperationType OperationType { get; init; }
    }
}
