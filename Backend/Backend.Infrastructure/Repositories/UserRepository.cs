using Backend.Core.Entities;
using Backend.Core.Repositories;
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
            user.Password = AuthenticationUtils.HashPassword(password: user.Password);

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

        private static User ReCalculateAccountAmounts(User user, string accountId)
        {
            var totalIncomeAmount = user.Accounts.Find(account => account.Id == accountId).Transactions.Where(transaction => transaction.TransactionType == Core.Enums.OperationType.Income).Sum(transaction => transaction.Amount);

            user.Accounts.Find(account => account.Id == accountId).IncomeAmount = totalIncomeAmount != 0 ? Math.Round(totalIncomeAmount.Value, 2) : 0;

            var totalExpenseAmount = user.Accounts.Find(account => account.Id == accountId).Transactions.Where(transaction => transaction.TransactionType == Core.Enums.OperationType.Expense).Sum(transaction => transaction.Amount);

            user.Accounts.Find(account => account.Id == accountId).ExpenseAmount = totalExpenseAmount != 0 ? Math.Round(totalExpenseAmount.Value, 2) : 0;

            return user;
        }

        public async Task<User> DeleteTransactionOnUserAccount(string transactionId, User user, string accountId)
        {
            var transactionToRemove = user.Accounts.Find(account => account.Id == accountId).Transactions.FirstOrDefault(transaction => transaction.Id == transactionId);

            if (transactionToRemove == null)
            {
                throw new Exception("Transaction not exist in account");
            }

            user.Accounts.Find(account => account.Id == accountId).Transactions.Remove(transactionToRemove);

            user = ReCalculateAccountAmounts(user, accountId);

            var filter = Builders<User>.Filter.Eq(_ => _.Id, user.Id);
            await collection.ReplaceOneAsync(filter, user);

            return user;
        }

        public async Task<User> UpdateTransactionOnUserAccount(Transaction transaction, User user, string accountId)
        {
            var transactionToRemove = GetTransactionById(transaction, user, accountId);

            user.Accounts.Find(account => account.Id == accountId).Transactions.Remove(transactionToRemove);

            user.Accounts.Find(account => account.Id == accountId).Transactions.Add(transaction);
            user = ReCalculateAccountAmounts(user, accountId);

            var filter = Builders<User>.Filter.Eq(_ => _.Id, user.Id);
            await collection.ReplaceOneAsync(filter, user);

            return user;
        }

        public Transaction GetTransactionById(Transaction transaction, User user, string accountId)
        {
            return user.Accounts.Find(account => account.Id == accountId).Transactions.FirstOrDefault(t => t.Id == transaction.Id);
        }
    }
}
