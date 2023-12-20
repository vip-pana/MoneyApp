using Backend.Core.Entities;
using Backend.Core.Repositories;

namespace Backend.API.Queries
{
    [ExtendObjectType(Name = "Query")]
    public class ProductQuery
    {
        public Task<IEnumerable<Product>> GetProductsAsync([Service] IProductRepository productRepository) =>
            productRepository.GetAllAsync();
    }
}
