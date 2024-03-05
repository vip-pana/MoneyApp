namespace Backend.API.Types.InputTypes
{
    public class BaseInput
    {
        public required string UserEmail { get; init; }
        public required string AccountId { get; init; }
    }
}
