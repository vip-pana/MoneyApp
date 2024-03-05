using Backend.API.Validators.Transaction;
using Backend.API.Validators.User;
using FluentValidation.AspNetCore;

namespace Backend.API.Configuration
{
    public class FluentValidationServiceInstaller : IServiceInstaller
    {
        public void Install(IServiceCollection services, IConfiguration configuration)
        {
            services.AddFluentValidationAutoValidation();
            services.AddTransient<LoginInputValidator>();
            services.AddTransient<SignupInputValidator>();
            services.AddTransient<BaseTransactionInputValidator>();
            services.AddTransient<DeleteTransactionInputValidator>();
            services.AddTransient<DeleteTransactionListInputValidator>();
            services.AddTransient<FilterTransactionListInputValidator>();
        }
    }
}
