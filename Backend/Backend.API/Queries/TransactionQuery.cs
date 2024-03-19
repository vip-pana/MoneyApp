using AppAny.HotChocolate.FluentValidation;
using Backend.API.Types.Input.Transaction;
using Backend.API.Validators.Transaction;
using Backend.Core.Entities;
using Backend.Core.Repositories;
using Backend.Utils.Exceptions;
using HotChocolate.Authorization;

namespace Backend.API.Queries
{
    [ExtendObjectType("Query")]
    public class TransactionQuery([Service] IUserRepository userRepository)
    {
        [Authorize]
        [Error<GenericException>]
        public async Task<User> GetUserTransactionsFiltered([UseFluentValidation, UseValidator<FilterTransactionListInputValidator>] FilterTransactionListInput input)
        {
            var registeredUser = await userRepository.GetByEmailAsync(email: input.UserEmail) ?? throw new GenericException("User not registered.");

            registeredUser = userRepository.FilterUserTransactions(input.TransactionFilters, registeredUser, input.SelectedAccountId);

            return registeredUser;
        }
    }
}
