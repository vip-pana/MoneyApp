using Backend.API.Types.InputTypes.CategoryTypes;
using FluentValidation;

namespace Backend.API.Validators.CategoryValidators
{
    public class AddCategoryInputTypeValidator : AbstractValidator<AddCategoryInputType>
    {
        public AddCategoryInputTypeValidator()
        {
            RuleFor(x => x.AccountId).NotEmpty();
            RuleFor(x => x.UserEmail).NotEmpty();
        }
    }
}
