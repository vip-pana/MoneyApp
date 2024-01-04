using Backend.Core.Entities;
using FluentValidation;

namespace Backend.API.Validators.UserValidators
{
    public class UserValidator : AbstractValidator<User>
    {
        public UserValidator()
        {
            RuleFor(c => c.Name).NotEmpty().WithMessage("User email is required")
                .MinimumLength(3).MaximumLength(50).WithMessage("User name must be between 3 and 50 chars.");
            RuleFor(c => c.Surname).NotEmpty().WithMessage("User surname is required")
                .MinimumLength(3).MaximumLength(50).WithMessage("User name must be between 3 and 50 chars.");
            RuleFor(c => c.Email).NotEmpty().WithMessage("User email is required")
                .MinimumLength(3).EmailAddress().WithMessage("User email not valid, please insert a correct email.");
        }
    }
}
