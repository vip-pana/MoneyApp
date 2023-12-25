using MongoDB.Driver;

namespace Backend.Infrastructure.Data
{
    public interface IDbContext
    {
        IMongoCollection<T> GetCollection<T>(string name);
    }
}
