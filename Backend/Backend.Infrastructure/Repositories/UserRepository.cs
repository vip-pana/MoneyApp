using Backend.Core.Entities;
using Backend.Core.Enums;
using Backend.Core.Filters.TransactionFilters;
using Backend.Core.Repositories;
using Backend.Infrastructure.Data;
using Backend.Utils.Exceptions;
using MongoDB.Bson;
using MongoDB.Driver;
using MongoDB.Driver.Linq;

namespace Backend.Infrastructure.Repositories
{
    public class UserRepository(IDbContext context) : BaseRepository<User>(context), IUserRepository
    {
        public async Task<User> Signup(User user)
        {
            await collection.InsertOneAsync(user);
            return user;
        }

        public async Task<User> GetByEmailAsync(string email)
        {
            var filter = Builders<User>.Filter.Eq(_ => _.Email, email);
            return await collection.Find(filter).FirstOrDefaultAsync();
        }

        public async Task UpdateUserAsync(User user)
        {
            var filter = Builders<User>.Filter.Eq(_ => _.Id, user.Id);
            await collection.ReplaceOneAsync(filter, user);
        }

        #region CATEGORIES METHODS
        public async Task<User> DeleteCategoryOnUserAccount(string categoryId, string? subcategoryId, User user, string accountId)
        {
            var account = GetAccountById(user, accountId);
            var accountIndex = user.Accounts.IndexOf(account);
            var category = account.Categories.Find(category => category.Id == categoryId) ?? throw new GenericException("Category not exist in account");

            if (category.SubCategories != null && subcategoryId != null && !string.IsNullOrWhiteSpace(subcategoryId))
            {
                //var accountCategoryIndex = account.Categories.IndexOf(category);
                //var subcategoryToRemove = category.SubCategories.Find(subcategory => subcategory.Id == subcategoryId) ?? throw new GenericException("Subcategory not exist in the category of the account");

                //category.SubCategories.Remove(subcategoryToRemove);
                //account.Categories[accountCategoryIndex] = category;
                throw new GenericException("subcategories already not implemented");
            }
            else
            {
                var otherCategory = account.Transactions
                    .Where(t => t.Category.CategoryType == category.CategoryType)
                    .First(t => t.Category.Name == "Other").Category ?? throw new GenericException("Category other not found.");

                // Trova tutte le transazioni con la stessa categoria ID come categoryId e le rimpiazzo con otherCategory
                foreach (var transaction in account.Transactions.Where(t => t.Category.Id == categoryId))
                {
                    transaction.Category = otherCategory;
                }

                account.Categories.Remove(category);
            }

            user.Accounts[accountIndex] = account;
            await UpdateUserAsync(user);
            return user;
        }
        #endregion

        #region TRANSACTIONS METHODS
        public async Task<User> AddTransactionOnUserAccount(Transaction transaction, User user, string accountId)
        {
            transaction.Id = ObjectId.GenerateNewId().ToString();

            var account = user.Accounts.Find(account => account.Id == accountId) ?? throw new FieldIdNotExistException();

            var categoryExist = account.Categories.Exists(category => category.Id == transaction.Category.Id);
            if (!categoryExist) throw new GenericException("The category in the transaction not exist in the account");

            account.Transactions.Add(transaction);

            var index = user.Accounts.IndexOf(account);
            if (index != -1)
            {
                user.Accounts[index] = account;
            }

            user = ReCalculateAccountAmounts(user, accountId);

            var filter = Builders<User>.Filter.Eq(_ => _.Id, user.Id);
            await collection.ReplaceOneAsync(filter, user);

            return user;
        }

        public async Task<User> DeleteTransactionOnUserAccount(string transactionId, User user, string accountId)
        {
            var transactionToRemove = GetAccountById(user, accountId).Transactions.Find(transaction => transaction.Id == transactionId) ?? throw new GenericException("Transaction not exist in account");
            GetAccountById(user, accountId).Transactions.Remove(transactionToRemove);

            user = ReCalculateAccountAmounts(user, accountId);

            await UpdateUserAsync(user);
            return user;
        }

        public async Task<User> DeleteTransactionListOnUserAccount(List<string> transactionIds, User user, string accountId)
        {
            User result = user;
            foreach (var transactionId in transactionIds)
            {
                result = await DeleteTransactionOnUserAccount(transactionId, user, accountId);
            }
            return result;
        }

