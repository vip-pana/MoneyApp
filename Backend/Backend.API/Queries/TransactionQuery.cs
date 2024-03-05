using AppAny.HotChocolate.FluentValidation;
using Backend.API.Types.Input.Transaction;
using Backend.API.Validators.Transaction;
using Backend.Core.Entities;
using Backend.Core.Repositories;
using HotChocolate.Authorization;

namespace Backend.API.Queries
{
    [ExtendObjectType("Query")]
    public class TransactionQuery([Service] IUserRepository userRepository)
    {
        [AllowAnonymous]
        public async Task<User> GetUserTransactionsFiltered([UseFluentValidation, UseValidator<FilterTransactionListInputValidator>] FilterTransactionListInput input)
        {
            var registeredUser = await userRepository.GetByEmailAsync(email: input.UserEmail) ?? throw new GraphQLException(new Error("User not registered."));

            registeredUser = userRepository.FilterUserTransactions(input.TransactionFilters, registeredUser, input.AccountId);

            return registeredUser;
        }
    }
}
