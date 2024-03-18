using Backend.Core.Entities;
using Backend.Core.Filters.Transaction;

namespace Backend.Core.Repositories
{
    public interface IUserRepository : IBaseRepository<User>
    {
        public Task<User> Signup(User user);
        public Task<User> GetByEmailAsync(string email);
        public Task UpdateUserAsync(User user);
        #region TRANSACTIONS
        public Task<User> AddTransactionOnUserAccountAsync(User user, Transaction transaction, string accountId);
        public Task<User> DeleteTransactionOnUserAccountAsync(string transactionId, User user, string accountId);
        Task<User> UpdateTransactionOnUserAccountAsync(Transaction transaction, User user, string accountId);
        User FilterUserTransactions(TransactionFilters filters, User user, string accountId);
        Task<User> DeleteTransactionListOnUserAccountAsync(List<string> transactionIds, User user, string accountId);
        #endregion

        #region CATEGORIES
        public Task<User> AddCategoryOnUserAccountAsync(Category category, User user, string accountId);
        User DeleteCategoryReferencesOnAccountTransactions(Category category, User user, string accountId);
        User EditCategoryReferencesOnAccountTransactions(Category category, User user, string accountId);
        Task<User> DeleteCategoryAsync(User user, string accountId, Category categoryToRemove);
        Task<User> EditCategoryNameOnUserAccountAsync(User user, string accountId, Category category);
        Task<User> UpdateCategoryOnAccount(User user, Category category, string accountId);
        User EditSubCategoryReferencesOnAccountTransactions(Category category, User user, string accountId, string subCategoryName, string subCategoryId);
        User DeleteSubCategoryReferencesOnAccountTransactions(Category category, User user, string accountId, string subCategoryId);

        #endregion
    }
}
