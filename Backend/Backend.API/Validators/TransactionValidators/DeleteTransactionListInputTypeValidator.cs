using Backend.API.Types.InputTypes.TransactionTypes;
using FluentValidation;

namespace Backend.API.Validators.TransactionValidators
{
    public class DeleteTransactionListInputTypeValidator : AbstractValidator<DeleteTransactionListInputType>
    {
        public DeleteTransactionListInputTypeValidator()
        {
            RuleFor(x => x.TransactionIds).NotEmpty().WithMessage("TransactionIds can't be null");
            RuleFor(x => x.AccountId).NotEmpty();
            RuleFor(x => x.UserEmail).NotEmpty();
        }
    }
}
