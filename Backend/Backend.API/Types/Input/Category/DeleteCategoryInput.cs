namespace Backend.API.Types.Input.Category
{
    public class DeleteCategoryInput : BaseInput
    {
        public required string CategoryId { get; init; }
        public string? SubcategoryId { get; init; }
    }
}
