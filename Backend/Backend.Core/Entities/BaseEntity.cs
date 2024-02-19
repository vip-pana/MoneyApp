using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Bson;

namespace Backend.Core.Entities
{
    public class BaseEntity
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; } = ObjectId.GenerateNewId().ToString();
    }
}
