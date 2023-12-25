using Backend.Core.Entities;
using Backend.Infrastructure.Data;

namespace Backend.Infrastructure.Repositories
{
    public class UserRepository : BaseRepository<User>
    {
        public UserRepository(IDbContext context) : base(context)
        {
        }
    }
}
