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
        #region Category
        [Authorize]
        [Error<GenericException>]
        public async Task<List<Category>> AddCategory([UseFluentValidation, UseValidator<AddCategoryInputValidator>] AddCategoryInput input)
        {
            var user = await userRepository.GetByEmailAsync(email: input.UserEmail) ?? throw new UserNotExistException(input.UserEmail);

            var category = categoryRepository.CreateCategory(categoryName: input.Name, operationType: input.OperationType, subcategoryNames: input.SubcategoriesNames);

            user = await userRepository.AddCategoryOnUserAccountAsync(category: category, user: user, accountId: input.SelectedAccountId);

            var account = user.Accounts.Find(account => account.Id == input.SelectedAccountId) ?? throw new GenericException("Account non trovato");

            return account.Categories;
        }

        [Authorize]
        [Error<GenericException>]
        public async Task<User> EditCategory([UseFluentValidation, UseValidator<EditCategoryInputValidator>] EditCategoryInput input)
        {
            var user = await userRepository.GetByEmailAsync(email: input.UserEmail) ?? throw new UserNotExistException(input.UserEmail);

            var category = UserRepository.GetAccountById(accounts: user.Accounts, input.SelectedAccountId).Categories.Find(cat => cat.Id == input.CategoryId) ?? throw new GenericException("Categoria non trovata dentro l'account");
            category.Name = input.Name;

            user = userRepository.EditCategoryReferencesOnAccountTransactions(category: category, user: user, accountId: input.SelectedAccountId);

            user = await userRepository.EditCategoryNameOnUserAccountAsync(user: user, accountId: input.SelectedAccountId, category: category);

            return user;
        }

        [Authorize]
        [Error<GenericException>]
        public async Task<User> DeleteCategory([UseFluentValidation, UseValidator<DeleteCategoryInputValidator>] DeleteCategoryInput input)
        {
            var user = await userRepository.GetByEmailAsync(email: input.UserEmail) ?? throw new UserNotExistException(input.UserEmail);

            var categoryToRemove = UserRepository.GetAccountById(accounts: user.Accounts, input.SelectedAccountId).Categories.Find(cat => cat.Id == input.CategoryId) ?? throw new GenericException("Categoria non trovata dentro l'account");

            user = userRepository.DeleteCategoryReferencesOnAccountTransactions(category: categoryToRemove, user: user, accountId: input.SelectedAccountId);

            user = await userRepository.DeleteCategoryAsync(user: user, categoryToRemove: categoryToRemove, accountId: input.SelectedAccountId);

            return user;
        }
        #endregion

        #region SubCategory
        [Authorize]
        [Error<GenericException>]
        public async Task<List<Category>> AddSubCategory([UseFluentValidation, UseValidator<AddSubCategoryInputValidator>] AddSubCategoryInput input)
        {
            var user = await userRepository.GetByEmailAsync(email: input.UserEmail) ?? throw new UserNotExistException(input.UserEmail);

            var category = UserRepository.GetAccountById(accounts: user.Accounts, input.SelectedAccountId).Categories.Find(cat => cat.Id == input.CategoryId) ?? throw new GenericException("Categoria non trovata dentro l'account");

            var subCategory = new SubCategory()
            {
                Name = input.SubCategoryName,
                CategoryType = category.CategoryType
            };

            category.SubCategories.Add(subCategory);

            user = await userRepository.UpdateCategoryOnAccount(user, category, input.SelectedAccountId);

            return UserRepository.GetAccountById(accounts: user.Accounts, input.SelectedAccountId).Categories;
        }

        [Authorize]
        [Error<GenericException>]
        public async Task<User> EditSubCategory([UseFluentValidation, UseValidator<EditSubCategoryInputValidator>] EditSubCategoryInput input)
        {
            var user = await userRepository.GetByEmailAsync(email: input.UserEmail) ?? throw new UserNotExistException(input.UserEmail);

            var category = UserRepository.GetAccountById(accounts: user.Accounts, input.SelectedAccountId).Categories.Find(cat => cat.Id == input.CategoryId) ?? throw new GenericException("Categoria non trovata dentro l'account");

            foreach (var subCategory in category.SubCategories)
            {
                if (subCategory.Id == input.SubCategoryId)
                {
                    subCategory.Name = input.SubCategoryName;
                    break;
                }
            }

            user = userRepository.EditSubCategoryReferencesOnAccountTransactions(category: category, user: user, accountId: input.SelectedAccountId, subCategoryName: input.SubCategoryName, subCategoryId: input.SubCategoryId);

            await userRepository.UpdateUserAsync(user);

            return user;
        }

        [Authorize]
        [Error<GenericException>]
        public async Task<User> DeleteSubCategory([UseFluentValidation, UseValidator<DeleteSubCategoryInputValidator>] DeleteSubCategoryInput input)
        {
            var user = await userRepository.GetByEmailAsync(email: input.UserEmail) ?? throw new UserNotExistException(input.UserEmail);

            var category = UserRepository.GetAccountById(accounts: user.Accounts, input.SelectedAccountId).Categories.Find(cat => cat.Id == input.CategoryId) ?? throw new GenericException("Categoria non trovata dentro l'account");

            foreach (var subCategory in category.SubCategories)
            {
                if (subCategory.Id == input.SubCategoryId)
                {
                    category.SubCategories.Remove(subCategory);
                    break;
                }
            }

            user = userRepository.DeleteSubCategoryReferencesOnAccountTransactions(category: category, user: user, accountId: input.SelectedAccountId, subCategoryId: input.SubCategoryId);

            await userRepository.UpdateUserAsync(user);

            return user;
        }
        #endregion

    }
}
