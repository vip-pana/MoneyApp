using Backend.Core.Entities;
using Backend.Core.Enums;
using Backend.Core.Filters.Transaction;
using Backend.Core.Repositories;
using Backend.Infrastructure.Data;
using Backend.Utils.Exceptions;
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

        #region TRANSACTIONS
        public async Task<User> AddTransactionOnUserAccountAsync(User user, Transaction transaction, string accountId)
        {
            var account = user.Accounts.Find(account => account.Id == accountId) ?? throw new FieldIdNotExistException();

            account = AddTransactionOnAccount(account, transaction);

            user = UpdateUserAccount(user, account);

            user = ReCalculateAccountAmounts(user, accountId);

            await UpdateUserAsync(user);
            return user;
        }

        public async Task<User> DeleteTransactionOnUserAccountAsync(string transactionId, User user, string accountId)
        {
            var transactionToRemove = GetAccountById(accounts: user.Accounts, accountId).Transactions.Find(transaction => transaction.Id == transactionId) ?? throw new GenericException("Transaction not exist in account");
            GetAccountById(accounts: user.Accounts, accountId).Transactions.Remove(transactionToRemove);

            user = ReCalculateAccountAmounts(user, accountId);

            await UpdateUserAsync(user);
            return user;
        }

        public async Task<User> DeleteTransactionListOnUserAccountAsync(List<string> transactionIds, User user, string accountId)
        {
            foreach (var transactionId in transactionIds)
            {
                user = await DeleteTransactionOnUserAccountAsync(transactionId, user, accountId);
            }
            return user;
        }

        public async Task<User> UpdateTransactionOnUserAccountAsync(Transaction transaction, User user, string accountId)
        {
            var transactionToRemove = TransactionRepository.GetTransactionById(accounts: user.Accounts, transactionId: transaction.Id, accountId: accountId);

            GetAccountById(accounts: user.Accounts, accountId).Transactions.Remove(transactionToRemove);

            GetAccountById(accounts: user.Accounts, accountId).Transactions.Add(transaction);
            user = ReCalculateAccountAmounts(user, accountId);

            await UpdateUserAsync(user);
            return user;
        }
        #endregion

        #region CATEGORIES
        public async Task<User> AddCategoryOnUserAccountAsync(Category category, User user, string accountId)
        {
            var account = user.Accounts.Find(account => account.Id == accountId) ?? throw new GenericException("Account non trovato");

            account.Categories.Add(category);

            user = UpdateUserAccount(user, account);

            await UpdateUserAsync(user);

            return user;
        }

        public User DeleteCategoryReferencesOnAccountTransactions(Category c, User user, string accountId)
        {
            var account = user.Accounts.Find(account => account.Id == accountId) ?? throw new GenericException("Account non trovato");

            var defaultCategory = account.Categories.Find(category => category.Name == "Other" && category.CategoryType == c.CategoryType) ?? throw new GenericException("Categoria Other non trovata");

            if (defaultCategory.Id == c.Id)
            {
                throw new GenericException("La categoria other non può essere eliminata");
            }

            foreach (var transaction in account.Transactions.Where(transaction => transaction.Category.Id.Equals(c.Id)))
            {
                transaction.Category = defaultCategory;
            }

            user = UpdateUserAccount(user, account);

            return user;
        }

        public async Task<User> DeleteCategoryAsync(User user, string accountId, Category categoryToRemove)
        {
            GetAccountById(accounts: user.Accounts, accountId).Categories.Remove(categoryToRemove);

            await UpdateUserAsync(user);

            return user;
        }

        public async Task<User> EditCategoryNameOnUserAccountAsync(User user, string accountId, Category category)
        {
            var categoryToRemove = GetAccountById(accounts: user.Accounts, accountId).Categories.Find(c => c.Id == category.Id) ?? throw new GenericException("Categoria non trovata");

            GetAccountById(accounts: user.Accounts, accountId).Categories.Remove(categoryToRemove);

            GetAccountById(accounts: user.Accounts, accountId).Categories.Add(category);

            await UpdateUserAsync(user);

            return user;
        }

        public User EditCategoryReferencesOnAccountTransactions(Category category, User user, string accountId)
        {
            var account = user.Accounts.Find(account => account.Id == accountId) ?? throw new GenericException("Account non trovato");

            foreach (var transaction in account.Transactions.Where(t => t.Category.Id.Equals(category.Id)))
            {
                transaction.Category = category;
            }

            user = UpdateUserAccount(user, account);

            return user;
        }
        #endregion

        #region PLAIN METHODS
        public static Account GetAccountById(List<Account> accounts, string accountId)
        {
            if (accounts.Count is 0)
            {
                throw new GenericException("This user not have accounts");
            }

            var accountFound = accounts.Find(account => account.Id == accountId) ?? throw new GenericException("No user accounts found");

            return accountFound;
        }

        private static User ReCalculateAccountAmounts(User user, string accountId)
        {
            var totalIncomeAmount = GetAccountById(accounts: user.Accounts, accountId: accountId)
                .Transactions.Where(transaction => transaction.TransactionType == OperationType.Income)
                .Sum(transaction => transaction.Amount);
            GetAccountById(accounts: user.Accounts, accountId: accountId).IncomeAmount = totalIncomeAmount != 0 ? Math.Round(totalIncomeAmount, 2) : 0;

            var totalExpenseAmount = GetAccountById(accounts: user.Accounts, accountId: accountId)
                .Transactions.Where(transaction => transaction.TransactionType == OperationType.Expense)
                .Sum(transaction => transaction.Amount);
            GetAccountById(accounts: user.Accounts, accountId: accountId).ExpenseAmount = totalExpenseAmount != 0 ? Math.Round(totalExpenseAmount, 2) : 0;

            return user;
        }

        private static User UpdateUserTransactions(User user, string accountId, List<Transaction> transactions)
        {
            var account = user.Accounts.Find(account => account.Id == accountId) ?? throw new GenericException("No account found with these id");

            account.Transactions = transactions;

            user = UpdateUserAccount(user, account);

            return user;
        }

        private static Account AddTransactionOnAccount(Account account, Transaction transaction)
        {
            var categoryExist = account.Categories.Exists(category => category.Id == transaction.Category.Id);
            if (!categoryExist) throw new GenericException("The category in the transaction not exist in the account");

            account.Transactions.Add(transaction);

            return account;
        }

        private static User UpdateUserAccount(User user, Account account)
        {
            var index = user.Accounts.IndexOf(account);
            if (index != -1)
            {
                user.Accounts[index] = account;
            }
            return user;
        }
        #endregion

        #region FILTERS
        public User FilterUserTransactions(TransactionFilters filters, User user, string accountId)
        {
            var transactions = GetAccountById(accounts: user.Accounts, accountId: accountId).Transactions;
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
