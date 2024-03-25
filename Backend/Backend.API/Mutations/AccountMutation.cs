using AppAny.HotChocolate.FluentValidation;
using Backend.API.Types.Input.Account;
using Backend.API.Validators.Account;
using Backend.Core.Entities;
using Backend.Core.Repositories;
using Backend.Utils.Exceptions;

namespace Backend.API.Mutations
{
    [ExtendObjectType("Mutation")]
    public class AccountMutation([Service] IAccountRepository _accountRepository, IUserRepository _userRepository)
    {
        public async Task<Account> AddAccount([UseFluentValidation, UseValidator<AddAccountInputValidator>] AddAccountInput input)
        {
            var user = await _userRepository.GetByEmailAsync(email: input.UserEmail) ?? throw new UserNotExistException(input.UserEmail);

            var account = _accountRepository.GenerateNewAccount(currency: input.SelectedCurrency, accountName: input.Name);

            user.Accounts.Add(account);

            await _userRepository.UpdateUserAsync(user);

            return account;
        }
    }
}
