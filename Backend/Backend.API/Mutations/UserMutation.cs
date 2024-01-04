using AppAny.HotChocolate.FluentValidation;
using Backend.API.Validators.UserValidators;
using Backend.Core.Entities;
using Backend.Core.Repositories;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Text;

namespace Backend.API.Properties
{
    [ExtendObjectType("Mutation")]
    public class UserMutation
    {
        private readonly IConfiguration _configuration;

        public UserMutation(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        public async Task<string?> Signin([UseFluentValidation, UseValidator<UserValidator>] User user, [Service] IUserRepository userRepository)
        {
            var registeredUsers = await userRepository.GetByEmailAsync(user.Email);

            if (registeredUsers != null)
            {
                throw new GraphQLException("User already registered.");
            }

            var newUser = await userRepository.Signin(user);

            string accessToken = GenerateAccessToken(email: newUser.Email, userId: Guid.NewGuid().ToString());

            return accessToken;
        }

        private string GenerateAccessToken(string email, string? userId)
        {
            var tokenSettings = _configuration.GetValue<string>("JwtKey");

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(tokenSettings));

            var signingCredentials = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var token = new JwtSecurityToken(
               "issuer",
               "audience",
               expires: DateTime.Now.AddDays(90),
               signingCredentials: signingCredentials);

            return new JwtSecurityTokenHandler().WriteToken(token);
        }
    }
}
