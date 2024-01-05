using Backend.Core.Entities;

namespace Backend.API.Types.InputTypes
{
    public class InputUserType : InputObjectType<User>
    {
        protected override void Configure( IInputObjectTypeDescriptor<User> descriptor)
        {
        }
    }
}
