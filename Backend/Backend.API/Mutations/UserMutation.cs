using AppAny.HotChocolate.FluentValidation;
using Backend.API.Configuration.Models;
using Backend.API.Types.Input.User;
using Backend.API.Types.Output;
using Backend.API.Validators.User;
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
        public async Task<string> Signup([UseFluentValidation, UseValidator<SignupInputValidator>] SignupInput input)
        {
            var registeredUser = await _userRepository.GetByEmailAsync(email: input.Email);

            if (registeredUser is not null) throw new UserAlreadyExistException();

            var defaultAccount = await _accountRepository.GenerateNewDefaultAccount(currency: input.SelectedCurrency);

            User newUser = new()
            {
                Name = input.Name,
                Surname = input.Surname,
                Email = input.Email,
                Accounts = [defaultAccount],
                Password = AuthenticationUtils.HashPassword(input.Password)
            };

            await _userRepository.Signup(user: newUser);

            string accessToken = AuthenticationUtils.GenerateAccessToken(jwtParams: _jwtParams);

            return accessToken;
        }

        [AllowAnonymous]
        [Error<GenericException>]
        [Error<UserNotExistException>]
        [Error<WrongPasswordException>]
        public async Task<AccessOutput> Login([UseFluentValidation, UseValidator<LoginInputValidator>] LoginInput input)
        {
            string accessToken;
            var registeredUser = await _userRepository.GetByEmailAsync(input.Email) ?? throw new UserNotExistException(Email: input.Email);

            if (!AuthenticationUtils.VerifyPassword(inputPassword: input.Password, hashedPassword: registeredUser.Password))
            {
                throw new WrongPasswordException();
            }
            else
            {
                accessToken = AuthenticationUtils.GenerateAccessToken(jwtParams: _jwtParams);
            }

            var access = new AccessOutput { AccessToken = accessToken };

            return access;
        }
        #endregion
    }
}