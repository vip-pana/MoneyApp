using Backend.Core.Entities;
using Backend.Core.Repositories;

namespace Backend.API.Resolvers
{
    [ExtendObjectType("Category")]
    public class CategoryResolver
    {
        public Task<Category> GetCategoryAsync(
            [Parent] Product product,
            [Service] ICategoryRepository categoryRepository) => categoryRepository.GetByIdAsync(product.CategoryId);
    }
}
