using Backend.API.Config;
using Backend.API.Repositories;
using Backend.API.Schema.Mutations;
using Backend.API.Schema.Queries;

namespace Backend.API
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            builder.Services.Configure<DatabaseSettings>(builder.Configuration.GetSection("MongoDatabase"));
            builder.Services.AddSingleton<UserRepository>();

            builder.Services.AddGraphQLServer()
                .AddQueryType<Query>()
                .AddMutationType<Mutation>();

            var app = builder.Build();

            app.MapGraphQL();

            app.Run();
        }
    }
}
