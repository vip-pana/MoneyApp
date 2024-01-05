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

        public async Task<string?> Signup([UseFluentValidation, UseValidator<UserValidator>] User user, [Service] IUserRepository userRepository)
        {
            var registeredUsers = await userRepository.GetByEmailAsync(user.Email);

            if (registeredUsers != null)
            {
                throw new GraphQLException("User already registered.");
            }

            var newUser = await userRepository.Signup(user);

            string? accessToken = null;

            if (newUser != null)
            {
                accessToken = GenerateAccessToken(user: newUser, userId: Guid.NewGuid().ToString());
            }

            return accessToken;
        }

        private string GenerateAccessToken(User user, string? userId)
        {
            var tokenSettings = _configuration.GetValue<string>("JwtKey");
            JwtSecurityToken? token = null;

            if (tokenSettings != null && userId != null)
            {
                var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(tokenSettings));

                var signingCredentials = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

                var claims = new[]
                {
                    new System.Security.Claims.Claim("userId", userId)
                };

                token = new JwtSecurityToken(
                    issuer: user.Name + " "+ user.Surname,
                    audience: "audience",
                    claims: claims,
                    expires: DateTime.Now.AddMinutes(1),
                    signingCredentials: signingCredentials);
            }

            return new JwtSecurityTokenHandler().WriteToken(token);
        }
    }
}
