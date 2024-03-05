using AppAny.HotChocolate.FluentValidation;
using Backend.API.Types.Input.Transaction;
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
        public async Task<User> DeleteTransaction([UseFluentValidation, UseValidator<DeleteTransactionInputValidator>] DeleteTransactionInput input)
        {
            var registeredUser = await userRepository.GetByEmailAsync(email: input.UserEmail) ?? throw new UserNotExistException(input.UserEmail);

            User res = await userRepository.DeleteTransactionOnUserAccount(transactionId: input.TransactionId, user: registeredUser, input.AccountId);

            return res;
        }

        [AllowAnonymous]
        [Error<UserNotExistException>]
        public async Task<User> DeleteTransactionList([UseFluentValidation, UseValidator<DeleteTransactionListInputValidator>] DeleteTransactionListInput input)
        {
            var registeredUser = await userRepository.GetByEmailAsync(email: input.UserEmail) ?? throw new UserNotExistException(input.UserEmail);

            User res = await userRepository.DeleteTransactionListOnUserAccount(transactionIds: input.TransactionIds, user: registeredUser, input.AccountId);

            return res;
        }

        [AllowAnonymous]
        [Error<UserNotExistException>]
        public async Task<User> AddOrUpdateTransaction([UseFluentValidation, UseValidator<BaseTransactionInputValidator>] AddOrUpdateTransactionInput input)
        {
            User res;
            var registeredUser = await userRepository.GetByEmailAsync(email: input.UserEmail) ?? throw new UserNotExistException(input.UserEmail);

            var transaction = new Transaction(
                description: input.Transaction.Description,
                amount: input.Transaction.Amount,
                transactionType: input.Transaction.TransactionType,
                currency: input.Transaction.Currency,
                category: input.Transaction.Category,
                dateTime: input.Transaction.DateTime
                );

            if (input.Transaction.Id != null)
            {
                transaction.Id = input.Transaction.Id;

                var transactionExist = userRepository.GetTransactionById(transactionId: input.Transaction.Id, user: registeredUser, accountId: input.AccountId) != null;

                if (!transactionExist) throw new FieldIdNotExistException();

                res = await userRepository.UpdateTransactionOnUserAccount(transaction: transaction, user: registeredUser, accountId: input.AccountId);
            }
            else
            {
                res = await userRepository.AddTransactionOnUserAccount(transaction: transaction, user: registeredUser, input.AccountId);
            }

            return res;
        }
    }
}
