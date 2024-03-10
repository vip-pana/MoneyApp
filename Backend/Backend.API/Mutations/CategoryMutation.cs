using AppAny.HotChocolate.FluentValidation;
using Backend.API.Types.Input.Category;
using Backend.API.Validators.Category;
using Backend.Core.Entities;
using Backend.Core.Repositories;
using Backend.Infrastructure.Repositories;
using Backend.Utils.Exceptions;
using HotChocolate.Authorization;

namespace Backend.API.Mutations
{
    [ExtendObjectType("Mutation")]
    public class CategoryMutation([Service] IUserRepository userRepository, [Service] ICategoryRepository categoryRepository)
    {
        [AllowAnonymous]
        [Error<GenericException>]
        public async Task AddSubCategory([UseFluentValidation, UseValidator<AddSubCategoryInputValidator>] AddSubCategoryInput input) 
        {
            var registeredUser = await userRepository.GetByEmailAsync(email: input.UserEmail) ?? throw new UserNotExistException(input.UserEmail);

            throw new NotImplementedException();
        }

        [AllowAnonymous]
        [Error<GenericException>]
        public async Task<List<Category>> AddCategory([UseFluentValidation, UseValidator<AddCategoryInputValidator>] AddCategoryInput input)
        {
            var user = await userRepository.GetByEmailAsync(email: input.UserEmail) ?? throw new UserNotExistException(input.UserEmail);

            var category = categoryRepository.CreateCategory(categoryName: input.Name, operationType: input.OperationType, subcategoryNames: input.SubcategorysNames);

            user = await userRepository.AddCategoryOnUserAccountAsync(category: category, user: user, accountId: input.AccountId);

            var account = user.Accounts.Find(account => account.Id == input.AccountId) ?? throw new GenericException("Account non trovato");

            return account.Categories;
        }

        [AllowAnonymous]
        [Error<GenericException>]
        public async Task<User> EditCategory([UseFluentValidation, UseValidator<EditCategoryInputValidator>] EditCategoryInput input)
        {
            var user = await userRepository.GetByEmailAsync(email: input.UserEmail) ?? throw new UserNotExistException(input.UserEmail);

            var category = UserRepository.GetAccountById(accounts: user.Accounts, input.AccountId).Categories.Find(cat => cat.Id == input.CategoryId) ?? throw new GenericException("Categoria non trovata dentro l'account");
            category.Name = input.Name;

            user = userRepository.EditCategoryReferencesOnAccountTransactions(category: category, user: user, accountId: input.AccountId);

            user = await userRepository.EditCategoryNameOnUserAccountAsync(user: user, accountId: input.AccountId, category: category);

            return user;
        }

        [AllowAnonymous]
        [Error<GenericException>]
        public async Task<User> DeleteCategory([UseFluentValidation, UseValidator<DeleteCategoryInputValidator>] DeleteCategoryInput input)
        {
            var user = await userRepository.GetByEmailAsync(email: input.UserEmail) ?? throw new UserNotExistException(input.UserEmail);

            var categoryToRemove = UserRepository.GetAccountById(accounts: user.Accounts, input.AccountId).Categories.Find(cat => cat.Id == input.CategoryId) ?? throw new GenericException("Categoria non trovata dentro l'account");

            user = userRepository.DeleteCategoryReferencesOnAccountTransactions(category: categoryToRemove, user: user, accountId: input.AccountId);

            user = await userRepository.DeleteCategoryAsync(user: user, categoryToRemove: categoryToRemove, accountId: input.AccountId);

            return user;
        }
    }
}
