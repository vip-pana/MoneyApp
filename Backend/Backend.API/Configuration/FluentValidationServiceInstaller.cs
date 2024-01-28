using Backend.API.Validators.UserValidators;
using FluentValidation.AspNetCore;

namespace Backend.API.Configuration
{
    public class FluentValidationServiceInstaller : IServiceInstaller
    {
        public void Install(IServiceCollection services, IConfiguration configuration)
        {
            services.AddFluentValidationAutoValidation();
            services.AddTransient<UserLoginValidator>();
            services.AddTransient<UserSignupValidator>();
        }
    }
}
