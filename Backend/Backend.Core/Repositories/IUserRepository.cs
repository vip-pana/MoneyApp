using Backend.Core.Entities;

namespace Backend.Core.Repositories
{
    public interface IUserRepository : IBaseRepository<User>
    {
        public Task<User> Signin(User user);
        public Task<User> GetByEmailAsync(string email);
    }
}
