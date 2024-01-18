
namespace Backend.API.Configuration
{
    public class CorsServiceInstaller : IServiceInstaller
    {
        public void Install(IServiceCollection services, IConfiguration configuration)
        {
            var MyAllowSpecificOrigins = configuration.GetValue<string>("MyAllowSpecificOrigins");

            services.AddCors(options =>
            {
                options.AddPolicy(name: "corspolicy", policy => { policy.WithOrigins("*").AllowAnyMethod().AllowAnyHeader(); });
            });
        }
    }
}
