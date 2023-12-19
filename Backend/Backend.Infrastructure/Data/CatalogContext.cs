using Backend.Core.Entities;
using Backend.Infrastructure.Configurations;
using Microsoft.Extensions.Options;
using MongoDB.Driver;

namespace Backend.Infrastructure.Data
{
    public class CatalogContext : ICatalogContext
    {
        private readonly IOptions<MongoDbConfiguration> _mongoDbConfiguration;
        private const string ProductCollectionName = "Products";
        private const string CategoryCollectionName = "Categories";

        public CatalogContext(IOptions<MongoDbConfiguration> mongoDbConfiguration)
        {
            _mongoDbConfiguration = mongoDbConfiguration;
            var client = new MongoClient(_mongoDbConfiguration.Value.ConnectionString);
            var database = client.GetDatabase(_mongoDbConfiguration.Value.Database);

            Categories = database.GetCollection<Category>(CategoryCollectionName);
            Products = database.GetCollection<Product>(ProductCollectionName);

            CatalogContextSeed.SeedData(Categories, Products);
        }

        public IMongoCollection<Category> Categories { get; }
        public IMongoCollection<Product> Products { get; }

    }
}
