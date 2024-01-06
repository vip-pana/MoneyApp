using Backend.Core.Entities;
using Backend.Core.Repositories;
using Backend.Infrastructure.Data;

namespace Backend.Infrastructure.Repositories
{
    public class CategoryProductRepository : BaseRepository<ProductCategory>, ICategoryProductRepository
    {
        public CategoryProductRepository(IDbContext context) : base(context) 
        {
        }
    }
}
