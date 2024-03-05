using Backend.API.Types.InputTypes.Transaction;
using FluentValidation;

namespace Backend.API.Validators.Transaction
{
    public class DeleteTransactionListInputValidator : AbstractValidator<DeleteTransactionListInput>
    {
        public DeleteTransactionListInputValidator()
        {
            RuleFor(x => x.TransactionIds).NotEmpty().WithMessage("TransactionIds can't be null").NotNull();
            RuleFor(x => x.AccountId).NotEmpty();
            RuleFor(x => x.UserEmail).NotEmpty();
        }
    }
}
