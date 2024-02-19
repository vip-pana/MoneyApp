namespace Backend.API.Types.InputTypes.TransactionTypes
{
    public class DeleteTransactionListInputType : BaseInputType
    {
        public required List<string> TransactionIds { get; init; }
    }
}
