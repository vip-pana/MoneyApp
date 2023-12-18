using Backend.API.Config;
using Backend.API.Infrastructure.DAL;
using Backend.API.Models;
using Microsoft.Extensions.Options;

namespace Backend.API.Repositories
{
    public class UserRepository : GenericRepository<TbUser>
    {
        private const string collectionName = "users";
        public UserRepository(IOptions<DatabaseSettings> options) : base(options, collectionName) { }

    }
}
