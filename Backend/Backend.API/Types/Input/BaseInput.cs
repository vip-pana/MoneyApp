namespace Backend.API.Types.Input
{
    public class BaseInput
    {
        public required string UserEmail { get; init; }
        public required string SelectedAccountId { get; init; }
    }
}
