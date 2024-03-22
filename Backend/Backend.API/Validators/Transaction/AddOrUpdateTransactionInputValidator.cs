using Backend.API.Types.Input.Transaction;
using FluentValidation;

namespace Backend.API.Validators.Transaction
{
    public class AddOrUpdateTransactionInputValidator : AbstractValidator<AddOrUpdateTransactionInput>
    {
        public AddOrUpdateTransactionInputValidator()
        {
            RuleFor(x => x.Transaction.Amount).NotEmpty().GreaterThan(0);
            RuleFor(x => x.Transaction.Currency).IsInEnum();
            RuleFor(x => x.Transaction.Category).NotEmpty();
            RuleFor(x => x.Transaction.Description).NotEmpty();
            RuleFor(x => x.Transaction.DateTime).NotEmpty();
            // subcategories can be unselected
        }
    }
}
