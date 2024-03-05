namespace Backend.API.Types.InputTypes.TransactionTypes
{
    public class DeleteTransactionListInputType : BaseInput
    {
        public required List<string> TransactionIds { get; init; }
    }
}
