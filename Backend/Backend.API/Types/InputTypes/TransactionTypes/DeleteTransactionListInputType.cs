namespace Backend.API.Types.InputTypes.TransactionTypes
{
    public class DeleteTransactionListInputType
    {
        public required List<string> TransactionIds { get; init; }
        public required string UserEmail { get; init; }
        public required string AccountId { get; init; }
    }
}
