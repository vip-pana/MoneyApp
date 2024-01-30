
namespace Backend.API.Configuration
{
    public class CorsServiceInstaller : IServiceInstaller
    {
        public void Install(IServiceCollection services, IConfiguration configuration)
        {
            var corsPolicy = configuration.GetValue<string>("corsPolicy");
            var allowedHosts = configuration.GetValue<string>("AllowedFrontendHosts");

            services.AddCors(options =>
            {
                if (corsPolicy != null && allowedHosts != null)
                {
                    options.AddPolicy(name: corsPolicy, policy => { policy.WithOrigins(allowedHosts).AllowAnyMethod().AllowAnyHeader(); });
                }
            });
        }
    }
}
