using AppAny.HotChocolate.FluentValidation;
using Backend.API.Validators.UserValidators;
using Backend.Core.Entities;
using Backend.Core.Enums;
using Backend.Core.Repositories;
using Backend.Utils.Authentication;

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

        public async Task<string?> Signup([UseFluentValidation, UseValidator<UserSignupValidator>] User user, Currency currency, [Service] IUserRepository userRepository, [Service] IAccountRepository accountRepository)
        {
            var registeredUsers = await userRepository.GetByEmailAsync(email: user.Email);

            if (registeredUsers != null)
            {
                throw new GraphQLException("User already registered.");
            }
            var defaultAccount = await accountRepository.GenerateNewDefaultAccount(user: user, currency: currency);
            user.Accounts = new List<Account>() { defaultAccount };
            

            await userRepository.Signup(user: user);

            string accessToken = AuthenticationUtils.GenerateAccessToken(jwtKey: _configuration.GetValue<string>("JwtKey") ?? "");

            return accessToken;
        }

        public async Task<string?> Login([UseFluentValidation, UseValidator<UserLoginValidator>] User user, [Service] IUserRepository userRepository)
        {
            var registeredUser = await userRepository.GetByEmailAsync(user.Email);
            string accessToken;

            if (registeredUser == null)
            {
                throw new GraphQLException("User not registered.");
            }

            if (!AuthenticationUtils.VerifyPassword(inputPassword: user.Password, hashedPassword: registeredUser.Password))
            {
                throw new GraphQLException("Wrong password.");
            }
            else
            {
                accessToken = AuthenticationUtils.GenerateAccessToken(jwtKey: _configuration.GetValue<string>("JwtKey") ?? "");
            }

            return accessToken;
        }
    }
}
