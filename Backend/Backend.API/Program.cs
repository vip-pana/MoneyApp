using Backend.API.Mutations;
using Backend.API.Queries;
using Backend.API.Resolvers;
using Backend.API.Subscriptions;
using Backend.API.Types;
using Backend.Core.Repositories;
using Backend.Infrastructure.Configurations;
using Backend.Infrastructure.Data;
using Backend.Infrastructure.Repositories;

namespace Backend.API
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            // MongoDbConfiguration
            builder.Services.Configure<MongoDbConfiguration>(builder.Configuration.GetSection("MongoDbConfiguration"));

            // Repositories
            builder.Services.AddSingleton<ICatalogContext, CatalogContext>();
            builder.Services.AddScoped(typeof(IBaseRepository<>), typeof(BaseRepository<>));
            builder.Services.AddScoped<ICategoryRepository, CategoryRepository>();
            builder.Services.AddScoped<IProductRepository, ProductRepository>();

            // GraphQL
            builder.Services
                .AddGraphQLServer()
                .AddQueryType(d => d.Name("Query"))
                    .AddTypeExtension<ProductQuery>()
                    .AddTypeExtension<CategoryQuery>()
                .AddMutationType(d => d.Name("Mutation"))
                    .AddTypeExtension<ProductMutation>()
                    .AddTypeExtension<CategoryMutation>()
                .AddSubscriptionType(d => d.Name("Subscription"))
                    .AddTypeExtension<ProductSubscriptions>()
                .AddType<ProductType>()
                .AddType<CategoryResolver>()
                .AddInMemorySubscriptions();

            var app = builder.Build();

            app.UseWebSockets();
            app.MapGraphQL();

            app.Run();
        }
    }
}
