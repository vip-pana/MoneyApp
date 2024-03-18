namespace Backend.API.Types.Input.Category
{
    public class EditSubCategoryInput : BaseInput
    {
        public required string CategoryId { get; init; }
        public required string SubCategoryId { get; init; }
        public required string SubCategoryName { get; init; }
    }
}
