using Backend.API.Types.InputTypes.User;
using FluentValidation;

namespace Backend.API.Validators.User
{
    public class LoginInputValidator : AbstractValidator<LoginInput>
    {
        public LoginInputValidator()
        {
            RuleFor(x => x.Email).NotEmpty();
            RuleFor(x => x.Password).NotEmpty();
        }
    }
}
