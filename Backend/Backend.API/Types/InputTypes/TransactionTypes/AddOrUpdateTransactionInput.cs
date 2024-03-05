namespace Backend.API.Types.InputTypes.TransactionTypes
{
    public class AddOrUpdateTransactionInput : BaseInput
    {
        public required TransactionInput Transaction { get; init; }
    }
}
