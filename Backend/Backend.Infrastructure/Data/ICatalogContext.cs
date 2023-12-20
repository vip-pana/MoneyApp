using MongoDB.Driver;

namespace Backend.Infrastructure.Data
{
    public interface ICatalogContext
    {
        IMongoCollection<T> GetCollection<T>(string name);
    }
}
