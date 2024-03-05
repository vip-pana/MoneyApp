using Backend.API.Types.InputTypes.Transaction;
using FluentValidation;

namespace Backend.API.Validators.Transaction
{
    public class DeleteTransactionInputValidator : AbstractValidator<DeleteTransactionInput>
    {
        public DeleteTransactionInputValidator()
        {
            RuleFor(x => x.TransactionId).NotEmpty().WithMessage("Transaction id can't be null").NotNull();
            RuleFor(x => x.AccountId).NotEmpty();
            RuleFor(x => x.UserEmail).NotEmpty();
        }
    }
}
