using System.Security.Cryptography;
using System.Text;
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
    }
}
