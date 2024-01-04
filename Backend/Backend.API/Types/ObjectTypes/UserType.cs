using Backend.Core.Entities;

namespace Backend.API.Types.ObjectTypes
{
    public class UserType : ObjectType<User>
    {
        protected override void Configure(IObjectTypeDescriptor<User> descriptor)
        {
        }
    }
}
