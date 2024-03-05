using AppAny.HotChocolate.FluentValidation;
using Backend.API.Types.InputTypes.Transaction;
using Backend.API.Validators.Transaction;
using Backend.Core.Entities;
using Backend.Core.Repositories;
using Backend.Utils.Exceptions;
using HotChocolate.Authorization;

namespace Backend.API.Mutations
{
    [ExtendObjectType("Mutation")]
    public class TransactionMutation([Service] IUserRepository userRepository)
    {
        [AllowAnonymous]
        [Error<UserNotExistException>]
        [Error<FieldIdNotExistException>]
        public async Task<User> DeleteTransaction([UseFluentValidation, UseValidator<DeleteTransactionInputValidator>] DeleteTransactionInput transaction)
        {
            var registeredUser = await userRepository.GetByEmailAsync(email: transaction.UserEmail) ?? throw new UserNotExistException(transaction.UserEmail);

            User res = await userRepository.DeleteTransactionOnUserAccount(transactionId: transaction.TransactionId, user: registeredUser, transaction.AccountId);

            return res;
        }

        [AllowAnonymous]
        [Error<UserNotExistException>]
        public async Task<User> DeleteTransactionList([UseFluentValidation, UseValidator<DeleteTransactionListInputValidator>] DeleteTransactionListInput transactions)
        {
            var registeredUser = await userRepository.GetByEmailAsync(email: transactions.UserEmail) ?? throw new UserNotExistException(transactions.UserEmail);

            User res = await userRepository.DeleteTransactionListOnUserAccount(transactionIds: transactions.TransactionIds, user: registeredUser, transactions.AccountId);

            return res;
        }

        [AllowAnonymous]
        [Error<UserNotExistException>]
        public async Task<User> AddOrUpdateTransaction([UseFluentValidation, UseValidator<BaseTransactionInputValidator>] AddOrUpdateTransactionInput transactionInput)
        {
            User res;
            var registeredUser = await userRepository.GetByEmailAsync(email: transactionInput.UserEmail) ?? throw new UserNotExistException(transactionInput.UserEmail);

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

                if (!transactionExist) throw new FieldIdNotExistException();

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
