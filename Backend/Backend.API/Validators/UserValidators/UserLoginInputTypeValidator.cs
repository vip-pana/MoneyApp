using Backend.API.Types.InputTypes.User;
using FluentValidation;

namespace Backend.API.Validators.UserValidators
{
    public class UserLoginInputTypeValidator : AbstractValidator<LoginInput>
    {
        public UserLoginInputTypeValidator()
        {
            RuleFor(x => x.Email).NotEmpty();
            RuleFor(x => x.Password).NotEmpty();
        }
    }
}
