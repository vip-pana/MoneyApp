using System.Text;
using Backend.API.Configuration.Models;
using Microsoft.IdentityModel.Tokens;

namespace Backend.API.Configuration.Services
{
    public class AuthServiceInstaller : IServiceInstaller
    {
        public void Install(IServiceCollection services, IConfiguration configuration)
        {
            services.AddOptions<JwtConfiguration>().Bind(configuration.GetSection("Jwt")).ValidateDataAnnotations();

            services.AddAuthentication().AddJwtBearer(options =>
            {
                var jwtConfiuration = configuration.GetSection("Jwt").Get<JwtConfiguration>();

                ArgumentNullException.ThrowIfNull(jwtConfiuration);

                options.TokenValidationParameters = new TokenValidationParameters
                {
                    IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtConfiuration.Key)),
                    ValidIssuer = jwtConfiuration.Issuer,
                    ValidAudience = jwtConfiuration.Audience,
                    RequireExpirationTime = true,
                    ValidateIssuer = true,
                    ValidateAudience = true,
                    ValidateLifetime = true,
                    ValidateIssuerSigningKey = true
                };
                options.RequireHttpsMetadata = false;
            });
        }
    }
}
