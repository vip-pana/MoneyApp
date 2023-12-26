using Backend.Core.Entities;

namespace Backend.API.Subscriptions
{
    [ExtendObjectType("Subscription")]
    public class ProductSubscriptions
    {
        [Subscribe]
        [Topic]
        public Task<Product> OnCreateAsync([EventMessage] Product product) => 
            Task.FromResult(product);

        [Subscribe]
        [Topic]
        public Task<string> onRemoveAsync([EventMessage] string productId) => 
            Task.FromResult(productId);
    }
}
