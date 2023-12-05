using Microsoft.Extensions.Options;
using MoneyApp.Api.Config;
using MoneyApp.Api.Infrastructure.DAL;
using MoneyApp.Api.Models;

namespace MoneyApp.Api.Repositories
{
    public class UserRepository : GenericRepository<User>
    {
        private const string collectionName = "user";
        public UserRepository(IOptions<DbConfiguration> dbConfig) : base(dbConfig, collectionName)
        {
        }
    }
}
