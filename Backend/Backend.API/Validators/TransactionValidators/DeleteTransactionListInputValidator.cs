using Backend.API.Types.InputTypes.Transaction;
using FluentValidation;

namespace Backend.API.Validators.TransactionValidators
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
