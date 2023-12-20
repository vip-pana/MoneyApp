using Backend.Core.Entities;
using Backend.Core.Repositories;
using Backend.Infrastructure.Data;

namespace Backend.Infrastructure.Repositories
{
    public class CategoryRepository : BaseRepository<Category>, ICategoryRepository
    {
        public CategoryRepository(ICatalogContext catalogContext) : base(catalogContext) { }
    }
}
