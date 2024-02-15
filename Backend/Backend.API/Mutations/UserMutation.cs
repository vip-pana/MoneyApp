using System.Security.Claims;
using AppAny.HotChocolate.FluentValidation;
using Backend.API.Configuration.Models;
using Backend.API.Validators.UserValidators;
using Backend.Core.Entities;
using Backend.Core.Enums;
using Backend.Core.Repositories;
using Backend.Utils.Authentication;
using Microsoft.Extensions.Options;

namespace Backend.API.Properties
{
    [ExtendObjectType("Mutation")]
    public class UserMutation
    {
        private readonly JwtConfiguration _jwtConfiguration;

        public UserMutation(IOptions<JwtConfiguration> jwtConfiguration)
        {
            _jwtConfiguration = jwtConfiguration.Value;
        }

        #region LOGIN AND SIGNUP
        public async Task<string?> Signup([UseFluentValidation, UseValidator<UserSignupValidator>] User user, Currency currency, [Service] IUserRepository userRepository, [Service] IAccountRepository accountRepository)
        {
            var registeredUser = await userRepository.GetByEmailAsync(email: user.Email);

            if (registeredUser != null)
            {
                throw new GraphQLException("User already registered.");
            }
            var defaultAccount = await accountRepository.GenerateNewDefaultAccount(user: user, currency: currency);
            user.Accounts = new List<Account>() { defaultAccount };


            await userRepository.Signup(user: user);

            var jwtParams = new JwtParams
            {
                JwtKey = _jwtConfiguration.Key,
                JwtIssuer = _jwtConfiguration.Issuer,
                JwtAudience = _jwtConfiguration.Audience,
                Claims = new List<Claim>
                {
                    new Claim(ClaimTypes.Name, user.Email),
                    new Claim("JWTID", Guid.NewGuid().ToString()),
                }
            };
            string accessToken = AuthenticationUtils.GenerateAccessToken(jwtParams: jwtParams);

            return accessToken;
        }

        public async Task<string?> Login([UseFluentValidation, UseValidator<UserLoginValidator>] User user, [Service] IUserRepository userRepository)
        {
            var registeredUser = await userRepository.GetByEmailAsync(user.Email);
            string accessToken;

            if (registeredUser is null)
            {
                throw new GraphQLException("User not registered.");
            }

            if (!AuthenticationUtils.VerifyPassword(inputPassword: user.Password, hashedPassword: registeredUser.Password))
            {
                throw new GraphQLException("Wrong password.");
            }
            else
            {
                var jwtParams = new JwtParams
                {
                    JwtKey = _jwtConfiguration.Key,
                    JwtIssuer = _jwtConfiguration.Issuer,
                    JwtAudience = _jwtConfiguration.Audience,
                    Claims = new List<Claim>
                    {
                        new Claim(ClaimTypes.Name, user.Email),
                        new Claim("JWTID", Guid.NewGuid().ToString()),
                    }
                };
                accessToken = AuthenticationUtils.GenerateAccessToken(jwtParams: jwtParams);
            }

            return accessToken;
        }

        #endregion    }
    }
}
