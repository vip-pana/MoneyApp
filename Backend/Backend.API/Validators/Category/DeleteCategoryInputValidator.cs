using Backend.API.Types.Input.Category;
using FluentValidation;

namespace Backend.API.Validators.Category
{
    public class DeleteCategoryInputValidator : AbstractValidator<DeleteCategoryInput>
    {
        public DeleteCategoryInputValidator()
        {
            RuleFor(x => x.CategoryId).NotEmpty();
        }
    }
}
