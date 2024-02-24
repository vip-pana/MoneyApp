using Backend.Core.Entities;

namespace Backend.API.Types.InputTypes.CategoryTypes
{
    public class DeleteCategoryInputType : BaseInputType
    {
        public required string CategoryId { get; init; }
        public string? SubcategoryId { get; init; }
    }
}
