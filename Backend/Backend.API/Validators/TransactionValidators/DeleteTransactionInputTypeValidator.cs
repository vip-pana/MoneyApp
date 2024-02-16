using Backend.API.Types.InputTypes.TransactionTypes;
using FluentValidation;

namespace Backend.API.Validators.TransactionValidators
{
    public class DeleteTransactionInputTypeValidator : AbstractValidator<DeleteTransactionInputType>
    {
        public DeleteTransactionInputTypeValidator()
        {
            RuleFor(x => x.TransactionId).NotEmpty();
        }
    }
}
