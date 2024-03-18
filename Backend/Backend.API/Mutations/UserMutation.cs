using System.Security.Claims;
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
                JwtRefreshKey = jwtConfiguration.Value.RefreshKey,
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
        public async Task<TokenResponse> Signup([UseFluentValidation, UseValidator<SignupInputValidator>] SignupInput input)
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

            return GenerateTokens(newUser);
        }

        [AllowAnonymous]
        [Error<GenericException>]
        [Error<UserNotExistException>]
        [Error<WrongPasswordException>]
        public async Task<TokenResponse> Login([UseFluentValidation, UseValidator<LoginInputValidator>] LoginInput input)
        {
            TokenResponse tokenResponse;
            var registeredUser = await _userRepository.GetByEmailAsync(input.Email) ?? throw new UserNotExistException(Email: input.Email);

            if (!AuthenticationUtils.VerifyPassword(inputPassword: input.Password, hashedPassword: registeredUser.Password))
            {
                throw new WrongPasswordException();
            }
            else
            {
                await IncrementTokenVersion(registeredUser);
                tokenResponse = GenerateTokens(registeredUser);
            }

            return tokenResponse;
        }

        [Error<GenericException>]
        public async Task<TokenResponse?> RefreshToken(string refreshToken)
        {
            TokenResponse? tokenResponse = null;

            if (refreshToken is not null)
            {
                var jwt = AuthenticationUtils.ReadToken(refreshToken);
                var userId = jwt.Claims.First(f => f.Type == ClaimTypes.NameIdentifier).Value;

                if (userId is not null)
                {
                    var registeredUser = await _userRepository.GetByIdAsync(userId);
                    var tokenVersion = jwt.Claims.First(f => f.Type == ClaimTypes.Version).Value;

                    if (registeredUser is not null && registeredUser.TokenVersion.ToString() == tokenVersion)
                    {
                        await IncrementTokenVersion(registeredUser);
                        tokenResponse = GenerateTokens(registeredUser);
                    }
                }
                else
                {
                    throw new GenericException("refreshToken not provided");
                }
            }
            else
            {
                throw new GenericException("refreshToken not provided");
            }

            return tokenResponse;
        }
        #endregion

        #region PRIVATE METHODS
        private async Task IncrementTokenVersion(User user)
        {
            user.TokenVersion += 1;
            await _userRepository.UpdateAsync(user);
        }

        private TokenResponse GenerateTokens(User user)
        {
            _jwtParams.Claims = AuthenticationUtils.GenerateClaims(user.Id, user.TokenVersion);

            var newAccessToken = AuthenticationUtils.GenerateAccessToken(jwtParams: _jwtParams);
            var newRefreshToken = AuthenticationUtils.GenerateRefreshToken(jwtParams: _jwtParams);

            return new TokenResponse { AccessToken = newAccessToken, RefreshToken = newRefreshToken };
        }
        #endregion
    }
}