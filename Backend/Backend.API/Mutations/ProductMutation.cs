using Backend.Core.Entities;
using Backend.Core.Repositories;
using HotChocolate.Subscriptions;

namespace Backend.API.Mutations
{
    [ExtendObjectType(Name = "Mutation")]
    public class ProductMutation
    {
        public async Task<Product> CreateProductAsync(Product product, [Service] IProductRepository productRepository, [Service] ITopicEventSender eventSender)
        {
            var result = await productRepository.InsertAsync(product);

            await eventSender.SendAsync(nameof(Subscriptions.ProductSubscriptions.OnCreateAsync), result);

            return result;
        }
        public async Task<bool> RemoveProductAsync(string id, [Service] IProductRepository productRepository, [Service] ITopicEventSender eventSender)
        {
            var result = await productRepository.RemoveAsync(id);

            if (result)
            {
                await eventSender.SendAsync(nameof(Subscriptions.ProductSubscriptions.onRemoveAsync), result);
            }

            return result;
        }
    }
}
