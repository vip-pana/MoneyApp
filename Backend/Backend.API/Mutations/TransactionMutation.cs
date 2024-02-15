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
        #region CRUD
        public async Task<User> DeleteTransaction([UseFluentValidation, UseValidator<DeleteTransactionValidator>] Transaction transaction, User user, string accountId, [Service] IUserRepository userRepository)
        {
            var registeredUser = await userRepository.GetByEmailAsync(email: user.Email);

            if (registeredUser is null)
            {
                throw new GraphQLException("User not registered.");
            }

            User res = await userRepository.DeleteTransactionOnUserAccount(transactionId: transaction.Id, user: registeredUser, accountId);

            return res;
        }

        public async Task<User> AddOrUpdateTransaction([UseFluentValidation, UseValidator<TransactionValidator>] Transaction transaction, User user, string accountId, [Service] IUserRepository userRepository)
        {
            User? res;
            var registeredUser = await userRepository.GetByEmailAsync(email: user.Email) ?? throw new GraphQLException("User not registered.");

            if (transaction.Id != null)
            {
                var transactionExist = userRepository.GetTransactionById(transaction: transaction, user: registeredUser, accountId: accountId) != null;
                if (transactionExist)
                {
                    res = await userRepository.UpdateTransactionOnUserAccount(transaction: transaction, user: registeredUser, accountId: accountId);
                }
                else
                {
                    throw new GraphQLException("Transaction id not exist");
                }
            }
            else
            {
                res = await userRepository.AddTransactionOnUserAccount(transaction: transaction, user: registeredUser, accountId);
            }

            return res;
        } 
        #endregion
    }
}
