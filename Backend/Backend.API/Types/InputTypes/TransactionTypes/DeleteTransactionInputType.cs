namespace Backend.API.Types.InputTypes.TransactionTypes
{
    public class DeleteTransactionInputType
    {
        public required string TransactionId { get; init; }
        public required string UserEmail { get; init; }
        public required string AccountId { get; init; }
    }
}
