using Backend.API.Validators.Category;
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
            // User
            services.AddTransient<LoginInputValidator>();
            services.AddTransient<SignupInputValidator>();
            // Transaction
            services.AddTransient<AddOrUpdateTransactionInputValidator>();
            services.AddTransient<DeleteTransactionInputValidator>();
            services.AddTransient<DeleteTransactionListInputValidator>();
            services.AddTransient<FilterTransactionListInputValidator>();
            // Category
            services.AddTransient<AddCategoryInputValidator>();
            services.AddTransient<AddSubCategoryInputValidator>();
            services.AddTransient<EditCategoryInputValidator>();
            services.AddTransient<DeleteCategoryInputValidator>();
        }
    }
}