        public async Task<User> UpdateTransactionOnUserAccount(Transaction transaction, User user, string accountId)
        {
            var transactionToRemove = GetTransactionById(transaction.Id, user, accountId);

            GetAccountById(user, accountId).Transactions.Remove(transactionToRemove);

            GetAccountById(user, accountId).Transactions.Add(transaction);
            user = ReCalculateAccountAmounts(user, accountId);

            await UpdateUserAsync(user);
            return user;
        }
        #endregion

        #region PLAIN METHODS
        public Transaction GetTransactionById(string transactionId, User user, string accountId)
        {
            if (user is null) throw new GenericException("User can't be null");

            var transactionFound = GetAccountById(user: user, accountId: accountId).Transactions.Find(t => t.Id == transactionId);

            if (transactionFound is null) throw new GenericException("No transaction found with this id");

            return transactionFound;
        }

        public static Account GetAccountById(User user, string accountId)
        {
            if (user.Accounts != null && user.Accounts.Count != 0)
            {
                var accountFound = user.Accounts.Find(account => account.Id == accountId);

                if (accountFound != null)
                {
                    return accountFound;
                }
                else
                {
                    throw new GenericException("No user accounts found");
                }
            }
            else
            {
                throw new GenericException("This user not have accounts");
            }
        }

        private static User ReCalculateAccountAmounts(User user, string accountId)
        {
            if (user.Accounts.Count != 0)
            {
                var totalIncomeAmount = GetAccountById(user: user, accountId: accountId).Transactions.Where(transaction => transaction.TransactionType == OperationType.Income).Sum(transaction => transaction.Amount);
                GetAccountById(user: user, accountId: accountId).IncomeAmount = totalIncomeAmount != 0 ? Math.Round(totalIncomeAmount, 2) : 0;

                var totalExpenseAmount = GetAccountById(user: user, accountId: accountId).Transactions.Where(transaction => transaction.TransactionType == OperationType.Expense).Sum(transaction => transaction.Amount);
                GetAccountById(user: user, accountId: accountId).ExpenseAmount = totalExpenseAmount != 0 ? Math.Round(totalExpenseAmount, 2) : 0;
            }

            return user;
        }

        public User FilterUserTransactions(TransactionFilters filters, User user, string accountId)
        {
            var transactions = GetAccountById(user: user, accountId: accountId).Transactions;
            var filteredTransaction = FilterTransactionsByDatetimes(filters, transactions);

            if (filters.CategoriesIds is not null && filters.CategoriesIds.Count != 0)
                filteredTransaction = FilterByCategories(categoriesIds: filters.CategoriesIds, transactions: filteredTransaction);

            if (filters.Currencies is not null && filters.Currencies.Count != 0)
                filteredTransaction = FilterByCurrencies(currencies: filters.Currencies, transactions: filteredTransaction);

            if (filters.OperationTypes is not null && filters.OperationTypes.Count != 0)
                filteredTransaction = FilterByOperationTypes(operationTypes: filters.OperationTypes, transactions: filteredTransaction);

            user = UpdateUserTransactions(user, accountId, filteredTransaction.ToList());

            return user;
        }

        private static User UpdateUserTransactions(User user, string accountId, List<Transaction> transactions)
        {
            if (user.Accounts is null) throw new GenericException("No accounts inside the user");

            var account = user.Accounts.Find(account => account.Id == accountId) ?? throw new GenericException("No account found with these id");

            account.Transactions = transactions;

            var index = user.Accounts.IndexOf(account);
            if (index != -1)
            {
                user.Accounts[index] = account;
            }

            return user;
        }
        #endregion

        #region FILTERS
        private static IEnumerable<Transaction> FilterByOperationTypes(List<OperationType> operationTypes, IEnumerable<Transaction> transactions)
        {
            return transactions.Where(transaction => operationTypes.Contains(transaction.TransactionType));
        }

        private static IEnumerable<Transaction> FilterByCurrencies(List<Currency> currencies, IEnumerable<Transaction> transactions)
        {
            return transactions.Where(transaction => currencies.Contains(transaction.Currency));
        }

        private static IEnumerable<Transaction> FilterTransactionsByDatetimes(TransactionFilters inputSearch, List<Transaction> transactions)
        {
            return transactions.Where(transaction => transaction.DateTime >= inputSearch.DateStart && transaction.DateTime <= inputSearch.DateEnd);
        }

        private static IEnumerable<Transaction> FilterByCategories(List<string> categoriesIds, IEnumerable<Transaction> transactions)
        {
            return transactions.Where(transaction => transaction.Category.Id is not null && categoriesIds.Contains(transaction.Category.Id));
        }
        #endregion
    }
}
