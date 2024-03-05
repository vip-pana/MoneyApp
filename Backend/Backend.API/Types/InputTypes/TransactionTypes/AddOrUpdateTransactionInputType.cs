namespace Backend.API.Types.InputTypes.TransactionTypes
{
    public class AddOrUpdateTransactionInputType : BaseInput
    {
        public required TransactionInputType Transaction { get; init; }
    }
}
