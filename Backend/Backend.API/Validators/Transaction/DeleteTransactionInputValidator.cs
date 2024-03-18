using Backend.API.Types.Input.Transaction;
using FluentValidation;

namespace Backend.API.Validators.Transaction
{
    public class DeleteTransactionInputValidator : AbstractValidator<DeleteTransactionInput>
    {
        public DeleteTransactionInputValidator()
        {
            RuleFor(x => x.TransactionId).NotEmpty().WithMessage("Transaction id can't be null").NotNull();
            RuleFor(x => x.SelectedAccountId).NotEmpty();
            RuleFor(x => x.UserEmail).NotEmpty();
        }
    }
}
