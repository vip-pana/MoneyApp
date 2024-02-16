using AppAny.HotChocolate.FluentValidation;
using Backend.API.Types.InputTypes.TransactionTypes;
using Backend.API.Validators.TransactionValidators;
using Backend.Core.Entities;
using Backend.Core.Repositories;

namespace Backend.API.Mutations
{
    [ExtendObjectType("Mutation")]
    public class TransactionMutation([Service] IUserRepository userRepository)
    {
        public async Task<User> DeleteTransaction([UseFluentValidation, UseValidator<DeleteTransactionInputTypeValidator>] DeleteTransactionInputType transaction)
        {
            var registeredUser = await userRepository.GetByEmailAsync(email: transaction.UserEmail) ?? throw new GraphQLException("User not registered.");

            if (transaction.TransactionId is null) throw new GraphQLException("Transaction id not passed");

            User res = await userRepository.DeleteTransactionOnUserAccount(transactionId: transaction.TransactionId, user: registeredUser, transaction.AccountId);

            return res;
        }

        public async Task<User> AddOrUpdateTransaction([UseFluentValidation, UseValidator<BaseTransactionInputTypeValidator>] BaseTransactionInputType transactionInput)
        {
            User res;
            var registeredUser = await userRepository.GetByEmailAsync(email: transactionInput.UserEmail) ?? throw new GraphQLException("User not registered.");

            if (transactionInput.Transaction.Id != null)
            {
                var transactionExist = userRepository.GetTransactionById(transactionId: transactionInput.Transaction.Id, user: registeredUser, accountId: transactionInput.AccountId) != null;
                
                if (!transactionExist) throw new GraphQLException("Transaction id does not exist");
                
                res = await userRepository.UpdateTransactionOnUserAccount(transaction: transactionInput.Transaction, user: registeredUser, accountId: transactionInput.AccountId);
            }
            else
            {
                res = await userRepository.AddTransactionOnUserAccount(transaction: transactionInput.Transaction, user: registeredUser, transactionInput.AccountId);
            }

            return res;
        } 
    }
}
