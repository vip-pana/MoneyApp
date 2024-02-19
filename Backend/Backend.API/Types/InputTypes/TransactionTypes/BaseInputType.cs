namespace Backend.API.Types.InputTypes.TransactionTypes
{
    public class BaseInputType
    {
        public required string UserEmail { get; init; }
        public required string AccountId { get; init; }
    }
}
