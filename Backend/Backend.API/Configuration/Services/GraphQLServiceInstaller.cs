using AppAny.HotChocolate.FluentValidation;
using Backend.API.Mutations;
using Backend.API.Properties;
using Backend.API.Queries;
using Backend.API.Resolvers;
using Backend.API.Subscriptions;
using Backend.API.Types.ObjectTypes;

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
                    .AddTypeExtension<CategoryProductQuery>()
                    .AddTypeExtension<CategoryQuery>()
                    .AddTypeExtension<ProductQuery>()
                    .AddTypeExtension<TransactionQuery>()
                    .AddTypeExtension<UserQuery>()
                .AddMutationType(d => d.Name("Mutation")) // Mutations section
                    .AddTypeExtension<ProductMutation>()
                    .AddTypeExtension<CategoryProductMutation>()
                    .AddTypeExtension<CategoryMutation>()
                    .AddTypeExtension<UserMutation>()
                    .AddTypeExtension<TransactionMutation>()
                .AddSubscriptionType(d => d.Name("Subscription")) // Subscriptions section
                    .AddTypeExtension<ProductSubscriptions>()
                .AddType<CategoryProductResolver>()
                .AddType<ProductType>() // Types section
                .AddType<UserType>() // Types section
                .AddInMemorySubscriptions()
                .AddFluentValidation();
        }
    }
}
