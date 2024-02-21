﻿using AppAny.HotChocolate.FluentValidation;
using Backend.API.Types.InputTypes.TransactionTypes;
using Backend.API.Validators.TransactionValidators;
using Backend.Core.Entities;
using Backend.Core.Repositories;
using HotChocolate.Authorization;

namespace Backend.API.Queries
{
    [ExtendObjectType("Query")]
    public class TransactionQuery([Service] IUserRepository userRepository)
    {
        [Authorize]
        public async Task<User> GetUserTransactionsFiltered([UseFluentValidation, UseValidator<TransactionFilterInputTypeValidator>] TransactionFiltersInputType filters)
        {
            var registeredUser = await userRepository.GetByEmailAsync(email: filters.UserEmail) ?? throw new GraphQLException(new Error("User not registered."));

            registeredUser = userRepository.FilterUserTransactions(filters.TransactionFilters, registeredUser, filters.AccountId);

            return registeredUser;
        }
    }
}
