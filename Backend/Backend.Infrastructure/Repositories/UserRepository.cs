using Backend.Core.Entities;
using Backend.Core.Enums;
using Backend.Core.Repositories;
using Backend.Core.SearchFilters.Transactions;
using Backend.Infrastructure.Data;
using Backend.Utils.Authentication;
using MongoDB.Bson;
using MongoDB.Driver;

namespace Backend.Infrastructure.Repositories
{
    public class UserRepository(IDbContext context) : BaseRepository<User>(context), IUserRepository
    {
        public async Task<User> Signup(User user)
        {
            if (user.Password != null)
            {
                user.Password = AuthenticationUtils.HashPassword(password: user.Password);
            }
            else
            {
                throw new Exception("Password not inserted");
            }

            await collection.InsertOneAsync(user);

            return user;
        }

        public async Task<User> GetByEmailAsync(string email)
        {
            var filter = Builders<User>.Filter.Eq(_ => _.Email, email);
            return await collection.Find(filter).FirstOrDefaultAsync();
        }

        public async Task<User> AddTransactionOnUserAccount(Transaction transaction, User user, string accountId)
        {
            transaction.Id = ObjectId.GenerateNewId().ToString();
            user.Accounts.Find(account => account.Id == accountId)?.Transactions.Add(transaction);
            user = ReCalculateAccountAmounts(user, accountId);

            var filter = Builders<User>.Filter.Eq(_ => _.Id, user.Id);
            await collection.ReplaceOneAsync(filter, user);

            return user;
        }

        public async Task<User> DeleteTransactionOnUserAccount(string transactionId, User user, string accountId)
        {
            var transactionToRemove = GetAccountById(user, accountId).Transactions.FirstOrDefault(transaction => transaction.Id == transactionId);

            if (transactionToRemove == null)
            {
                throw new Exception("Transaction not exist in account");
            }

            GetAccountById(user, accountId).Transactions.Remove(transactionToRemove);

            user = ReCalculateAccountAmounts(user, accountId);

            var filter = Builders<User>.Filter.Eq(_ => _.Id, user.Id);
            await collection.ReplaceOneAsync(filter, user);

            return user;
        }

        public async Task<User> UpdateTransactionOnUserAccount(Transaction transaction, User user, string accountId)
        {
            var transactionToRemove = GetTransactionById(transaction, user, accountId);

            GetAccountById(user, accountId).Transactions.Remove(transactionToRemove);

            GetAccountById(user, accountId).Transactions.Add(transaction);
            user = ReCalculateAccountAmounts(user, accountId);

            var filter = Builders<User>.Filter.Eq(_ => _.Id, user.Id);
            await collection.ReplaceOneAsync(filter, user);

            return user;
        }

        #region PLAIN METHODS
        public Transaction GetTransactionById(Transaction transaction, User user, string accountId)
        {
            if (user != null)
            {
                var transactionFound = GetAccountById(user: user, accountId: accountId).Transactions.FirstOrDefault(t => t.Id == transaction.Id);

                if (transactionFound != null)
                {
                    return transactionFound;
                }
                else
                {
                    throw new Exception("No transaction found with this id");
                }
            }
            else
            {
                throw new Exception("User can't be null");
            }
        }

        public Account GetAccountById(User user, string accountId)
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
                    throw new Exception("No user accounts found");
                }
            }
            else
            {
                throw new Exception("This user not have accounts");
            }
        }

        private static User ReCalculateAccountAmounts(User user, string accountId)
        {
            var totalIncomeAmount = user.Accounts.Find(account => account.Id == accountId).Transactions.Where(transaction => transaction.TransactionType == Core.Enums.OperationType.Income).Sum(transaction => transaction.Amount);

            user.Accounts.Find(account => account.Id == accountId).IncomeAmount = totalIncomeAmount != 0 ? Math.Round(totalIncomeAmount.Value, 2) : 0;

            var totalExpenseAmount = user.Accounts.Find(account => account.Id == accountId).Transactions.Where(transaction => transaction.TransactionType == Core.Enums.OperationType.Expense).Sum(transaction => transaction.Amount);

            user.Accounts.Find(account => account.Id == accountId).ExpenseAmount = totalExpenseAmount != 0 ? Math.Round(totalExpenseAmount.Value, 2) : 0;

            return user;
        }

        #endregion

        #region FILTERS
        public User FilterUserTransactions(TransactionFilter filters, User user, string accountId)
        {
            var transactions = GetAccountById(user: user, accountId: accountId).Transactions;

            var filteredTransaction = FilterByDatetimes(filters, transactions);
            
            //if (inputSearch.Categories != null && inputSearch.Categories.Count != 0) filteredTransaction = FilterByCategories(categories: inputSearch.Categories, transactions: filteredTransaction);

            //if (inputSearch.Currencies != null && inputSearch.Currencies.Count != 0) filteredTransaction = FilterByCurrencies(currencies: inputSearch.Currencies, transactions: filteredTransaction);
            
            //if (inputSearch.OperationTypes != null && inputSearch.OperationTypes.Count != 0) filteredTransaction = FilterByOperationTypes(operationTypes: inputSearch.OperationTypes, transactions: filteredTransaction);

            user.Accounts.Find(account => account.Id == accountId).Transactions = filteredTransaction.ToList();

            return user;
        }

        private IEnumerable<Transaction> FilterByOperationTypes(List<OperationType> operationTypes, IEnumerable<Transaction> transactions)
        {
            return transactions.Where(transaction => operationTypes.Contains(transaction.TransactionType.Value));
        }

        private IEnumerable<Transaction> FilterByCurrencies(List<Currency> currencies, IEnumerable<Transaction> transactions)
        {
            return transactions.Where(transaction => currencies.Contains(transaction.Currency.Value));
        }

        private IEnumerable<Transaction> FilterByCategories(List<Category> categories, IEnumerable<Transaction> transactions)
        {
            return transactions.Where(transaction => categories.Contains(transaction.Category));
        }

        private static IEnumerable<Transaction> FilterByDatetimes(TransactionFilter inputSearch, List<Transaction> transactions)
        {
            return transactions.Where(transaction => transaction.DateTime.Value > inputSearch.StartDate && transaction.DateTime.Value < inputSearch.EndDate);
        }
        #endregion
    }
}
