using Backend.Core.Entities;
using Backend.Core.Enums;
using Backend.Core.Repositories;
using Backend.Infrastructure.Data;

namespace Backend.Infrastructure.Repositories
{
    public class AccountRepository(IDbContext context) : BaseRepository<Account>(context), IAccountRepository
    {
        #region GENERATE CATEGORIES
        public Account GenerateNewAccount(Currency currency, string? accountName = null)
        {
            List<Category> categories = GenerateDefaultCategories();

            Account account = new()
            {
                Name = accountName ?? "Default Account",
                Currency = currency,
                Categories = categories,
                Transactions = [],
                SubUsers = [],
                IncomeAmount = 0.00,
                ExpenseAmount = 0.00,
            };

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
            List<SubCategory> financeAndInvestmentsCategories = GenerateCategories(financeAndInvestmentsNames, operationType);

            categories.Add(new Category()
            {
                Name = "Finance & Investments",
                CategoryType = operationType,
                SubCategories = financeAndInvestmentsCategories
            });

            // Refunds
            var refundsNames = new List<string>
            {
                "Tax",
                "Purchases",
            };
            List<SubCategory> refundsCategories = GenerateCategories(refundsNames, operationType);

            categories.Add(new Category()
            {
                Name = "Refunds",
                CategoryType = operationType,
                SubCategories = refundsCategories
            });

            // Plain categories
            var plainCategoriesNames = new List<string>
            {
                "Gifts",
                "Lottery, gambling",
                "Lending, renting",
                "Salary",
                "Pension",
                "Other",
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
            List<SubCategory> foodAndDrinksCategories = GenerateCategories(foodAndDrinksNames, operationType);

            categories.Add(new Category()
            {
                Name = "Food & Drinks",
                CategoryType = operationType,
                SubCategories = foodAndDrinksCategories
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
            List<SubCategory> shoppingCategories = GenerateCategories(shoppingNames, operationType);

            categories.Add(new Category()
            {
                Name = "Shopping",
                CategoryType = operationType,
                SubCategories = shoppingCategories
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
            List<SubCategory> housingCategories = GenerateCategories(housingNames, operationType);

            categories.Add(new Category()
            {
                Name = "Housing",
                CategoryType = operationType,
                SubCategories = housingCategories
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
            List<SubCategory> trasportationCategories = GenerateCategories(trasportationNames, operationType);

            categories.Add(new Category()
            {
                Name = "Vehicle, Travel & Transportation",
                CategoryType = operationType,
                SubCategories = trasportationCategories
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
            List<SubCategory> lifeAndEntertainmentCategories = GenerateCategories(lifeAndEntertainmentNames, operationType);

            categories.Add(new Category()
            {
                Name = "Life & entertainment",
                CategoryType = operationType,
                SubCategories = lifeAndEntertainmentCategories
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
            List<SubCategory> financeAndInvestmentsCategories = GenerateCategories(financeAndInvestmentsNames, operationType);

            categories.Add(new Category()
            {
                Name = "Finance & Investments",
                CategoryType = operationType,
                SubCategories = financeAndInvestmentsCategories
            });

            // Plain Categories
            categories.Add(new Category()
            {
                Name = "Other",
                CategoryType = operationType,
            });

            return categories;
        }

        private List<SubCategory> GenerateCategories(List<string> names, OperationType type)
        {
            var categories = new List<SubCategory>();

            foreach (string name in names)
            {
                SubCategory category = new() { Name = name, CategoryType = type };
                categories.Add(category);
            }

            return categories;
        }
        #endregion
    }
}
