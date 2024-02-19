using AppAny.HotChocolate.FluentValidation;
using Backend.API.Mutations;
using Backend.API.Properties;
using Backend.API.Queries;

namespace Backend.API.Configuration
{
    public class GraphQLServiceInstaller : IServiceInstaller
    {
        public void Install(IServiceCollection services, IConfiguration configuration)
        {
            services
                .AddGraphQLServer()
                .AddAuthorization()
                .AddQueryType(d => d.Name("Query")) // Queries section
                    .AddTypeExtension<AccountQuery>()
                    .AddTypeExtension<CategoryQuery>()
                    .AddTypeExtension<TransactionQuery>()
                    .AddTypeExtension<UserQuery>()
                .AddMutationType(d => d.Name("Mutation")) // Mutations section
                    .AddTypeExtension<CategoryMutation>()
                    .AddTypeExtension<UserMutation>()
                    .AddTypeExtension<TransactionMutation>()
                .AddFluentValidation();
        }
    }
}
