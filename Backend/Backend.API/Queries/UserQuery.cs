using Backend.Core.Entities;
using Backend.Core.Repositories;
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
        public async Task<User> GetUserByEmail(string email)
        {
            var res = await userRepository.GetByEmailAsync(email);
            if (res == null) throw new GraphQLException(ErrorBuilder.New().SetMessage("Email not registered").SetCode("ABCODE").Build());
            //new Error("email not registered")
            return res;
        }
    }
}
