using Backend.Core.Entities;
using Backend.Infrastructure.Data;

namespace Backend.Infrastructure.Repositories
{
    public class UserRepository : BaseRepository<User>
    {
        public UserRepository(ICatalogContext catalogContext) : base(catalogContext)
        {
        }
    }
}
