using Backend.Core.Entities;
using MongoDB.Driver;

namespace Backend.Infrastructure.Data
{
    public interface ICatalogContext
    {
        IMongoCollection<Category> Categories { get; }
        IMongoCollection<Product> Products { get; }
    }
}
