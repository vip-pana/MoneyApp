using Backend.API.Types.InputTypes.TransactionTypes;
using FluentValidation;

namespace Backend.API.Validators.TransactionValidators
{
    public class DeleteTransactionInputTypeValidator : AbstractValidator<DeleteTransactionInputType>
    {
        public DeleteTransactionInputTypeValidator()
        {
            RuleFor(x => x.TransactionId).NotEmpty().WithMessage("Transaction id can't be null").NotNull();
            RuleFor(x => x.AccountId).NotEmpty();
            RuleFor(x => x.UserEmail).NotEmpty();
        }
    }
}
