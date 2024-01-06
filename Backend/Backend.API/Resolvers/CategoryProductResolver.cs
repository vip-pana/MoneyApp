using Backend.Core.Entities;
using Backend.Core.Repositories;

namespace Backend.API.Resolvers
{
    [ExtendObjectType("Category")]
    public class CategoryProductResolver
    {
        public Task<ProductCategory> GetCategoryAsync(
            [Parent] Product product,
            [Service] ICategoryProductRepository categoryRepository) => categoryRepository.GetByIdAsync(product.CategoryId);
    }
}
