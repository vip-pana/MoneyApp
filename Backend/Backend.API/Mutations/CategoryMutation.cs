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
        [Authorize]
        [Error<UserNotExistException>]
        [Error<GenericException>]
        public async Task<User> DeleteCategory([UseFluentValidation, UseValidator<DeleteCategoryInputTypeValidator>] DeleteCategoryInputType input)
        {
            var registeredUser = await userRepository.GetByEmailAsync(email: input.UserEmail) ?? throw new UserNotExistException(input.UserEmail);

            User res = await userRepository.DeleteCategoryOnUserAccount(categoryId: input.CategoryId, subcategoryId: input.SubcategoryId, user: registeredUser, input.AccountId);
            return res;

            throw new GenericException("Method not implemented");
        }
    }
}
