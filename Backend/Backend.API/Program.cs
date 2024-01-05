using AppAny.HotChocolate.FluentValidation;
using Backend.API.Mutations;
using Backend.API.Properties;
using Backend.API.Queries;
using Backend.API.Resolvers;
using Backend.API.Subscriptions;
using Backend.API.Types.ObjectTypes;
using Backend.API.Validators.UserValidators;
using Backend.Core.Repositories;
using Backend.Infrastructure.Configurations;
using Backend.Infrastructure.Data;
using Backend.Infrastructure.Repositories;
using FluentValidation.AspNetCore;

namespace Backend.API
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            // MongoDbConfiguration
            builder.Services.Configure<MongoDbConfiguration>(builder.Configuration.GetSection("MongoDbConfiguration"));

            // Fluent Validation
            builder.Services.AddFluentValidationAutoValidation();
            builder.Services.AddTransient<UserSigninValidator>();
            builder.Services.AddTransient<UserSignupValidator>();

            // Repositories
            builder.Services.AddSingleton<IDbContext, DbContext>();
            builder.Services.AddScoped(typeof(IBaseRepository<>), typeof(BaseRepository<>));
            builder.Services.AddScoped<ICategoryRepository, CategoryRepository>();
            builder.Services.AddScoped<IUserRepository, UserRepository>();
            builder.Services.AddScoped<IProductRepository, ProductRepository>();

            // GraphQL
            builder.Services
                .AddGraphQLServer()
                .AddQueryType(d => d.Name("Query")) // Queries section
                    .AddTypeExtension<ProductQuery>()
                    .AddTypeExtension<CategoryQuery>()
                    .AddTypeExtension<UserQuery>()
                .AddMutationType(d => d.Name("Mutation")) // Mutations section
                    .AddTypeExtension<ProductMutation>()
                    .AddTypeExtension<CategoryMutation>()
                    .AddTypeExtension<UserMutation>()
                .AddSubscriptionType(d => d.Name("Subscription")) // Subscriptions section
                    .AddTypeExtension<ProductSubscriptions>()
                .AddType<ProductType>() // Types section
                .AddType<UserType>() // Types section
                .AddType<CategoryResolver>()
                .AddInMemorySubscriptions()
                .AddFluentValidation();

            var app = builder.Build();

            app.UseWebSockets();
            app.MapGraphQL();

            app.Run();
        }
    }
}
