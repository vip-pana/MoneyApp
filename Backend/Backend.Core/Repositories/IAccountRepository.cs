using Backend.Core.Entities;
using Backend.Core.Enums;

namespace Backend.Core.Repositories
{
    public interface IAccountRepository : IBaseRepository<Account>
    {
        Account GenerateNewAccount(Currency currency, string? accountName = null);
    }
}
