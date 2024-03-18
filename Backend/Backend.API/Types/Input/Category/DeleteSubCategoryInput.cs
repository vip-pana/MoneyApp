namespace Backend.API.Types.Input.Category
{
    public class DeleteSubCategoryInput : BaseInput
    {
        public required string CategoryId { get; init; }
        public required string SubCategoryId { get; init; }
    }
}
