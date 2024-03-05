namespace Backend.API.Types.InputTypes.TransactionTypes
{
    public class DeleteTransactionListInput : BaseInput
    {
        public required List<string> TransactionIds { get; init; }
    }
}
