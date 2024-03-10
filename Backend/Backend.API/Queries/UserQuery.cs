using Backend.Core.Entities;
using Backend.Core.Repositories;
using Backend.Utils.Exceptions;
using HotChocolate.Authorization;

namespace Backend.API.Queries
{
    [ExtendObjectType("Query")]
    public class UserQuery ([Service] IUserRepository userRepository)
    {
        [AllowAnonymous]
        public Task<IEnumerable<User>> GetUsersAsync() => userRepository.GetAllAsync();

        [AllowAnonymous]
        public async Task<bool> UserExistByEmail(string email)
        {
            User user = await userRepository.GetByEmailAsync(email);
            return user != null;
        }

        [AllowAnonymous]
        [Error<GenericException>]
        public async Task<User> GetUserByEmail(string email)
        {
            return await userRepository.GetByEmailAsync(email) ?? throw new GenericException("Email not registered");
        }
    }
}
