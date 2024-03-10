using AppAny.HotChocolate.FluentValidation;
using Backend.API.Types.Input.Transaction;
using Backend.API.Validators.Transaction;
using Backend.Core.Entities;
using Backend.Core.Repositories;
using Backend.Infrastructure.Repositories;
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
        public async Task<Account> DeleteTransaction([UseFluentValidation, UseValidator<DeleteTransactionInputValidator>] DeleteTransactionInput input)
        {
            var registeredUser = await userRepository.GetByEmailAsync(email: input.UserEmail) ?? throw new UserNotExistException(input.UserEmail);

            var res = await userRepository.DeleteTransactionOnUserAccountAsync(transactionId: input.TransactionId, user: registeredUser, input.AccountId);

            return UserRepository.GetAccountById(accounts: res.Accounts, accountId: input.AccountId);
        }

        [AllowAnonymous]
        [Error<UserNotExistException>]
        public async Task<Account> DeleteTransactionList([UseFluentValidation, UseValidator<DeleteTransactionListInputValidator>] DeleteTransactionListInput input)
        {
            var registeredUser = await userRepository.GetByEmailAsync(email: input.UserEmail) ?? throw new UserNotExistException(input.UserEmail);

            var res = await userRepository.DeleteTransactionListOnUserAccountAsync(transactionIds: input.TransactionIds, user: registeredUser, input.AccountId);

            return UserRepository.GetAccountById(accounts: res.Accounts, accountId: input.AccountId);
        }

        [AllowAnonymous]
        [Error<UserNotExistException>]
        public async Task<Account> AddOrUpdateTransaction([UseFluentValidation, UseValidator<AddOrUpdateTransactionInputValidator>] AddOrUpdateTransactionInput input)
        {
            User res;
            var registeredUser = await userRepository.GetByEmailAsync(email: input.UserEmail) ?? throw new UserNotExistException(input.UserEmail);

            var category = new Category
            {
                Id = input.Transaction.Category.Id,
                CategoryType = input.Transaction.Category.CategoryType,
                Name = input.Transaction.Category.Name,
                SubCategories = input.Transaction.Category.SubCategories ?? []
            };

            var transaction = new Transaction(
                description: input.Transaction.Description,
                amount: input.Transaction.Amount,
                transactionType: input.Transaction.TransactionType,
                currency: input.Transaction.Currency,
                category: category,
                dateTime: input.Transaction.DateTime
                );

            if (input.Transaction.Id != null)
            {
                transaction.Id = input.Transaction.Id;

                var transactionExist = TransactionRepository.GetTransactionById(transactionId: input.Transaction.Id, accounts: registeredUser.Accounts, accountId: input.AccountId) != null;

                if (!transactionExist) throw new FieldIdNotExistException();

                res = await userRepository.UpdateTransactionOnUserAccountAsync(user: registeredUser, transaction: transaction, accountId: input.AccountId);
            }
            else
            {
                res = await userRepository.AddTransactionOnUserAccountAsync(user: registeredUser, transaction: transaction, accountId: input.AccountId);
            }

            return UserRepository.GetAccountById(accounts: res.Accounts, accountId: input.AccountId);
        }
    }
}
