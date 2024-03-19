using Backend.Core.Entities;
using Backend.Core.Enums;
using Backend.Core.Repositories;
using Backend.Infrastructure.Data;
using Backend.Utils.Exceptions;
using MongoDB.Driver;

namespace Backend.Infrastructure.Repositories
{
    public class CategoryRepository(IDbContext context) : BaseRepository<Category>(context), ICategoryRepository
    {
        public Category CreateCategory(string categoryName, OperationType operationType, List<string> subcategoryNames)
        {
            var c = new Category
            {
                Name = categoryName,
                CategoryType = operationType,
            };

            if (subcategoryNames.Count > 0)
            {
                foreach (var subcategoryName in subcategoryNames)
                {
                    var s = new SubCategory
                    {
                        Name = subcategoryName,
                        CategoryType = operationType,
                    };

                    c.SubCategories.Add(s);
                }
            }

            return c;
        }


    }
}
