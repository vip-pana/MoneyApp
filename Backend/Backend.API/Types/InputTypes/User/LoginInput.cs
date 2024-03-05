namespace Backend.API.Types.InputTypes.User
{
    public class LoginInput
    {
        public required string Email { get; init; }
        public required string Password { get; init; }
    }
}
