using Backend.Core.Enums;
using MongoDB.Bson;

namespace Backend.Core.Entities
{
    public class Category : BaseEntity
    {
        public required string Name {  get; set; }
        public required OperationType CategoryType { get; set; }
        public List<Category>? Subcategories { get; set;}

        public Category()
        {
            Id = ObjectId.GenerateNewId().ToString();
        }
    }
}
