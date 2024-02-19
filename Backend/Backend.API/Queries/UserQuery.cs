using Backend.Core.Entities;
using Backend.Core.Repositories;
using HotChocolate.Authorization;

namespace Backend.API.Queries
{
    [Authorize]
    [ExtendObjectType("Query")]
    public class UserQuery ([Service] IUserRepository userRepository)
    {
        public Task<IEnumerable<User>> GetUsersAsync() => userRepository.GetAllAsync();

        public async Task<bool> UserExistByEmail(string email)
        {
            User user = await userRepository.GetByEmailAsync(email);
            return user != null;
        }

        public async Task<User> GetUserByEmail(string email)
        {
            return await userRepository.GetByEmailAsync(email);
        }
    }
}
