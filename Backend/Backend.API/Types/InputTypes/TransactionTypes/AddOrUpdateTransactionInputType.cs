namespace Backend.API.Types.InputTypes.TransactionTypes
{
    public class AddOrUpdateTransactionInputType : BaseInputType
    {
        public required TransactionInputType Transaction { get; init; }
    }
}
