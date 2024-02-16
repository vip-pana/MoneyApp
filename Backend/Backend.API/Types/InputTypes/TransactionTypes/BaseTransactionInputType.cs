using Backend.Core.Entities;

namespace Backend.API.Types.InputTypes.TransactionTypes
{
    public class BaseTransactionInputType
    {
        public required string UserEmail { get; init; }
        public required string AccountId { get; init; }
        public required Transaction Transaction { get; init;}
    }
}
