namespace Backend.API.Types.InputTypes.TransactionTypes
{
    public class DeleteTransactionInputType : BaseInputType
    {
        public required string TransactionId { get; init; }
    }
}
