using Backend.API.Types.InputTypes.User;
using FluentValidation;

namespace Backend.API.Validators.UserValidators
{
    public class UserSignupInputTypeValidator : AbstractValidator<SignupInput>
    {
        public UserSignupInputTypeValidator()
        {
            RuleFor(c => c.Name).NotEmpty().WithMessage("User email is required")
                .MinimumLength(3).MaximumLength(50).WithMessage("User name must be between 3 and 50 chars.");
            RuleFor(c => c.Surname).NotEmpty().WithMessage("User surname is required")
                .MinimumLength(3).MaximumLength(50).WithMessage("User name must be between 3 and 50 chars.");
            RuleFor(c => c.Email).NotEmpty().WithMessage("User email is required")
                .MinimumLength(3).EmailAddress().WithMessage("User email not valid, please insert a correct email.");
            RuleFor(c => c.Password).NotEmpty().WithMessage("The password is required.")
            .MinimumLength(8).WithMessage("The password must have at least 8 characters.")
            .Matches("[A-Z]").WithMessage("The password must have at least one uppercase letter.")
            .Matches("[a-z]").WithMessage("The password must have at least one lowercase letter.")
            .Matches("[0-9]").WithMessage("The password must have at least one number.");
        }
    }
}
