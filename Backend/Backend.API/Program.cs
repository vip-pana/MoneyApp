using Backend.API.Queries;
using Backend.API.Resolvers;
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
            //builder.Services.AddSingleton(builder.Configuration.Get<ApiConfiguration>().MongoDbConfiguration);

            // Repositories
            builder.Services.AddSingleton<ICatalogContext, CatalogContext>();
            builder.Services.AddScoped<ICategoryRepository, CategoryRepository>();
            builder.Services.AddScoped<IProductRepository, ProductRepository>();

            // GraphQL
            builder.Services
                .AddGraphQLServer()
                .AddQueryType<Query>()
                .AddType<ProductType>()
                .AddType<CategoryResolver>();

            var app = builder.Build();

            app.MapGraphQL();

            app.Run();
        }
    }
}
