namespace Backend.API.Types.InputTypes.UserTypes
{
    public class UserLoginInputType
    {
        public required string Email { get; init; }
        public required string Password { get; init; }
    }
}
