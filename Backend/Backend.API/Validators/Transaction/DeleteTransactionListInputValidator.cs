using Backend.API.Types.Input.Transaction;
using FluentValidation;

namespace Backend.API.Validators.Transaction
{
    public class DeleteTransactionListInputValidator : AbstractValidator<DeleteTransactionListInput>
    {
        public DeleteTransactionListInputValidator()
        {
            RuleFor(x => x.TransactionIds).NotEmpty().WithMessage("TransactionIds can't be null").NotNull();
            RuleFor(x => x.SelectedAccountId).NotEmpty();
            RuleFor(x => x.UserEmail).NotEmpty();
        }
    }
}
