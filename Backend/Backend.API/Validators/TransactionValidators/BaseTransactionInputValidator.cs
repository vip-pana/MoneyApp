using Backend.API.Types.InputTypes.Transaction;
using FluentValidation;

namespace Backend.API.Validators.TransactionValidators
{
    public class BaseTransactionInputValidator : AbstractValidator<AddOrUpdateTransactionInput>
    {
        public BaseTransactionInputValidator()
        {
            RuleFor(x => x.Transaction.Category).NotEmpty();
            RuleFor(x => x.Transaction.DateTime).NotEmpty();
            RuleFor(x => x.Transaction.Description).NotEmpty();
            RuleFor(x => x.Transaction.Amount).NotEmpty().GreaterThan(0);
        }
    }
}
