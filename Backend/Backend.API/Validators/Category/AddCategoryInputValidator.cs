using Backend.API.Types.Input.Category;
using FluentValidation;

namespace Backend.API.Validators.Category
{
    public class AddCategoryInputValidator : AbstractValidator<AddCategoryInput>
    {
        public AddCategoryInputValidator()
        {
            RuleFor(x => x.Name).NotEqual("Other");
        }
    }
}
