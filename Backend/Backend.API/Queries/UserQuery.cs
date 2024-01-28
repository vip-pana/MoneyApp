﻿using Backend.Core.Entities;
using Backend.Core.Repositories;

namespace Backend.API.Queries
{
    [ExtendObjectType("Query")]
    public class UserQuery
    {
        public Task<IEnumerable<User>> GetUsersAsync([Service] IUserRepository userRepository) => userRepository.GetAllAsync();
        public async Task<bool> UserExistByEmail([Service] IUserRepository userRepository, string email)
        {

            User user = await userRepository.GetByEmailAsync(email);

            return user != null;
        }

        public async Task<User> GetUserByEmail([Service] IUserRepository userRepository, string email)
        {
            return await userRepository.GetByEmailAsync(email);
        }
    }
}
