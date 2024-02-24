using Backend.API.Types.InputTypes.CategoryTypes;
using FluentValidation;

namespace Backend.API.Validators.CategoryValidators
{
    public class DeleteCategoryInputTypeValidator : AbstractValidator<DeleteCategoryInputType>
    {
        public DeleteCategoryInputTypeValidator()
        {
            RuleFor(x => x.AccountId).NotEmpty();
            RuleFor(x => x.UserEmail).NotEmpty();
        }
    }
}
