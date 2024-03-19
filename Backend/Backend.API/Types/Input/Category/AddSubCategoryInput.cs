namespace Backend.API.Types.Input.Category
{
    public class AddSubCategoryInput : BaseInput
    {
        public required string CategoryId { get; init;}
        public required string SubCategoryName { get; init;}
    }
}
