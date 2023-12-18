using MongoDB.Bson.Serialization.Attributes;

namespace Backend.API.Models
{
    public class TbUser
    {
        [BsonId]
        [BsonRepresentation(MongoDB.Bson.BsonType.ObjectId)]
        public string Id { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
    }
}
