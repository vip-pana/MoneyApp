namespace Backend.API.Types.Input.Transaction
{
    public class AddOrUpdateTransactionInput : BaseInput
    {
        public required TransactionInput Transaction { get; init; }
    }
}
