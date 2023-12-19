using Backend.Core.Entities;

namespace Backend.Core.Repositories
{
    public interface ICategoryRepository
    {
        Task<Category> GetById(string id);
    }
}
