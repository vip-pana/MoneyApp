using Backend.Core.Entities;
using FluentValidation;

namespace Backend.API.Validators.DeleteTransactionValidator
{
    public class DeleteTransactionValidator : AbstractValidator<Transaction>
    {
        public DeleteTransactionValidator()
        {
            RuleFor(x => x.Id).NotEmpty();
        }
    }
}
