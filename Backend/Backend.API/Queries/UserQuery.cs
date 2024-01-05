using Backend.Core.Entities;
using Backend.Core.Repositories;
using HotChocolate;
using HotChocolate.Types;

namespace Backend.API.Queries
{
    [ExtendObjectType("Query")]
    public class UserQuery
    {
        public Task<IEnumerable<User>> GetUsersAsync([Service] IUserRepository userRepository) => userRepository.GetAllAsync();
    }
}
