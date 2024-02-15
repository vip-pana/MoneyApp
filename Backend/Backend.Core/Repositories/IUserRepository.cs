using Backend.Core.Entities;
using Backend.Core.SearchFilters.Transactions;

namespace Backend.Core.Repositories
{
    public interface IUserRepository : IBaseRepository<User>
    {
        public Task<User> Signup(User user);
        public Task<User> GetByEmailAsync(string email);
        public Task<User> AddTransactionOnUserAccount(Transaction transaction, User user, string accountId);
        public Task<User> DeleteTransactionOnUserAccount(string transactionId, User user, string accountId);
        Task<User> UpdateTransactionOnUserAccount(Transaction transaction, User user, string accountId);
        Transaction GetTransactionById(Transaction transaction, User user, string accountId);
        User FilterUserTransactions(TransactionFilter filters, User user, string accountId);
    }
}
