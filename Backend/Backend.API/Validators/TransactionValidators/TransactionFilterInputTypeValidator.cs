﻿using Backend.API.Types.InputTypes.Transaction;
using FluentValidation;

namespace Backend.API.Validators.TransactionValidators
{
    public class TransactionFilterInputTypeValidator : AbstractValidator<FilterTransactionListInput>
    {
        public TransactionFilterInputTypeValidator() 
        {
            RuleFor(x => x.UserEmail).NotEmpty();
            RuleFor(x => x.AccountId).NotEmpty();
            RuleFor(x => x.TransactionFilters.DateStart).NotEmpty().Must((model, startDate) => startDate <= model.TransactionFilters.DateEnd)
                .WithMessage("Start date can't be greater than end date");
            RuleFor(x => x.TransactionFilters.DateEnd).NotEmpty();
        }
    }
}
