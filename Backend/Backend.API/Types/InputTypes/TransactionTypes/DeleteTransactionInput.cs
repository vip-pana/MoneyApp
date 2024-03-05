namespace Backend.API.Types.InputTypes.TransactionTypes
{
    public class DeleteTransactionInput : BaseInput
    {
        public required string TransactionId { get; init; }
    }
}
