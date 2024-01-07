using Backend.Core.Entities;
using Backend.Core.Enums;

namespace Backend.Core.Repositories
{
    public interface IAccountRepository : IBaseRepository<Account>
    {
        Task<Account> GenerateNewAccount(User user, CurrencyEnum currency);
    }
}
