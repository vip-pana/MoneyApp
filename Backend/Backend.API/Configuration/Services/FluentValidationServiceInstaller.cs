using Backend.API.Validators.TransactionValidators;
using Backend.API.Validators.UserValidators;
using FluentValidation.AspNetCore;

namespace Backend.API.Configuration
{
    public class FluentValidationServiceInstaller : IServiceInstaller
    {
        public void Install(IServiceCollection services, IConfiguration configuration)
        {
            services.AddFluentValidationAutoValidation();
            services.AddTransient<UserLoginInputTypeValidator>();
            services.AddTransient<UserSignupInputTypeValidator>();
            services.AddTransient<BaseTransactionInputTypeValidator>();
            services.AddTransient<DeleteTransactionInputTypeValidator>();
            services.AddTransient<DeleteTransactionListInputTypeValidator>();
            services.AddTransient<TransactionFilterInputTypeValidator>();
        }
    }
}
