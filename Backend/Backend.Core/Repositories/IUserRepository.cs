using Backend.Core.Entities;
using Backend.Core.Filters.Transaction;

namespace Backend.Core.Repositories
{
    public interface IUserRepository : IBaseRepository<User>
    {
        public Task<User> Signup(User user);
        public Task<User> GetByEmailAsync(string email);
        
        #region TRANSACTIONS
        public Task<User> AddTransactionOnUserAccountAsync(User user, Transaction transaction, string accountId);
        public Task<User> DeleteTransactionOnUserAccountAsync(string transactionId, User user, string accountId);
        Task<User> UpdateTransactionOnUserAccountAsync(Transaction transaction, User user, string accountId);
        User FilterUserTransactions(TransactionFilters filters, User user, string accountId);
        Task<User> DeleteTransactionListOnUserAccountAsync(List<string> transactionIds, User user, string accountId);
        #endregion

        #region CATEGORIES
        public Task<User> AddCategoryOnUserAccountAsync(Category category, User user, string accountId);
        #endregion
    }
}
