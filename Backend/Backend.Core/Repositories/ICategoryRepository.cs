using Backend.Core.Entities;
using Backend.Core.Enums;

namespace Backend.Core.Repositories
{
    public interface ICategoryRepository : IBaseRepository<Category>
    {
        public Category CreateCategory(string categoryName, OperationType operationType, List<string> subcategoryNames);
    }
}
