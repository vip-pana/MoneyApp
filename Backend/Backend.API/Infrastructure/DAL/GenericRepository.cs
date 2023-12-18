using Backend.API.Config;
using Microsoft.Extensions.Options;
using MongoDB.Driver;

namespace Backend.API.Infrastructure.DAL
{
    public class GenericRepository<T> where T : class
    {
        private readonly IMongoCollection<T> _collection;
        private readonly IOptions<DatabaseSettings> _dbConfig;

        public GenericRepository(IOptions<DatabaseSettings> dbConfig, string collectionName)
        {
            _dbConfig = dbConfig;
            var mongoClient = new MongoClient(_dbConfig.Value.ConnectionString);
            var mongoDatabase = mongoClient.GetDatabase(_dbConfig.Value.DatabaseName);
            _collection = mongoDatabase.GetCollection<T>(collectionName);
        }
    }
}
