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

        public async Task<Account> GenerateNewAccount(User user, CurrencyEnum currency)
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
            List<Category> financeAndInvestmentsCategories = GenerateCategories(financeAndInvestmentsNames, TypeEnum.Income);

            categories.Add(new Category()
            {
                Name = "Finance & Investments",
                Type = TypeEnum.Income,
                subcategories = financeAndInvestmentsCategories
            });

            // Refunds
            var refundsNames = new List<string>
            {
                "Tax",
                "Purchases",
            };
            List<Category> refundsCategories = GenerateCategories(refundsNames, TypeEnum.Income);

            categories.Add(new Category()
            {
                Name = "Refunds",
                Type = TypeEnum.Income,
                subcategories = refundsCategories
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
                    Type = TypeEnum.Income,
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
            List<Category> foodAndDrinksCategories = GenerateCategories(foodAndDrinksNames, TypeEnum.Income);

            categories.Add(new Category()
            {
                Name = "Food & Drinks",
                Type = TypeEnum.Expense,
                subcategories = foodAndDrinksCategories
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
            List<Category> shoppingCategories = GenerateCategories(shoppingNames, TypeEnum.Income);

            categories.Add(new Category()
            {
                Name = "Shopping",
                Type = TypeEnum.Expense,
                subcategories = shoppingCategories
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
            List<Category> housingCategories = GenerateCategories(housingNames, TypeEnum.Income);

            categories.Add(new Category()
            {
                Name = "Housing",
                Type = TypeEnum.Expense,
                subcategories = housingCategories
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
            List<Category> trasportationCategories = GenerateCategories(trasportationNames, TypeEnum.Income);

            categories.Add(new Category()
            {
                Name = "Vehicle, Travel & Transportation",
                Type = TypeEnum.Expense,
                subcategories = trasportationCategories
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
            List<Category> lifeAndEntertainmentCategories = GenerateCategories(lifeAndEntertainmentNames, TypeEnum.Income);

            categories.Add(new Category()
            {
                Name = "Life & entertainment",
                Type = TypeEnum.Expense,
                subcategories = lifeAndEntertainmentCategories
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
            List<Category> financeAndInvestmentsCategories = GenerateCategories(financeAndInvestmentsNames, TypeEnum.Income);

            categories.Add(new Category()
            {
                Name = "Finance & Investments",
                Type = TypeEnum.Expense,
                subcategories = financeAndInvestmentsCategories
            });

            // Plain Categories
            categories.Add(new Category()
            {
                Name = "Other",
                Type = TypeEnum.Expense,
            });

            return categories;
        }

        private List<Category> GenerateCategories(List<string> names, TypeEnum type)
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
