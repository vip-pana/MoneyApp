using Backend.Core.Entities;

namespace Backend.API.Types.InputTypes.UserType
{
    public class InputUserType : InputObjectType<User>
    {
        protected override void Configure(IInputObjectTypeDescriptor<User> descriptor)
        {
            // Method intentionally left empty.
        }
    }
}
