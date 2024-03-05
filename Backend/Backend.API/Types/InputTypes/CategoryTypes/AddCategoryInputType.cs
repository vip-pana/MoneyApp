using Backend.Core.Enums;

namespace Backend.API.Types.InputTypes.CategoryTypes
{
    public class AddCategoryInputType : BaseInput
    {
        public required string Name { get; init; }
        public required OperationType OperationType { get; init; }
    }
}
