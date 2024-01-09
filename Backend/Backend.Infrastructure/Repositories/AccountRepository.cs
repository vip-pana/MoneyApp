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

        public async Task<Account> GenerateNewAccount(User user, Currency currency)
        {
            List<Category> categories = GenerateDefaultCategories();

            Account account = new()
            {
                Name = "Default Account",
                Currency = currency,
                Categories = categories,
                Transactions = new List<Transaction>(),
                SubUsers = new List<User>(),
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
            // Finance & Investments
            var financeAndInvestmentsNames = new List<string>
            {
                "Interests, dividends",
                "Rents",
                "Lending, renting",
                "Tax",
                "Purchases",
            };
            List<Category> financeAndInvestmentsCategories = GenerateCategories(financeAndInvestmentsNames, OperationType.Income);

            categories.Add(new Category()
            {
                Name = "Finance & Investments",
                Type = OperationType.Income,
                Subcategories = financeAndInvestmentsCategories
            });

            // Refunds
            var refundsNames = new List<string>
            {
                "Tax",
                "Purchases",
            };
            List<Category> refundsCategories = GenerateCategories(refundsNames, OperationType.Income);

            categories.Add(new Category()
            {
                Name = "Refunds",
                Type = OperationType.Income,
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

            foreach(var name in plainCategoriesNames)
            {
                categories.Add(new Category()
                {
                    Name = name,
                    Type = OperationType.Income,
                });
            }

            return categories;
        }

        private List<Category> GenerateExpenseCategories(List<Category> categories)
        {
            // foodAndDrinksNames categories
            var foodAndDrinksNames = new List<string>
            {
                "Restaurant, Fast-food",
                "Bar, Cafe",
            };
            List<Category> foodAndDrinksCategories = GenerateCategories(foodAndDrinksNames, OperationType.Income);

            categories.Add(new Category()
            {
                Name = "Food & Drinks",
                Type = OperationType.Expense,
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
            List<Category> shoppingCategories = GenerateCategories(shoppingNames, OperationType.Income);

            categories.Add(new Category()
            {
                Name = "Shopping",
                Type = OperationType.Expense,
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
            List<Category> housingCategories = GenerateCategories(housingNames, OperationType.Income);

            categories.Add(new Category()
            {
                Name = "Housing",
                Type = OperationType.Expense,
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
            List<Category> trasportationCategories = GenerateCategories(trasportationNames, OperationType.Income);

            categories.Add(new Category()
            {
                Name = "Vehicle, Travel & Transportation",
                Type = OperationType.Expense,
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
            List<Category> lifeAndEntertainmentCategories = GenerateCategories(lifeAndEntertainmentNames, OperationType.Income);

            categories.Add(new Category()
            {
                Name = "Life & entertainment",
                Type = OperationType.Expense,
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
            List<Category> financeAndInvestmentsCategories = GenerateCategories(financeAndInvestmentsNames, OperationType.Income);

            categories.Add(new Category()
            {
                Name = "Finance & Investments",
                Type = OperationType.Expense,
                Subcategories = financeAndInvestmentsCategories
            });

            // Plain Categories
            categories.Add(new Category()
            {
                Name = "Other",
                Type = OperationType.Expense,
            });

            return categories;
        }

        private List<Category> GenerateCategories(List<string> names, OperationType type)
        {
            var categories = new List<Category>();

            foreach (string name in names)
            {
                Category category = new() { Name = name, Type = type };
                categories.Add(category);
            }

            return categories;
        }
    }
}
