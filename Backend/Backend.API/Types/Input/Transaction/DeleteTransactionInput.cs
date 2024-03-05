namespace Backend.API.Types.Input.Transaction
{
    public class DeleteTransactionInput : BaseInput
    {
        public required string TransactionId { get; init; }
    }
}
