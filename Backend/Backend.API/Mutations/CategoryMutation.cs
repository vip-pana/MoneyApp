using AppAny.HotChocolate.FluentValidation;
using Backend.API.Types.Input.Category;
using Backend.API.Validators.Category;
using Backend.Core.Entities;
using Backend.Core.Repositories;
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

        /*
        * 1. creo la categoria
        * 2. se ci sono nomi per sottocategorie creo le sottocategorie
        * 3. salvo poi nel db
        */
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

        //public async Task<User> DeleteCategoryOnUserAccount(string categoryId, string? subcategoryId, User user, string accountId)
        //{
        //    var account = GetAccountById(user, accountId);
        //    var accountIndex = user.Accounts.IndexOf(account);
        //    var category = account.Categories.Find(category => category.Id == categoryId) ?? throw new GenericException("Category not exist in account");

        //    if (category.SubCategories != null && subcategoryId != null && !string.IsNullOrWhiteSpace(subcategoryId))
        //    {
        //        //var accountCategoryIndex = account.Categories.IndexOf(category);
        //        //var subcategoryToRemove = category.SubCategories.Find(subcategory => subcategory.Id == subcategoryId) ?? throw new GenericException("Subcategory not exist in the category of the account");

        //        //category.SubCategories.Remove(subcategoryToRemove);
        //        //account.Categories[accountCategoryIndex] = category;
        //        throw new GenericException("subcategories already not implemented");
        //    }
        //    else
        //    {
        //        var otherCategory = account.Transactions
        //            .Where(t => t.Category.CategoryType == category.CategoryType)
        //            .First(t => t.Category.Name == "Other").Category ?? throw new GenericException("Category other not found.");

        //        // Trova tutte le transazioni con la stessa categoria ID come categoryId e le rimpiazzo con otherCategory
        //        foreach (var transaction in account.Transactions.Where(t => t.Category.Id == categoryId))
        //        {
        //            transaction.Category = otherCategory;
        //        }

        //        account.Categories.Remove(category);
        //    }

        //    user.Accounts[accountIndex] = account;
        //    await UpdateUserAsync(user);
        //    return user;
        //}

        //public Task<User> AddCategoryOnUserAccount(Category category, User user, string accountId)
        //{
        //    throw new NotImplementedException();
        //}
    }
}
