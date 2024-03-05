namespace Backend.API.Types.InputTypes.TransactionTypes
{
    public class DeleteTransactionInputType : BaseInput
    {
        public required string TransactionId { get; init; }
    }
}
