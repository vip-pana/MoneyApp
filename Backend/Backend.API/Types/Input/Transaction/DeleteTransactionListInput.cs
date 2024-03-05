namespace Backend.API.Types.Input.Transaction
{
    public class DeleteTransactionListInput : BaseInput
    {
        public required List<string> TransactionIds { get; init; }
    }
}
