using Backend.API.Types.InputTypes.TransactionTypes;
using FluentValidation;

namespace Backend.API.Validators.TransactionValidators
{
    public class TransactionFilterInputTypeValidator : AbstractValidator<TransactionFiltersInputType>
    {
        public TransactionFilterInputTypeValidator() 
        {
            RuleFor(x => x.UserEmail).NotEmpty();
            RuleFor(x => x.AccountId).NotEmpty();
            RuleFor(x => x.TransactionFilters.StartDate).NotEmpty().Must((model, startDate) => startDate <= model.TransactionFilters.EndDate)
                .WithMessage("Start date can't be greater than end date");
            RuleFor(x => x.TransactionFilters.EndDate).NotEmpty();
        }
    }
}
