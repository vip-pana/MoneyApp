using Backend.Core.Entities;
using Backend.Core.Repositories;
using Backend.Infrastructure.Data;
using Backend.Utils.Authentication;
using MongoDB.Driver;

namespace Backend.Infrastructure.Repositories
{
    public class UserRepository : BaseRepository<User>, IUserRepository
    {
        public UserRepository(IDbContext context) : base(context)
        {
        }

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
            Transaction trasformedTransaction = new Transaction();
            trasformedTransaction = TransformTransaction(trasformedTransaction, transaction);

            user.Accounts.Find(account => account.Id == accountId)?.Transactions.Add(trasformedTransaction);
            user = ReCalculateAccountAmounts(user, accountId);

            var filter = Builders<User>.Filter.Eq(_ => _.Id, user.Id);
            await collection.ReplaceOneAsync(filter, user);

            return user;
        }

        private Transaction TransformTransaction(Transaction trasformedTransaction, Transaction transaction)
        {
            trasformedTransaction.Description = transaction.Description;
            trasformedTransaction.Amount = transaction.Amount;
            trasformedTransaction.TransactionType = transaction.TransactionType;
            trasformedTransaction.Currency = transaction.Currency;
            trasformedTransaction.Category = transaction.Category;
            trasformedTransaction.DateTime = transaction.DateTime;
            return trasformedTransaction;
        }

        private User ReCalculateAccountAmounts(User user, string accountId)
        {
            var totalIncomeAmount = user.Accounts.Find(account => account.Id == accountId).Transactions.Where(transaction => transaction.TransactionType == Core.Enums.OperationType.Income).Sum(transaction => transaction.Amount);

            user.Accounts.Find(account => account.Id == accountId).IncomeAmount = totalIncomeAmount != 0 ? Math.Round(totalIncomeAmount.Value, 2) : 0;

            var totalExpenseAmount = user.Accounts.Find(account => account.Id == accountId).Transactions.Where(transaction => transaction.TransactionType == Core.Enums.OperationType.Expense).Sum(transaction => transaction.Amount);

            user.Accounts.Find(account => account.Id == accountId).ExpenseAmount = totalExpenseAmount != 0 ? Math.Round(totalExpenseAmount.Value, 2) : 0;

            return user;
        }

        public async Task<User> DeleteTransactionOnUserAccount(string transactionId, User user, string accountId)
        {
            var transactionToRemove = user.Accounts.Find(account => account.Id == accountId).Transactions.Where(transaction => transaction.Id == transactionId).FirstOrDefault();

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
            var transactionToRemove = user.Accounts.Find(account => account.Id == accountId).Transactions.Where(t => t.Id == transaction.Id).FirstOrDefault();

            user.Accounts.Find(account => account.Id == accountId).Transactions.Remove(transactionToRemove);

            user.Accounts.Find(account => account.Id == accountId).Transactions.Add(transaction);
            user = ReCalculateAccountAmounts(user, accountId);

            var filter = Builders<User>.Filter.Eq(_ => _.Id, user.Id);
            await collection.ReplaceOneAsync(filter, user);

            return user;
        }
    }
}
