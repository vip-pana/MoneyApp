namespace Backend.API.Types.Input.Category
{
    public class EditCategoryInput : BaseInput
    {
        public required string CategoryId { get; init; }
        public required string Name { get; init; }
    }
}
