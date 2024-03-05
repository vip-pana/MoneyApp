namespace Backend.API.Types.InputTypes.Transaction
{
    public class DeleteTransactionInput : BaseInput
    {
        public required string TransactionId { get; init; }
    }
}
