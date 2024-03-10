using Backend.Core.Entities;
using Backend.Core.Repositories;
using Backend.Infrastructure.Data;
using Backend.Utils.Exceptions;

namespace Backend.Infrastructure.Repositories
{
    public class TransactionRepository : BaseRepository<Transaction>, ITransactionRepository
    {
        public TransactionRepository(IDbContext context) : base(context)
        {
        }

        public static Transaction GetTransactionById(List<Account> accounts, string accountId, string transactionId)
        {
            var transactionFound = UserRepository.GetAccountById(accounts: accounts, accountId: accountId).Transactions.Find(t => t.Id == transactionId) ?? throw new GenericException("No transaction found with this id");

            return transactionFound;
        }
    }
}
