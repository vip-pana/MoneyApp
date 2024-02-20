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
            var registeredUser = await userRepository.GetByEmailAsync(email: transaction.UserEmail) ?? throw new GraphQLException(new Error("User not registered."));

            if (transaction.TransactionId is null) throw new GraphQLException("Transaction id not passed");

            User res = await userRepository.DeleteTransactionOnUserAccount(transactionId: transaction.TransactionId, user: registeredUser, transaction.AccountId);

            return res;
        }

        public async Task<User> DeleteTransactionList([UseFluentValidation, UseValidator<DeleteTransactionListInputTypeValidator>] DeleteTransactionListInputType transactions)
        {
            var registeredUser = await userRepository.GetByEmailAsync(email: transactions.UserEmail) ?? throw new GraphQLException(new Error("User not registered."));

            var allTransactionsHaveId = transactions.TransactionIds.Exists(transaction => transaction is not null || string.IsNullOrWhiteSpace(transaction));
            if (!allTransactionsHaveId) throw new GraphQLException(new Error("Transaction ids not passed"));

            User res = await userRepository.DeleteTransactionListOnUserAccount(transactionIds: transactions.TransactionIds, user: registeredUser, transactions.AccountId);

            return res;
        }

        public async Task<User> AddOrUpdateTransaction([UseFluentValidation, UseValidator<BaseTransactionInputTypeValidator>] AddOrUpdateTransactionInputType transactionInput)
        {
            User res;
            var registeredUser = await userRepository.GetByEmailAsync(email: transactionInput.UserEmail) ?? throw new GraphQLException(new Error("User not registered."));

            var transaction = new Transaction(
                description: transactionInput.Transaction.Description,
                amount: transactionInput.Transaction.Amount,
                transactionType: transactionInput.Transaction.TransactionType,
                currency: transactionInput.Transaction.Currency,
                category: transactionInput.Transaction.Category,
                dateTime: transactionInput.Transaction.DateTime
                );

            if (transactionInput.Transaction.Id != null)
            {
                transaction.Id = transactionInput.Transaction.Id;

                var transactionExist = userRepository.GetTransactionById(transactionId: transactionInput.Transaction.Id, user: registeredUser, accountId: transactionInput.AccountId) != null;

                if (!transactionExist) throw new GraphQLException(new Error("Transaction id does not exist"));

                res = await userRepository.UpdateTransactionOnUserAccount(transaction: transaction, user: registeredUser, accountId: transactionInput.AccountId);
            }
            else
            {
                res = await userRepository.AddTransactionOnUserAccount(transaction: transaction, user: registeredUser, transactionInput.AccountId);
            }

            return res;
        }
    }
}
