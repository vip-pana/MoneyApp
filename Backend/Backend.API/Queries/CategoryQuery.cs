using Backend.Core.Entities;
using Backend.Core.Repositories;

namespace Backend.API.Queries
{
    [ExtendObjectType("Query")]
    public class CategoryQuery
    {
        public Task<Product> GetProductById(string id, [Service] IProductRepository productRepository) =>
            productRepository.GetByIdAsync(id);
    }
}
