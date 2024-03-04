using AppAny.HotChocolate.FluentValidation;
using Backend.API.Types.InputTypes.CategoryTypes;
using Backend.API.Types.InputTypes.TransactionTypes;
using Backend.API.Validators.CategoryValidators;
using Backend.API.Validators.TransactionValidators;
using Backend.Core.Entities;
using Backend.Core.Repositories;
using Backend.Utils.Exceptions;
using HotChocolate.Authorization;

namespace Backend.API.Mutations
{
    [ExtendObjectType("Mutation")]
    public class CategoryMutation([Service] IUserRepository userRepository)
    {
        //[Authorize]
        //[Error<UserNotExistException>]
        //[Error<GenericException>]
        //public async Task<User> DeleteCategory([UseFluentValidation, UseValidator<DeleteCategoryInputTypeValidator>] DeleteCategoryInputType input)
        //{
        //    var registeredUser = await userRepository.GetByEmailAsync(email: input.UserEmail) ?? throw new UserNotExistException(input.UserEmail);

        //    User res = await userRepository.DeleteCategoryOnUserAccount(categoryId: input.CategoryId, subcategoryId: input.SubcategoryId, user: registeredUser, input.AccountId);
        //    return res;

        //    throw new GenericException("Method not implemented");
        //}

        //[Authorize]
        //[Error<UserNotExistException>]
        //[Error<GenericException>]
        //public async Task<User> AddCategory([UseFluentValidation, UseValidator<AddCategoryInputTypeValidator>] AddCategoryInputType input)
        //{
        //    User res;
        //    var registeredUser = await userRepository.GetByEmailAsync(email: input.UserEmail) ?? throw new UserNotExistException(input.UserEmail);

        //    var category = new Category
        //    {
        //       Name = input.Name,
        //       CategoryType = input.OperationType
        //    };
        //    //var transaction = new Transaction(
        //    //    description: transactionInput.Transaction.Description,
        //    //    amount: transactionInput.Transaction.Amount,
        //    //    transactionType: transactionInput.Transaction.TransactionType,
        //    //    currency: transactionInput.Transaction.Currency,
        //    //    category: transactionInput.Transaction.Category,
        //    //    dateTime: transactionInput.Transaction.DateTime
        //    //    );

        //    //if (transactionInput.Transaction.Id != null)
        //    //{
        //    //    transaction.Id = transactionInput.Transaction.Id;

        //    //    var transactionExist = userRepository.GetTransactionById(transactionId: transactionInput.Transaction.Id, user: registeredUser, accountId: transactionInput.AccountId) != null;

        //    //    if (!transactionExist) throw new FieldIdNotExistException();

        //    //    res = await userRepository.UpdateTransactionOnUserAccount(transaction: transaction, user: registeredUser, accountId: transactionInput.AccountId);
        //    //}
        //    //else
        //    //{
        //    res = await userRepository.AddCategoryOnUserAccount(category: category, user: registeredUser, input.AccountId);
        //    //}

        //    return res;
        //}
    }
}
