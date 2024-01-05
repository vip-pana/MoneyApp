using Backend.Core.Entities;
using HotChocolate.Types;

namespace Backend.API.Types.ObjectTypes
{
    public class UserType : ObjectType<User>
    {
        protected override void Configure(IObjectTypeDescriptor<User> descriptor)
        {
        }
    }
}
