using AppAny.HotChocolate.FluentValidation;
using Backend.API.Validators.DeleteTransactionValidator;
using Backend.API.Validators.TransactionValidators;
using Backend.Core.Entities;
using Backend.Core.Repositories;

namespace Backend.API.Mutations
{
    [ExtendObjectType("Mutation")]
    public class TransactionMutation
    {
        public async Task<User> AddTransaction([UseFluentValidation, UseValidator<AddTransactionValidator>] Transaction transaction, User user, string accountId, [Service] IUserRepository userRepository, [Service] ITransactionRepository transactionRepository)
        {
            var registeredUser = await userRepository.GetByEmailAsync(email: user.Email);

            if (registeredUser is null)
            {
                throw new GraphQLException("User not registered.");
            }

            var res = await userRepository.AddTransactionOnUserAccount(transaction: transaction, user: registeredUser, accountId);

            return res;
        }

        public async Task<User> deleteTransaction([UseFluentValidation, UseValidator<DeleteTransactionValidator>] Transaction transaction, User user, string accountId, [Service] IUserRepository userRepository, [Service] ITransactionRepository transactionRepository)
        {
            var registeredUser = await userRepository.GetByEmailAsync(email: user.Email);

            if (registeredUser is null)
            {
                throw new GraphQLException("User not registered.");
            }

            User res = await userRepository.DeleteTransactionOnUserAccount(transactionId: transaction.Id, user: registeredUser, accountId);

            return res;
        }
    }
}
