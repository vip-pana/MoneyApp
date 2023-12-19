using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Bson;

namespace Backend.Core.Entities
{
    public class Category
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; }
        public string Description { get; set; }
    }
}
