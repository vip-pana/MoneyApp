namespace Backend.API.Types.InputTypes.Transaction
{
    public class DeleteTransactionListInput : BaseInput
    {
        public required List<string> TransactionIds { get; init; }
    }
}
