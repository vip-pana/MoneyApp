using Backend.Infrastructure.Configurations;

namespace Backend.API.Configuration
{
    public class DatabaseServiceInstaller : IServiceInstaller
    {
        public void Install(IServiceCollection services, IConfiguration configuration)
        {
            services.Configure<MongoDbConfiguration>(configuration.GetSection("MongoDbConfiguration"));
        }
    }
}
