using Backend.Core.Repositories;
using Backend.Infrastructure.Data;
using Backend.Infrastructure.Repositories;

namespace Backend.API.Configuration
{
    public class RepositoryServiceInstaller : IServiceInstaller
    {
        public void Install(IServiceCollection services, IConfiguration configuration)
        {
            services.AddSingleton<IDbContext, DbContext>();
            services.AddScoped(typeof(IBaseRepository<>), typeof(BaseRepository<>));
            services.AddScoped<IAccountRepository, AccountRepository>();
            services.AddScoped<ICategoryRepository, CategoryRepository>();
            services.AddScoped<ITransactionRepository, TransactionRepository>();
            services.AddScoped<IUserRepository, UserRepository>();
        }
    }
}
