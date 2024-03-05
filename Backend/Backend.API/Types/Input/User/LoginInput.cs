namespace Backend.API.Types.Input.User
{
    public class LoginInput
    {
        public required string Email { get; init; }
        public required string Password { get; init; }
    }
}
