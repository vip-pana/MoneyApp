using Backend.API.Config;
using Backend.API.Models;
using Microsoft.Extensions.Options;
using MongoDB.Driver;

namespace Backend.API.Services
{
    public class UserService
    {
        private readonly IMongoCollection<TbUser> _userCollection;

        public UserService(IOptions<DatabaseSettings> options)
        {
            var mongoClient = new MongoClient(options.Value.ConnectionString);
            var mongoDb = mongoClient.GetDatabase(options.Value.DatabaseName);
            _userCollection = mongoDb.GetCollection<TbUser>(options.Value.CollectionName);
        }

        public async Task<List<TbUser>> GetUsersAsync() =>
            await _userCollection.Find(_ => true).ToListAsync();

        public async Task<TbUser> GetUserAsync(string id) =>
            await _userCollection.Find(x => x.Id == id).FirstOrDefaultAsync();

        public async Task CreateAsync(TbUser user) => await _userCollection.InsertOneAsync(user);

        public async Task UpdateAsync(TbUser user) => await _userCollection.ReplaceOneAsync(x => x.Id == user.Id, user);

        public async Task RemoveAsync(string id) => await _userCollection.DeleteOneAsync(x => x.Id == id);
    }
}
