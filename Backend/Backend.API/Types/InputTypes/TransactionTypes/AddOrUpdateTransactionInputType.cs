namespace Backend.API.Types.InputTypes.TransactionTypes
{
    public class AddOrUpdateTransactionInputType : BaseInput
    {
        public required TransactionInput Transaction { get; init; }
    }
}
