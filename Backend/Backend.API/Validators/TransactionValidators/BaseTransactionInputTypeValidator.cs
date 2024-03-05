using Backend.API.Types.InputTypes.TransactionTypes;
using FluentValidation;

namespace Backend.API.Validators.TransactionValidators
{
    public class BaseTransactionInputTypeValidator : AbstractValidator<AddOrUpdateTransactionInput>
    {
        public BaseTransactionInputTypeValidator()
        {
            RuleFor(x => x.Transaction.Category).NotEmpty();
            RuleFor(x => x.Transaction.DateTime).NotEmpty();
            RuleFor(x => x.Transaction.Description).NotEmpty();
            RuleFor(x => x.Transaction.Amount).NotEmpty().GreaterThan(0);
        }
    }
}
