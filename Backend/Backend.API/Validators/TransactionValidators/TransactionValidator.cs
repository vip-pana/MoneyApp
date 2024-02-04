using Backend.Core.Entities;
using FluentValidation;

namespace Backend.API.Validators.TransactionValidators
{
    public class TransactionValidator : AbstractValidator<Transaction>
    {
        public TransactionValidator()
        {
            RuleFor(x => x.Category).NotEmpty();
            RuleFor(x => x.DateTime).NotEmpty();
            RuleFor(x => x.Description).NotEmpty();
            RuleFor(x => x.Amount).NotEmpty().GreaterThan(0);
        }
    }
}
