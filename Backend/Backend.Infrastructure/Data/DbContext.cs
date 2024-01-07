using Backend.Infrastructure.Configurations;
using Microsoft.Extensions.Options;
using MongoDB.Driver;

namespace Backend.Infrastructure.Data
{
    public class DbContext : IDbContext
    {
        private readonly IMongoDatabase database;

        public DbContext(IOptions<MongoDbConfiguration> mongoDbConfiguration)
        {
            var _mongoDbConfiguration = mongoDbConfiguration;

            var client = new MongoClient(_mongoDbConfiguration.Value.ConnectionString);

            database = client.GetDatabase(_mongoDbConfiguration.Value.Database);
        }

        public IMongoCollection<T> GetCollection<T>(string name)
        {
            return database.GetCollection<T>(name);
        }
    }
}
