using Backend.Core.Entities;
using HotChocolate.Types;

namespace Backend.API.Types.InputTypes
{
    public class InputUserType : InputObjectType<User>
    {
        protected override void Configure( IInputObjectTypeDescriptor<User> descriptor)
        {
        }
    }
}
