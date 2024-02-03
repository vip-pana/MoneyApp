using Backend.Core.Entities;

namespace Backend.Core.Repositories
{
    public interface IUserRepository : IBaseRepository<User>
    {
        public Task<User> Signup(User user);
        public Task<User> GetByEmailAsync(string email);
        public Task<User> AddTransactionOnUserAccount(Transaction transaction, User user, string accountId);
        public Task<User> DeleteTransactionOnUserAccount(Transaction transaction, User user, string accountId);
    }
}
