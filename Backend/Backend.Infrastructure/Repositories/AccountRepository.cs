using Backend.Core.Entities;
using Backend.Core.Enums;
using Backend.Core.Repositories;
using Backend.Infrastructure.Data;

namespace Backend.Infrastructure.Repositories
{
    public class AccountRepository : BaseRepository<Account>, IAccountRepository
    {
        public AccountRepository(IDbContext context) : base(context)
        {
        }

        #region GENERATE CATEGORIES
        public async Task<Account> GenerateNewDefaultAccount(Currency currency)
        {
            List<Category> categories = GenerateDefaultCategories();

            Account account = new()
            {
                Name = "Default Account",
                Currency = currency,
                Categories = categories,
                Transactions = new List<Transaction>(),
                SubUsers = new List<User>(),
                IncomeAmount = 0.00,
                ExpenseAmount = 0.00,
            };

            await collection.InsertOneAsync(account);

            return account;
        }

        private List<Category> GenerateDefaultCategories()
        {
            var res = new List<Category>();
            res = GenerateIncomeCategories(categories: res);
            res = GenerateExpenseCategories(categories: res);

            return res;
        }

        private List<Category> GenerateIncomeCategories(List<Category> categories)
        {
            var operationType = OperationType.Income;

            // Finance & Investments
            var financeAndInvestmentsNames = new List<string>
            {
                "Interests, dividends",
                "Rents",
                "Lending, renting",
                "Tax",
                "Purchases",
            };
            List<Category> financeAndInvestmentsCategories = GenerateCategories(financeAndInvestmentsNames, operationType);

            categories.Add(new Category()
            {
                Name = "Finance & Investments",
                CategoryType = operationType,
                Subcategories = financeAndInvestmentsCategories
            });

            // Refunds
            var refundsNames = new List<string>
            {
                "Tax",
                "Purchases",
            };
            List<Category> refundsCategories = GenerateCategories(refundsNames, operationType);

            categories.Add(new Category()
            {
                Name = "Refunds",
                CategoryType = operationType,
                Subcategories = refundsCategories
            });

            // Plain categories
            var plainCategoriesNames = new List<string>
            {
                "Gifts",
                "Lottery, gambling",
                "Lending, renting",
                "Salary",
                "Pension",
            };

            foreach (var name in plainCategoriesNames)
            {
                categories.Add(new Category()
                {
                    Name = name,
                    CategoryType = operationType,
                });
            }

            return categories;
        }

        private List<Category> GenerateExpenseCategories(List<Category> categories)
        {
            var operationType = OperationType.Expense;

            // foodAndDrinksNames categories
            var foodAndDrinksNames = new List<string>
            {
                "Restaurant, Fast-food",
                "Bar, Cafe",
            };
            List<Category> foodAndDrinksCategories = GenerateCategories(foodAndDrinksNames, operationType);

            categories.Add(new Category()
            {
                Name = "Food & Drinks",
                CategoryType = operationType,
                Subcategories = foodAndDrinksCategories
            });


            // shopping categories
            var shoppingNames = new List<string>
            {
                "Clothes",
                "Health, beauty",
                "Home, garden",
                "Pets, animals",
                "Electronics and Technologies",
                "Drug store",
                "Gifts",
            };
            List<Category> shoppingCategories = GenerateCategories(shoppingNames, operationType);

            categories.Add(new Category()
            {
                Name = "Shopping",
                CategoryType = operationType,
                Subcategories = shoppingCategories
            });

            // housing categories
            var housingNames = new List<string>
            {
                "Rent",
                "Mortgage",
                "Energy, utilities",
                "Services",
                "Maintenance, repairs",
                "Property insurance",
            };
            List<Category> housingCategories = GenerateCategories(housingNames, operationType);

            categories.Add(new Category()
            {
                Name = "Housing",
                CategoryType = operationType,
                Subcategories = housingCategories
            });

            // Vehicle, Travel & Transportation categories
            var trasportationNames = new List<string>
            {
                "Public transport",
                "Taxi",
                "Long distance trip",
                "Fuel",
                "Parking",
                "Vehicle maintenance",
                "Rentals",
                "Vehicle insurance",
                "Leasing",
            };
            List<Category> trasportationCategories = GenerateCategories(trasportationNames, operationType);

            categories.Add(new Category()
            {
                Name = "Vehicle, Travel & Transportation",
                CategoryType = operationType,
                Subcategories = trasportationCategories
            });

            // Vehicle, Travel & Transportation categories
            var lifeAndEntertainmentNames = new List<string>
            {
                "Public transport",
                "Taxi",
                "Long distance trip",
                "Fuel",
                "Parking",
                "Vehicle maintenance",
                "Rentals",
                "Vehicle insurance",
                "Leasing",
            };
            List<Category> lifeAndEntertainmentCategories = GenerateCategories(lifeAndEntertainmentNames, operationType);

            categories.Add(new Category()
            {
                Name = "Life & entertainment",
                CategoryType = operationType,
                Subcategories = lifeAndEntertainmentCategories
            });

            // Finance & Investments categories
            var financeAndInvestmentsNames = new List<string>
            {
                "Taxes",
                "Insurances",
                "Loan, interest",
                "Fines",
                "Fees",
                "Financial investments",
            };
            List<Category> financeAndInvestmentsCategories = GenerateCategories(financeAndInvestmentsNames, operationType);

            categories.Add(new Category()
            {
                Name = "Finance & Investments",
                CategoryType = operationType,
                Subcategories = financeAndInvestmentsCategories
            });

            // Plain Categories
            categories.Add(new Category()
            {
                Name = "Other",
                CategoryType = operationType,
            });

            return categories;
        }

        private List<Category> GenerateCategories(List<string> names, OperationType type)
        {
            var categories = new List<Category>();

            foreach (string name in names)
            {
                Category category = new() { Name = name, CategoryType = type };
                categories.Add(category);
            }

            return categories;
        }

        #endregion
    }
}
