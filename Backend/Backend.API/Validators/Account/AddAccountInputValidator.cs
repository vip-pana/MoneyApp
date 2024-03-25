using Backend.API.Types.Input.Account;
using FluentValidation;

namespace Backend.API.Validators.Account
{
    public class AddAccountInputValidator : AbstractValidator<AddAccountInput>
    {
        public AddAccountInputValidator()
        {
            RuleFor(x => x.Name).NotEmpty();
        }
    }
}
