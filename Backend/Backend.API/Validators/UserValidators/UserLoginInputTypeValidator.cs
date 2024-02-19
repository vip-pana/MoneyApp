using Backend.API.Types.InputTypes.UserTypes;
using FluentValidation;

namespace Backend.API.Validators.UserValidators
{
    public class UserLoginInputTypeValidator : AbstractValidator<UserLoginInputType>
    {
        public UserLoginInputTypeValidator()
        {
            RuleFor(x => x.Email).NotEmpty();
            RuleFor(x => x.Password).NotEmpty();
        }
    }
}
