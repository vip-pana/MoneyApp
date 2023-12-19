using Backend.API.Resolvers;
using Backend.Core.Entities;

namespace Backend.API.Types
{
    public class ProductType : ObjectType<Product>
    {
        protected override void Configure(IObjectTypeDescriptor<Product> descriptor)
        {
            descriptor.Field(_ => _.Id);
            descriptor.Field(_ => _.CategoryId);
            descriptor.Field(_ => _.Name);
            descriptor.Field(_ => _.Description);
            descriptor.Field(_ => _.Price);
            descriptor.Field(_ => _.Quantity);

        // Creates the relationship between Product x Category
        descriptor.Field<CategoryResolver>(_ => _.GetCategoryAsync(default, default));
        }
    }
}
