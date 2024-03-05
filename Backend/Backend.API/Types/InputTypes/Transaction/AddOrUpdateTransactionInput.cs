namespace Backend.API.Types.InputTypes.Transaction
{
    public class AddOrUpdateTransactionInput : BaseInput
    {
        public required TransactionInput Transaction { get; init; }
    }
}
