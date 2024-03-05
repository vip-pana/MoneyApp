using AppAny.HotChocolate.FluentValidation;
using Backend.API.Configuration.Models;
using Backend.API.Types.InputTypes.User;
using Backend.API.Types.OutputTypes;
using Backend.API.Validators.UserValidators;
using Backend.Core.Entities;
using Backend.Core.Repositories;
using Backend.Utils.Authentication;
using Backend.Utils.Exceptions;
using HotChocolate.Authorization;
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
        [AllowAnonymous]
        [Error<UserAlreadyExistException>]
        [Error<GenericException>]
        public async Task<string> Signup([UseFluentValidation, UseValidator<UserSignupInputTypeValidator>] SignupInput user)
        {
            var registeredUser = await _userRepository.GetByEmailAsync(email: user.Email);

            if (registeredUser is not null) throw new UserAlreadyExistException();

            var defaultAccount = await _accountRepository.GenerateNewDefaultAccount(currency: user.SelectedCurrency);

            User newUser = new()
            {
                Name = user.Name,
                Surname = user.Surname,
                Email = user.Email,
                Accounts = [defaultAccount],
                Password = AuthenticationUtils.HashPassword(user.Password)
            };

            await _userRepository.Signup(user: newUser);

            string accessToken = AuthenticationUtils.GenerateAccessToken(jwtParams: _jwtParams);

            return accessToken;
        }

        [AllowAnonymous]
        [Error<GenericException>]
        [Error<UserNotExistException>]
        [Error<WrongPasswordException>]
        public async Task<AccessOutputType> Login([UseFluentValidation, UseValidator<UserLoginInputTypeValidator>] LoginInput user)
        {
            string accessToken;
            var registeredUser = await _userRepository.GetByEmailAsync(user.Email) ?? throw new UserNotExistException(Email: user.Email);

            if (!AuthenticationUtils.VerifyPassword(inputPassword: user.Password, hashedPassword: registeredUser.Password))
            {
                throw new WrongPasswordException();
            }
            else
            {
                accessToken = AuthenticationUtils.GenerateAccessToken(jwtParams: _jwtParams);
            }

            var access = new AccessOutputType { AccessToken = accessToken };

            return access;
        }
        #endregion
    }
}