using Backend.Core.Entities;
using Backend.Core.Repositories;
using HotChocolate;
using HotChocolate.Subscriptions;
using HotChocolate.Types;

namespace Backend.API.Mutations
{
    [ExtendObjectType("Mutation")]
    public class ProductMutation
    {
        public async Task<Product> CreateProductAsync(Product product, [Service] IProductRepository productRepository, [Service] ITopicEventSender eventSender)
        {
            var res = await productRepository.InsertAsync(product);

            await eventSender.SendAsync(nameof(Subscriptions.ProductSubscriptions.OnCreateAsync), res);

            return res;
        }
        public async Task<bool> RemoveProductAsync(string id, [Service] IProductRepository productRepository, [Service] ITopicEventSender eventSender)
        {
            var res = await productRepository.RemoveAsync(id);

            if (res)
            {
                await eventSender.SendAsync(nameof(Subscriptions.ProductSubscriptions.onRemoveAsync), res);
            }

            return res;
        }
    }
}
