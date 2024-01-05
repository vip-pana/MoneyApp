using Backend.Core.Entities;
using FluentValidation;

namespace Backend.API.Validators.UserValidators
{
    public class UserSignupValidator : AbstractValidator<User>
    {
        public UserSignupValidator()
        {
            RuleFor(x => x.Name).Empty();
            RuleFor(x => x.Surname).Empty();

            RuleFor(x => x.Email).NotEmpty().WithMessage("Mail is required.")
                .MinimumLength(3).EmailAddress().WithMessage("Please insert a correct email address.");
            RuleFor(x => x.Password).NotEmpty().WithMessage("Password is required.")
                .MinimumLength(8).WithMessage("The password must have at least 8 characters.")
                .Matches("[A-Z]").WithMessage("The password must have at least one uppercase letter.")
                .Matches("[a-z]").WithMessage("The password must have at least one lowercase letter.")
                .Matches("[0-9]").WithMessage("The password must have at least one number.");
        }
    }
}
