using AppAny.HotChocolate.FluentValidation;
using Backend.API.Configuration.Models;
using Backend.API.Types.InputTypes.UserTypes;
using Backend.API.Validators.UserValidators;
using Backend.Core.Entities;
using Backend.Core.Repositories;
using Backend.Utils.Authentication;
using Microsoft.Extensions.Options;

namespace Backend.API.Properties
{
    [ExtendObjectType("Mutation")]
    public class UserMutation
    {
        private readonly JwtParams _jwtParams;
        private readonly IUserRepository _userRepository;
        private readonly IAccountRepository _accountRepository;
        public UserMutation(IOptions<JwtConfiguration> jwtConfiguration, [Service] IAccountRepository accountRepository, [Service] IUserRepository userRepository)
        {
            _jwtParams = new JwtParams()
            {
                JwtKey = jwtConfiguration.Value.Key,
                JwtIssuer = jwtConfiguration.Value.Issuer,
                JwtAudience = jwtConfiguration.Value.Audience,
            };

            _accountRepository = accountRepository;
            _userRepository = userRepository;
        }

        #region LOGIN AND SIGNUP
        public async Task<string> Signup([UseFluentValidation, UseValidator<UserSignupInputTypeValidator>] UserSignupInputType user)
        {
            var registeredUser = await _userRepository.GetByEmailAsync(email: user.Email);

            if (registeredUser != null) throw new GraphQLException("User already registered.");

            var defaultAccount = await _accountRepository.GenerateNewDefaultAccount(currency: user.SelectedCurrency);

            User newUser = new()
            {
                Name = user.Name,
                Email = user.Email,
                Accounts = [defaultAccount],
                Surname = user.Name,
                Password = AuthenticationUtils.HashPassword(user.Password)
            };

            await _userRepository.Signup(user: newUser);

            string accessToken = AuthenticationUtils.GenerateAccessToken(jwtParams: _jwtParams);

            return accessToken;
        }

        public async Task<string> Login([UseFluentValidation, UseValidator<UserLoginInputTypeValidator>] UserLoginInputType user)
        {
            var registeredUser = await _userRepository.GetByEmailAsync(user.Email);
            string accessToken;

            if (registeredUser == null) throw new GraphQLException("User not registered.");

            if (!AuthenticationUtils.VerifyPassword(inputPassword: user.Password, hashedPassword: registeredUser.Password))
            {
                throw new GraphQLException("Wrong password.");
            }
            else
            {
                accessToken = AuthenticationUtils.GenerateAccessToken(jwtParams: _jwtParams);
            }

            return accessToken;
        }
        #endregion
    }
}
