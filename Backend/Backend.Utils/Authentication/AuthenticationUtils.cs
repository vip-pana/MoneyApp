using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.IdentityModel.Tokens;

namespace Backend.Utils.Authentication
{
    public static class AuthenticationUtils
    {
        public static string GenerateAccessToken(JwtParams jwtParams)
        {
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtParams.JwtKey));

            var signingCredentials = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var token = new JwtSecurityToken(
               jwtParams.JwtIssuer,
               jwtParams.JwtAudience,
               claims: jwtParams.Claims,
               expires: DateTime.Now.AddHours(1),
               signingCredentials: signingCredentials);

            return new JwtSecurityTokenHandler().WriteToken(token);
        }

        public static string HashPassword(string password)
        {
            return BCrypt.Net.BCrypt.HashPassword(password);
        }

        public static bool VerifyPassword(string inputPassword, string hashedPassword)
        {
           return BCrypt.Net.BCrypt.Verify(inputPassword, hashedPassword);
        }
    }

    public class JwtParams
    {
        public required string JwtKey { get; set; }
        public required string JwtIssuer { get; set; }
        public required string JwtAudience { get; set; }
        public IEnumerable<Claim>? Claims { get; set; }
    }
}
