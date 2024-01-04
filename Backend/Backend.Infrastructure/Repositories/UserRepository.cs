using Backend.Core.Entities;
using Backend.Core.Repositories;
using Backend.Infrastructure.Data;
using MongoDB.Driver;

namespace Backend.Infrastructure.Repositories
{
    public class UserRepository : BaseRepository<User>, IUserRepository
    {
        public UserRepository(IDbContext context) : base(context) 
        {
        }

        public async Task<User> Signin(User user)
        {
            user.Password = HashPassword(user.Password);

            await collection.InsertOneAsync(user);

            return user;
        }
        public async Task<User> GetByEmailAsync(string email)
        {
            var filter = Builders<User>.Filter.Eq(_ => _.Email, email);
            return await collection.Find(filter).FirstOrDefaultAsync();
        }

        private string HashPassword(string password)
        {
            return BCrypt.Net.BCrypt.EnhancedHashPassword(password);
        }
    }
}
