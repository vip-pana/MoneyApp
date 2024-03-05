using Backend.Core.Entities;
using Backend.Core.Filters.Transaction;

namespace Backend.Core.Repositories
{
    public interface IUserRepository : IBaseRepository<User>
    {
        public Task<User> Signup(User user);
        public Task<User> GetByEmailAsync(string email);
        
        #region TRANSACTIONS METHODS
        public Task<User> AddTransactionOnUserAccount(Transaction transaction, User user, string accountId);
        public Task<User> DeleteTransactionOnUserAccount(string transactionId, User user, string accountId);
        Task<User> UpdateTransactionOnUserAccount(Transaction transaction, User user, string accountId);
        Transaction GetTransactionById(string transactionId, User user, string accountId);
        User FilterUserTransactions(TransactionFilters filters, User user, string accountId);
        Task<User> DeleteTransactionListOnUserAccount(List<string> transactionIds, User user, string accountId);
        #endregion

        #region CATEGORY METHODS
        //public Task<User> DeleteCategoryOnUserAccount(string categoryId, string? subcategoryId, User user, string accountId);
        //Task<User> AddCategoryOnUserAccount(Category category, User user, string accountId);
        #endregion

    }
}
